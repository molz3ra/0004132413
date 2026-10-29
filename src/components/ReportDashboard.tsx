'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';
import { FinalReport, CopyOptimization } from '@/types/analysis';

interface ReportDashboardProps {
  report: FinalReport;
  onOpenTelemetry: () => void;
}

export function ReportDashboard({ report, onOpenTelemetry }: ReportDashboardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Prepara dados para o gráfico de Radar do Recharts
  const radarData = [
    { subject: 'Clareza', score: report.radarMetrics.clarityScore, fullMark: 100 },
    { subject: 'Urgência', score: report.radarMetrics.urgencyScore, fullMark: 100 },
    { subject: 'Prova Social', score: report.radarMetrics.socialProofScore, fullMark: 100 },
    { subject: 'Quebra de Objeções', score: report.radarMetrics.objectionHandlingScore, fullMark: 100 },
    { subject: 'Simplicidade do CTA', score: report.radarMetrics.ctaSimplicityScore, fullMark: 100 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 60) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return 'Alta Eficácia de Conversão';
    if (score >= 60) return 'Conversão Moderada / Com Fricção';
    return 'Alto Risco de Abandono de Tráfego';
  };

  const getEmotionalBadgeColor = (state: string) => {
    switch (state) {
      case 'Pronto para Comprar':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Curioso':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Cético':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Confuso':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">
      {/* Top Bar: URL & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              {report.niche || 'Landing Page'}
            </span>
            <span className="text-xs text-zinc-400">• Avaliada por {report.personas.length} personas sintéticas</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            Relatório de Fricção e Objeções
          </h2>
          {report.url && (
            <p className="text-xs font-mono text-zinc-400 truncate max-w-xl flex items-center gap-1.5 mt-0.5">
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              {report.url}
            </p>
          )}
        </div>

        <button
          onClick={onOpenTelemetry}
          className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700/80 hover:border-emerald-500/60 text-xs font-mono text-zinc-300 hover:text-emerald-400 transition-all shadow-sm"
        >
          <span>&lt;/&gt; Ver Telemetria do Pipeline</span>
        </button>
      </div>

      {/* 1. TOP METRICS & RADAR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Overall Conversion Score Gauge */}
        <div className="lg:col-span-4 rounded-2xl glass-panel p-6 flex flex-col justify-between border border-zinc-800">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-medium text-zinc-400">Score Geral de Conversão</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="flex flex-col items-center justify-center my-4">
              <div
                className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center shadow-xl ${getScoreColor(
                  report.overallScore
                )}`}
              >
                <span className="text-4xl font-extrabold font-mono tracking-tight text-white">
                  {report.overallScore}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">de 100</span>
              </div>
              <span
                className={`mt-4 text-xs font-semibold px-3 py-1 rounded-full border ${getScoreColor(
                  report.overallScore
                )}`}
              >
                {getScoreLabel(report.overallScore)}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-400 leading-relaxed">
            Média ponderada baseada no ceticismo individual das {report.personas.length} personas sintéticas testadas.
          </div>
        </div>

        {/* Radar Chart (Recharts) */}
        <div className="lg:col-span-4 rounded-2xl glass-panel p-6 flex flex-col border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-medium text-zinc-400">Equilíbrio da Oferta (5 Eixos)</span>
            <span className="text-[10px] font-mono text-emerald-400">0 - 100</span>
          </div>

          <div className="flex-1 w-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="#3f3f46" />
                <Radar
                  name="Pontuação"
                  dataKey="score"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.25}
                />
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload.length > 0) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-zinc-900 border border-zinc-700 px-2.5 py-1.5 rounded text-xs font-mono text-white shadow-xl">
                          <span className="text-zinc-400">{data.subject}: </span>
                          <span className="text-emerald-400 font-bold">{data.score}/100</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Critical Bottleneck Alert Card */}
        <div className="lg:col-span-4 rounded-2xl p-6 bg-gradient-to-br from-rose-950/30 to-zinc-900/60 border border-rose-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold mb-3">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Gargalo Crítico #1 de Conversão</span>
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed font-medium">
              &quot;{report.criticalBottleneck}&quot;
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-rose-500/20">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">Diagnóstico Executivo do Head de Growth:</span>
            <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
              {report.executiveSummary}
            </p>
          </div>
        </div>
      </div>

      {/* 2. PERSONAS DEBATE CARDS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              O Veredito das Personas Sintéticas
            </h3>
            <p className="text-xs text-zinc-400">
              Veja exatamente onde cada perfil sentiu hesitação ou abandonou a leitura
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">{report.personas.length} perfis analisados</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {report.personas.map((persona) => (
            <div
              key={persona.personaId}
              className="rounded-2xl glass-panel p-5 flex flex-col justify-between border border-zinc-800 hover:border-zinc-700 transition-all space-y-4 shadow-lg"
            >
              <div>
                {/* Persona Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl p-1 rounded-xl bg-zinc-900 border border-zinc-800">
                      {persona.avatar || '👤'}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{persona.personaName}</h4>
                      <p className="text-xs text-zinc-400">{persona.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono font-bold text-white">
                      {persona.conversionScore}
                    </span>
                    <span className="text-[10px] text-zinc-500 block font-mono">/100</span>
                  </div>
                </div>

                {/* Emotional State Badge */}
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded-full border ${getEmotionalBadgeColor(
                      persona.emotionalState
                    )}`}
                  >
                    {persona.emotionalState}
                  </span>
                </div>

                {/* Verdict Impact Quote */}
                <blockquote className="mt-3.5 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs italic text-zinc-200 leading-relaxed">
                  &quot;{persona.verdictQuote}&quot;
                </blockquote>

                {/* Friction Points */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-rose-400 font-semibold uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Pontos de Atrito Sentidos:
                  </span>
                  <ul className="space-y-1">
                    {persona.frictionPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-zinc-300 flex items-start gap-1.5 bg-rose-500/5 p-1.5 rounded-lg border border-rose-500/10"
                      >
                        <span className="text-rose-400 text-xs mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unanswered Questions */}
                {persona.unansweredQuestions && persona.unansweredQuestions.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-zinc-500" />
                      Perguntas Não Respondidas:
                    </span>
                    <ul className="space-y-1">
                      {persona.unansweredQuestions.map((q, idx) => (
                        <li key={idx} className="text-[11px] text-zinc-400 pl-2 border-l border-zinc-700">
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. INTERACTIVE COPY OPTIMIZATION (BEFORE VS. AFTER) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Plano de Otimização de Copywriting (Antes vs. Depois)
            </h3>
            <p className="text-xs text-zinc-400">
              Reescrita estratégica gerada pelo Head de Growth para derrubar as objeções levantadas
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            {report.copyOptimizations.length} elementos reescritos
          </span>
        </div>

        <div className="space-y-4">
          {report.copyOptimizations.map((opt: CopyOptimization, idx: number) => (
            <div
              key={idx}
              className="rounded-2xl glass-panel p-5 border border-zinc-800 space-y-3 shadow-lg"
            >
              {/* Element Tag */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-300 px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700">
                  {opt.element}
                </span>

                <button
                  onClick={() => handleCopyCopy(opt.suggestedText, idx)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition-colors"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Sugestão</span>
                    </>
                  )}
                </button>
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Original Copy */}
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    Copy Atual Detectada:
                  </span>
                  <p className="text-xs text-zinc-300 font-sans italic">
                    &quot;{opt.originalText}&quot;
                  </p>
                </div>

                {/* Suggested Copy */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-1 shadow-sm shadow-emerald-500/5">
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Sugestão de Alta Conversão:
                  </span>
                  <p className="text-xs text-white font-medium">
                    &quot;{opt.suggestedText}&quot;
                  </p>
                </div>
              </div>

              {/* Rationale */}
              <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-400 flex items-start gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-200">Justificativa Comportamental: </strong>
                  {opt.rationale}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

