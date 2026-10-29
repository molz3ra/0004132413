import { z } from 'zod';

export const PersonaEvaluationSchema = z.object({
  personaId: z.string(),
  personaName: z.string(),
  role: z.string(),
  avatar: z.string().optional(),
  conversionScore: z.number().min(0).max(100),
  emotionalState: z.enum([
    'Curioso',
    'Cético',
    'Confuso',
    'Pronto para Comprar',
    'Frustrado',
    'Desconfiado',
  ]),
  firstImpression: z.string().describe('Primeira impressão nos primeiros 3 segundos de leitura da página'),
  frictionPoints: z.array(z.string()).min(1).max(3).describe('Pontos de atrito específicos que impediram o avanço'),
  unansweredQuestions: z.array(z.string()).min(1).max(3).describe('Perguntas que ficaram sem resposta clara'),
  verdictQuote: z.string().describe('Frase curta em primeira pessoa resumindo sua decisão final de compra'),
});

export type PersonaEvaluation = z.infer<typeof PersonaEvaluationSchema>;

export const CopyOptimizationSchema = z.object({
  element: z.enum([
    'Headline Principal',
    'Subheadline',
    'Botão CTA',
    'Proposta de Valor',
    'Garantia / Risco',
  ]),
  originalText: z.string().describe('Texto original extraído ou inferido da página analisada'),
  suggestedText: z.string().describe('Nova versão otimizada para superar as objeções das personas'),
  rationale: z.string().describe('Justificativa comportamental e de copywriting para a mudança'),
});

export type CopyOptimization = z.infer<typeof CopyOptimizationSchema>;

export const RadarMetricsSchema = z.object({
  clarityScore: z.number().min(0).max(100).describe('Clareza imediata do que é o produto'),
  urgencyScore: z.number().min(0).max(100).describe('Nível de urgência e desejo criado'),
  socialProofScore: z.number().min(0).max(100).describe('Credibilidade, depoimentos e autoridade'),
  objectionHandlingScore: z.number().min(0).max(100).describe('Capacidade de sanar dúvidas e riscos'),
  ctaSimplicityScore: z.number().min(0).max(100).describe('Fricção do próximo passo / chamada para ação'),
});

export type RadarMetrics = z.infer<typeof RadarMetricsSchema>;

export const FinalReportSchema = z.object({
  url: z.string().optional(),
  niche: z.string().optional(),
  overallScore: z.number().min(0).max(100),
  radarMetrics: RadarMetricsSchema,
  criticalBottleneck: z.string().describe('O gargalo número #1 que está vazando conversão na página'),
  executiveSummary: z.string().describe('Síntese diagnóstica de CRO e psicologia de vendas'),
  copyOptimizations: z.array(CopyOptimizationSchema),
  personas: z.array(PersonaEvaluationSchema),
});

export type FinalReport = z.infer<typeof FinalReportSchema>;

export const TelemetrySchema = z.object({
  scrapeTimeMs: z.number(),
  parallelPersonasTimeMs: z.number(),
  consolidationTimeMs: z.number(),
  totalExecutionTimeMs: z.number(),
  rawCharCount: z.number(),
  estimatedTokensUsed: z.number(),
  modelUsed: z.string(),
  scrapedMarkdownPreview: z.string(),
});

export type Telemetry = z.infer<typeof TelemetrySchema>;

export interface AnalysisResponse {
  report: FinalReport;
  telemetry: Telemetry;
}

