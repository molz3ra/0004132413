import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { scrapeLandingPage } from '@/lib/scraper';
import { getPersonasByIds, buildCustomPersona, PersonaArchetype } from '@/lib/personas';
import { runSyntheticFocusGroup } from '@/lib/analyzer';
import { AnalysisResponse } from '@/types/analysis';

const RequestSchema = z.object({
  input: z.string().min(3, 'A URL ou texto da página é obrigatório.'),
  niche: z.string().default('SaaS B2B'),
  personaIds: z.array(z.string()).min(1).default(['cfo-skeptic', 'dev-senior', 'busy-smb']),
  customPersona: z
    .object({
      name: z.string(),
      role: z.string(),
      skepticismLevel: z.number().min(1).max(10),
      mainPain: z.string(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  const overallStart = performance.now();

  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos na requisição', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { input, niche, personaIds, customPersona } = parsed.data;

    // Etapa 1: Scraping e sanitização
    const scrapeResult = await scrapeLandingPage(input);

    // Etapa 2: Resolução das personas
    const selectedPersonas: PersonaArchetype[] = getPersonasByIds(personaIds);
    if (customPersona) {
      selectedPersonas.push(
        buildCustomPersona({
          id: `custom-${Date.now()}`,
          name: customPersona.name,
          role: customPersona.role,
          skepticismLevel: customPersona.skepticismLevel,
          mainPain: customPersona.mainPain,
        })
      );
    }

    // Etapa 3: Execução paralela dos agentes e consolidação
    const isUrl = input.trim().startsWith('http://') || input.trim().startsWith('https://');
    const { report, parallelDurationMs, consolidationDurationMs } = await runSyntheticFocusGroup({
      pageContent: scrapeResult.markdown,
      personas: selectedPersonas,
      niche,
      url: isUrl ? input.trim() : undefined,
    });

    const totalExecutionTimeMs = Math.round(performance.now() - overallStart);

    const hasApiKey = Boolean(
      process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
    );

    const responsePayload: AnalysisResponse = {
      report,
      telemetry: {
        scrapeTimeMs: scrapeResult.durationMs,
        parallelPersonasTimeMs: parallelDurationMs,
        consolidationTimeMs: consolidationDurationMs,
        totalExecutionTimeMs,
        rawCharCount: scrapeResult.charCount,
        estimatedTokensUsed: scrapeResult.estimatedTokens,
        modelUsed: hasApiKey ? 'gemini-2.0-flash (Google AI SDK)' : 'Simulador Sintético Determinado',
        scrapedMarkdownPreview: scrapeResult.markdown.substring(0, 1500) + '...',
      },
    };

    return NextResponse.json(responsePayload);
  } catch (err) {
    console.error('[API /analyze] Erro não tratado:', err);
    return NextResponse.json(
      {
        error: 'Erro interno ao processar a análise do Focus Group.',
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

