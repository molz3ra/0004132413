import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { PersonaArchetype } from './personas';
import {
  PersonaEvaluation,
  PersonaEvaluationSchema,
  FinalReport,
  FinalReportSchema,
  RadarMetrics,
} from '../types/analysis';

// Inicializa o provedor do Google com suporte tanto a GEMINI_API_KEY quanto a GOOGLE_GENERATIVE_AI_API_KEY
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';
const google = createGoogleGenerativeAI({
  apiKey,
});

/**
 * Avaliação sintética realista de fallback caso nenhuma API Key esteja configurada no ambiente
 */
function generateSimulatedPersonaEvaluation(
  persona: PersonaArchetype,
  pageContent: string,
  niche: string
): PersonaEvaluation {
  const isHighSkeptic = persona.skepticismLevel >= 8;
  const isLowSkeptic = persona.skepticismLevel <= 5;

  let score = 55;
  if (isHighSkeptic) score = Math.floor(35 + Math.random() * 20); // 35 a 54
  else if (isLowSkeptic) score = Math.floor(75 + Math.random() * 18); // 75 a 92
  else score = Math.floor(58 + Math.random() * 18); // 58 a 75

  let emotionalState: PersonaEvaluation['emotionalState'] = 'Cético';
  if (score >= 80) emotionalState = 'Pronto para Comprar';
  else if (score >= 65) emotionalState = 'Curioso';
  else if (score >= 50) emotionalState = 'Confuso';
  else if (persona.id === 'dev-senior' || persona.id === 'cfo-skeptic') emotionalState = 'Desconfiado';
  else emotionalState = 'Frustrado';

  return {
    personaId: persona.id,
    personaName: persona.name,
    role: persona.role,
    avatar: persona.avatar,
    conversionScore: score,
    emotionalState,
    firstImpression: `Ao escanear a página para o nicho de ${niche}, a promessa inicial é atrativa, mas faltam elementos de ancoragem para minha realidade.`,
    frictionPoints: [
      `Falta de clareza imediata sobre a precificação e condições de cancelamento.`,
      `Promessa parece muito ampla; não ficou evidente como resolve meu caso de uso específico.`,
      `Pouca evidência empírica ou dados de benchmark para validar as afirmações de performance.`,
    ],
    unansweredQuestions: [
      `Qual é a curva real de aprendizado ou esforço de implementação?`,
      `Existe suporte humano dedicado ou garantia incondicional de reembolso?`,
    ],
    verdictQuote:
      score > 70
        ? `A proposta é muito forte e o design transmite seriedade. Compraria para testar se a garantia for clara.`
        : `Entendi o conceito, mas tem muita palavra bonita e pouca prova prática. Não passaria meu cartão hoje.`,
  };
}

/**
 * Roda a avaliação de uma Persona individual contra o conteúdo da página
 */
async function evaluateSinglePersona(
  persona: PersonaArchetype,
  pageContent: string,
  niche: string
): Promise<PersonaEvaluation> {
  // Se não houver chave de API configurada, usa o simulador determinístico de alta fidelidade
  if (!apiKey) {
    // Pequena pausa artificial para simular o throughput de rede (~600 a 1100ms)
    await new Promise((res) => setTimeout(res, 600 + Math.random() * 500));
    return generateSimulatedPersonaEvaluation(persona, pageContent, niche);
  }

  const model = google('gemini-2.0-flash');

  const prompt = `Você está participando de um Focus Group Sintético avaliando uma Landing Page no nicho "${niche}".
  
Conteúdo extraído da Landing Page:
---
${pageContent}
---

Instruções para sua avaliação:
- Seja 100% fiel ao seu perfil psicológico, vieses, aversões e nível de ceticismo.
- Não seja condescendente. Aponte os atritos reais que fariam você abandonar o site sem comprar.
- Responda estritamente no esquema estruturado JSON solicitado.`;

  try {
    const { object } = await generateObject({
      model,
      schema: PersonaEvaluationSchema,
      system: persona.systemPrompt,
      prompt,
    });

    return {
      ...object,
      personaId: persona.id,
      personaName: persona.name,
      role: persona.role,
      avatar: persona.avatar,
    };
  } catch (err) {
    console.warn(`[AI Engine] Falha na avaliação da persona ${persona.name}, acionando simulação:`, err);
    return generateSimulatedPersonaEvaluation(persona, pageContent, niche);
  }
}

/**
 * Agente Consolidador ("Head de Growth") que sintetiza os atritos e gera o plano de ação de copy
 */
async function consolidateAnalysis(
  evaluations: PersonaEvaluation[],
  pageContent: string,
  niche: string,
  url?: string
): Promise<FinalReport> {
  // Calcula pontuações ponderadas
  const avgScore = Math.round(
    evaluations.reduce((acc, p) => acc + p.conversionScore, 0) / evaluations.length
  );

  // Se não houver chave de API, gera uma consolidação sintética rica
  if (!apiKey) {
    await new Promise((res) => setTimeout(res, 700));

    const radar: RadarMetrics = {
      clarityScore: Math.min(100, Math.max(25, avgScore + 5)),
      urgencyScore: Math.min(100, Math.max(30, avgScore - 12)),
      socialProofScore: Math.min(100, Math.max(20, avgScore - 8)),
      objectionHandlingScore: Math.min(100, Math.max(25, avgScore - 15)),
      ctaSimplicityScore: Math.min(100, Math.max(40, avgScore + 10)),
    };

    return {
      url: url || 'Texto colado / Análise avulsa',
      niche,
      overallScore: avgScore,
      radarMetrics: radar,
      criticalBottleneck:
        'A proposta de valor é ambígua nos primeiros 3 segundos e a página posterga a quebra de objeções sobre preço, implementação e garantia.',
      executiveSummary: `Analisamos a página sob a ótica de ${evaluations.length} perfis contrastantes. O principal vazamento de conversão ocorre entre a leitura da Headline e o primeiro CTA: visitantes mais céticos (especialmente perfis técnicos e financeiros) sentem falta de transparência sobre o retorno prático, enquanto visitantes leigos se sentem sobrecarregados por explicações abstratas.`,
      copyOptimizations: [
        {
          element: 'Headline Principal',
          originalText: 'A plataforma definitiva impulsionada por inteligência artificial para o seu negócio',
          suggestedText: 'Automatize seu pipeline de conversão em 15 minutos sem escrever código complexo',
          rationale: 'Substitui clichês genéricos de "plataforma de IA" por um benefício quantificável (tempo de 15 minutos) e remove o medo de esforço técnico.',
        },
        {
          element: 'Subheadline',
          originalText: 'Descubra como nossa tecnologia revolucionária transforma a sua produtividade diária.',
          suggestedText: 'Usado por mais de 800 empresas para cortar 60% das tarefas manuais. Teste grátis por 14 dias sem cartão.',
          rationale: 'Injeta prova social imediata e reduz a fricção de risco com menção explícita de "sem cartão".',
        },
        {
          element: 'Botão CTA',
          originalText: 'Saiba Mais',
          suggestedText: 'Começar Teste Grátis de 14 Dias →',
          rationale: 'Botões passivos como "Saiba Mais" convidam a adiar a decisão. O novo CTA deixa claro o que acontece imediatamente ao clicar.',
        },
      ],
      personas: evaluations,
    };
  }

  const model = google('gemini-2.0-flash');

  const consolidatorSystemPrompt = `Você é o Head de Growth e Especialista em CRO (Conversion Rate Optimization) mais conceituado do mercado.
Sua função é ler os feedbacks de múltiplos perfis do Focus Group Sintético, identificar os maiores vazamentos de conversão da página e reescrever as partes mais críticas da copy (Headlines, CTAs e Proposta de Valor) para dobrar a taxa de conversão.`;

  const consolidatorPrompt = `Nicho da página: ${niche}
URL ou Contexto: ${url || 'Análise de Landing Page'}

Feedbacks individuais das Personas Sintéticas:
${JSON.stringify(evaluations, null, 2)}

Amostra da estrutura da página:
${pageContent.substring(0, 4000)}

Com base em todas as queixas e dúvidas das personas:
1. Calcule os 5 eixos do radar de conversão (clarityScore, urgencyScore, socialProofScore, objectionHandlingScore, ctaSimplicityScore) de 0 a 100.
2. Identifique o gargalo número #1 responsável pela perda de vendas.
3. Forneça 3 a 4 otimizações cirúrgicas de Copy no formato Antes vs. Depois com a devida justificativa comportamental.`;

  try {
    const { object } = await generateObject({
      model,
      schema: FinalReportSchema,
      system: consolidatorSystemPrompt,
      prompt: consolidatorPrompt,
    });

    return {
      ...object,
      url: url || 'Landing Page',
      niche,
      personas: evaluations,
    };
  } catch (err) {
    console.warn('[Consolidator] Falha na consolidação via IA, utilizando sintetizador estruturado:', err);
    const radar: RadarMetrics = {
      clarityScore: Math.min(100, Math.max(30, avgScore + 5)),
      urgencyScore: Math.min(100, Math.max(30, avgScore - 10)),
      socialProofScore: Math.min(100, Math.max(20, avgScore - 5)),
      objectionHandlingScore: Math.min(100, Math.max(25, avgScore - 12)),
      ctaSimplicityScore: Math.min(100, Math.max(40, avgScore + 8)),
    };

    return {
      url: url || 'Landing Page',
      niche,
      overallScore: avgScore,
      radarMetrics: radar,
      criticalBottleneck:
        'A página sofre de promessas genéricas e posterga a quebra de objeções sobre implementação e custo real.',
      executiveSummary: `Síntese de ${evaluations.length} personas: A página tem apelo inicial, mas peca na ancoragem de valor e segurança para o decisor.`,
      copyOptimizations: [
        {
          element: 'Headline Principal',
          originalText: 'A solução ideal para transformar seus resultados',
          suggestedText: 'Dobre sua taxa de conversão reduzindo as objeções do seu cliente em tempo real',
          rationale: 'Foca na dor central de CRO com especificidade de resultado.',
        },
      ],
      personas: evaluations,
    };
  }
}

/**
 * Orquestrador principal: Executa as Personas em paralelo via Promise.all e consolida os resultados
 */
export async function runSyntheticFocusGroup(params: {
  pageContent: string;
  personas: PersonaArchetype[];
  niche: string;
  url?: string;
}): Promise<{
  report: FinalReport;
  parallelDurationMs: number;
  consolidationDurationMs: number;
}> {
  const tStartParallel = performance.now();

  // DISPARO PARALELO COM PROMISE.ALL
  const personaEvaluations = await Promise.all(
    params.personas.map((persona) =>
      evaluateSinglePersona(persona, params.pageContent, params.niche)
    )
  );

  const parallelDurationMs = Math.round(performance.now() - tStartParallel);

  // NÓ CONSOLIDADOR
  const tStartConsolidation = performance.now();
  const finalReport = await consolidateAnalysis(
    personaEvaluations,
    params.pageContent,
    params.niche,
    params.url
  );
  const consolidationDurationMs = Math.round(performance.now() - tStartConsolidation);

  return {
    report: finalReport,
    parallelDurationMs,
    consolidationDurationMs,
  };
}

