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
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  GitCommit,
  Layers,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { FinalReport, CopyOptimization } from '@/types/analysis';

interface ReportDashboardProps {
  report: FinalReport;
  onOpenTelemetry: () => void;
}

export function ReportDashboard({ report, onOpenTelemetry }: ReportDashboardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const radarData = [
    { subject: 'Clareza', score: report.radarMetrics.clarityScore, fullMark: 100 },
    { subject: 'Urgência', score: report.radarMetrics.urgencyScore, fullMark: 100 },
    { subject: 'Prova Social', score: report.radarMetrics.socialProofScore, fullMark: 100 },
    { subject: 'Quebra Objeções', score: report.radarMetrics.objectionHandlingScore, fullMark: 100 },
    { subject: 'Simplicidade CTA', score: report.radarMetrics.ctaSimplicityScore, fullMark: 100 },
  ];

  const getScoreVerdict = (score: number) => {
    if (score >= 75) {
      return {
        label: 'Alta Eficácia de Conversão',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      };
    }
    if (score >= 60) {
      return {
        label: 'Conversão Moderada / Fricção Ativa',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      };
    }
    return {
      label: 'Alto Risco de Abandono de Tráfego',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    };
  };

  const verdict = getScoreVerdict(report.overallScore);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Page Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.1em] px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
              {report.niche || 'Auditoria Geral'}
            </span>
            <span className="text-zinc-600 font-mono text-xs">•</span>
            <span className="text-xs font-mono text-zinc-400">
              {report.personas.length} Personas no Comitê
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight mt-1.5">
            Diagnóstico de Fricção e Objeções
          </h2>

          {report.url && (
            <div className="flex items-center gap-1.5 mt-1 text-xs font-mono text-zinc-400">
              <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
              <span className="truncate max-w-lg">{report.url}</span>
            </div>
          )}
        </div>

        <button
          onClick={onOpenTelemetry}
          className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] text-xs font-mono text-zinc-300 hover:text-white transition-all tactile-btn"
        >
          <span>&lt;/&gt; Telemetria do Pipeline</span>
        </button>
      </div>

      {/* 1. ASYMMETRICAL BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Intelligence Block (8 cols) */}
        <div className="lg:col-span-8 double-bezel">
          <div className="double-bezel-inner p-6 sm:p-7 flex flex-col justify-between space-y-6 h-full">
            {/* Top Row: Score + Status */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Score de Conversão Geral
                </span>
                <span
                  className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${verdict.color}`}
                >
                  {verdict.label}
                </span>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-6xl sm:text-7xl font-bold font-mono text-white tracking-tight">
                  {report.overallScore}
                </span>
                <span className="text-lg font-mono text-zinc-500">/100</span>
              </div>

              {/* Progress Segmented Bar */}
              <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden flex mb-6">
                <div
                  style={{ width: `${report.overallScore}%` }}
                  className={`h-full ${
                    report.overallScore >= 75
                      ? 'bg-emerald-400'
                      : report.overallScore >= 60
                      ? 'bg-amber-400'
                      : 'bg-rose-400'
                  }`}
                />
              </div>
            </div>

            {/* Critical Bottleneck Alert Block */}
            <div className="p-4 rounded-xl bg-rose-500/[0.06] border border-rose-500/20 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Gargalo Crítico #1 de Conversão:</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                &quot;{report.criticalBottleneck}&quot;
              </p>
            </div>

            {/* Growth Lead Diagnosis */}
            <div className="pt-4 border-t border-white/[0.05]">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                Síntese Executiva de CRO:
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {report.executiveSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Radar Metrics Block (4 cols) */}
        <div className="lg:col-span-4 double-bezel">
          <div className="double-bezel-inner p-5 sm:p-6 flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Equilíbrio da Proposta
              </span>
              <span className="text-[10px] font-mono text-zinc-500">5 EIXOS</span>
            </div>

            {/* Radar Chart */}
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'monospace' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="transparent" />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={1.5}
                    fill="#10b981"
                    fillOpacity={0.15}
                  />
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload.length > 0) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#0b0c10] border border-white/[0.1] px-2.5 py-1.5 rounded text-xs font-mono text-white shadow-2xl">
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

            {/* Micro Breakdown List */}
            <div className="space-y-1.5 pt-2 border-t border-white/[0.05] font-mono text-[11px]">
              {radarData.map((item) => (
                <div key={item.subject} className="flex justify-between items-center text-zinc-400">
                  <span>{item.subject}</span>
                  <span className="text-white font-semibold">{item.score}/100</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. OBSERVATION GALLERY (PERSONA VERDICTS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Galeria de Objeções das Personas
            </h3>
            <p className="text-xs text-zinc-400">
              Análise comportamental individualizada de cada perfil
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            {report.personas.length} perfis no debate
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {report.personas.map((persona) => (
            <div key={persona.personaId} className="double-bezel">
              <div className="double-bezel-inner p-5 flex flex-col justify-between h-full space-y-4">
                <div>
                  {/* Persona Identity Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs font-bold text-white">
                        {persona.initials || persona.personaName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white">{persona.personaName}</h4>
                          <span className="text-[9px] font-mono text-zinc-500">
                            {persona.code || 'PER-01'}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400">{persona.role}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-sm font-bold text-white">
                        {persona.conversionScore}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500">/100</span>
                    </div>
                  </div>

                  {/* Emotional State Badge */}
                  <div className="mt-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.03] text-zinc-300 border border-white/[0.06]">
                      Status: {persona.emotionalState}
                    </span>
                  </div>

                  {/* Editorial Verdict Quote */}
                  <blockquote className="mt-3.5 p-3 rounded-lg bg-[#08090d] border border-white/[0.04] text-xs text-zinc-200 font-sans italic leading-relaxed">
                    &quot;{persona.verdictQuote}&quot;
                  </blockquote>

                  {/* Friction Points */}
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block">
                      Atritos Críticos:
                    </span>
                    <ul className="space-y-1">
                      {persona.frictionPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] text-zinc-300 flex items-start gap-1.5 bg-rose-500/[0.04] p-1.5 rounded border border-rose-500/10"
                        >
                          <span className="text-rose-400 font-mono text-xs leading-none">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Unanswered Questions */}
                  {persona.unansweredQuestions && persona.unansweredQuestions.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                        Dúvidas Não Sanadas:
                      </span>
                      <ul className="space-y-0.5">
                        {persona.unansweredQuestions.map((q, idx) => (
                          <li key={idx} className="text-[11px] text-zinc-400 pl-2 border-l border-white/[0.08]">
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. GIT-DIFF COPYWRITING REWRITER (ANTES VS DEPOIS) */}
      <div className="space-y-5 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-emerald-400" />
              Diff de Copywriting: Antes vs. Depois
            </h3>
            <p className="text-xs text-zinc-400">
              Reescrita técnica formulada para dissolver as objeções levantadas pelo comitê
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            {report.copyOptimizations.length} blocos refatorados
          </span>
        </div>

        <div className="space-y-4">
          {report.copyOptimizations.map((opt: CopyOptimization, idx: number) => (
            <div key={idx} className="double-bezel">
              <div className="double-bezel-inner p-5 space-y-4">
                {/* Header with Element Tag & Copy Action */}
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
                  <span className="text-[11px] font-mono font-semibold text-zinc-300 px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                    {opt.element}
                  </span>

                  <button
                    onClick={() => handleCopy(opt.suggestedText, idx)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.18] text-xs font-mono text-zinc-200 transition-all tactile-btn"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copiar Sugestão</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Git-Style Diff Visualization */}
                <div className="space-y-2 font-mono text-xs">
                  {/* Original Red Diff */}
                  <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 text-rose-300 flex items-start gap-2">
                    <span className="text-rose-500 select-none font-bold">-</span>
                    <span className="line-through opacity-80">{opt.originalText}</span>
                  </div>

                  {/* Suggested Green Diff */}
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 flex items-start gap-2">
                    <span className="text-emerald-400 select-none font-bold">+</span>
                    <span className="font-semibold text-white">{opt.suggestedText}</span>
                  </div>
                </div>

                {/* Psychological CRO Rationale */}
                <div className="p-3 rounded-lg bg-[#08090d] border border-white/[0.04] text-xs text-zinc-400 flex items-start gap-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Racional:</span>
                  <p className="font-sans leading-relaxed">{opt.rationale}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
