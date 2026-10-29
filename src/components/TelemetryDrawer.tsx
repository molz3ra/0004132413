'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Cpu, FileText, Code2, Copy, Check, ShieldCheck, Zap } from 'lucide-react';
import { Telemetry, FinalReport } from '@/types/analysis';

interface TelemetryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: Telemetry | null;
  report: FinalReport | null;
}

type TabType = 'benchmarks' | 'tokens' | 'markdown' | 'json';

export function TelemetryDrawer({
  isOpen,
  onClose,
  telemetry,
  report,
}: TelemetryDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('benchmarks');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-2xl bg-[#090b0f] border-l border-white/[0.08] shadow-2xl flex flex-col font-mono"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/[0.06] flex items-center justify-between bg-[#0c0e14]">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Pipeline Telemetry &amp; System Inspector
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-sans">
                    Métricas de tempo de resposta em milissegundos e consumo de tokens
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-5 border-b border-white/[0.05] bg-[#08090d] flex space-x-1 text-xs">
              <button
                onClick={() => setActiveTab('benchmarks')}
                className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'benchmarks'
                    ? 'border-emerald-400 text-emerald-400 font-medium'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Benchmarks
              </button>
              <button
                onClick={() => setActiveTab('tokens')}
                className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'tokens'
                    ? 'border-emerald-400 text-emerald-400 font-medium'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Tokens &amp; Custos
              </button>
              <button
                onClick={() => setActiveTab('markdown')}
                className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'markdown'
                    ? 'border-emerald-400 text-emerald-400 font-medium'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Markdown
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'json'
                    ? 'border-emerald-400 text-emerald-400 font-medium'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Zod JSON
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!telemetry ? (
                <div className="text-center py-20 text-zinc-600 text-xs">
                  Aguardando primeira execução do pipeline...
                </div>
              ) : (
                <>
                  {/* BENCHMARKS */}
                  {activeTab === 'benchmarks' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-zinc-400 uppercase">Tempo Total Pipeline</span>
                          <span className="text-xl font-bold text-emerald-400">
                            {telemetry.totalExecutionTimeMs} ms
                          </span>
                        </div>

                        {/* Waterfall visualization */}
                        <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden flex">
                          <div
                            style={{
                              width: `${Math.max(
                                8,
                                (telemetry.scrapeTimeMs / telemetry.totalExecutionTimeMs) * 100
                              )}%`,
                            }}
                            className="bg-cyan-500"
                            title="Scraper"
                          />
                          <div
                            style={{
                              width: `${Math.max(
                                12,
                                (telemetry.parallelPersonasTimeMs / telemetry.totalExecutionTimeMs) * 100
                              )}%`,
                            }}
                            className="bg-emerald-500"
                            title="Personas Paralelas"
                          />
                          <div
                            style={{
                              width: `${Math.max(
                                8,
                                (telemetry.consolidationTimeMs / telemetry.totalExecutionTimeMs) * 100
                              )}%`,
                            }}
                            className="bg-purple-500"
                            title="Consolidador"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <span className="text-[10px] text-cyan-400 block mb-1">SCRAPER DOM</span>
                          <div className="text-base font-bold text-white">{telemetry.scrapeTimeMs} ms</div>
                          <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Jina Reader / Cheerio</p>
                        </div>

                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <span className="text-[10px] text-emerald-400 block mb-1">PROMISE.ALL</span>
                          <div className="text-base font-bold text-white">{telemetry.parallelPersonasTimeMs} ms</div>
                          <p className="text-[10px] text-zinc-500 font-sans mt-0.5">{report?.personas.length || 3} Agentes paralelos</p>
                        </div>

                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                          <span className="text-[10px] text-purple-400 block mb-1">CONSOLIDADOR</span>
                          <div className="text-base font-bold text-white">{telemetry.consolidationTimeMs} ms</div>
                          <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Síntese de CRO</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/20 text-xs text-zinc-300 font-sans leading-relaxed">
                        <strong className="text-emerald-400 font-mono block mb-1">
                          Vantagem do Pipeline Concorrente:
                        </strong>
                        A execução paralela permitiu obter a avaliação de {report?.personas.length || 3} perfis no tempo de apenas uma única inferência, sem penalidade de latência sequencial.
                      </div>
                    </div>
                  )}

                  {/* TOKENS */}
                  {activeTab === 'tokens' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <span className="text-[10px] text-zinc-500 uppercase">Volume Extraído</span>
                          <div className="text-lg font-bold text-white mt-1">
                            {telemetry.rawCharCount.toLocaleString('pt-BR')} chars
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <span className="text-[10px] text-zinc-500 uppercase">Tokens Estimados</span>
                          <div className="text-lg font-bold text-emerald-400 mt-1">
                            ~{telemetry.estimatedTokensUsed.toLocaleString('pt-BR')} tok
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-white/[0.04]">
                          <span className="text-zinc-500">Modelo:</span>
                          <span className="text-emerald-400 font-semibold">{telemetry.modelUsed}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/[0.04]">
                          <span className="text-zinc-500">Truncamento:</span>
                          <span className="text-zinc-300">15.000 chars (Hero &amp; CTAs prioritários)</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-zinc-500">Custo Estimado:</span>
                          <span className="text-emerald-400">&lt; $0.0002 USD</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MARKDOWN */}
                  {activeTab === 'markdown' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-zinc-400">Conteúdo Markdown Higienizado:</span>
                        <button
                          onClick={() => handleCopy(telemetry.scrapedMarkdownPreview, 'markdown')}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 hover:text-white"
                        >
                          {copied === 'markdown' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied === 'markdown' ? 'Copiado' : 'Copiar'}
                        </button>
                      </div>
                      <pre className="p-4 rounded-xl bg-[#06070a] border border-white/[0.06] text-zinc-300 text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
                        {telemetry.scrapedMarkdownPreview}
                      </pre>
                    </div>
                  )}

                  {/* JSON */}
                  {activeTab === 'json' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-zinc-400">Payload Validado com Zod:</span>
                        <button
                          onClick={() => handleCopy(JSON.stringify(report, null, 2), 'json')}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 hover:text-white"
                        >
                          {copied === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied === 'json' ? 'Copiado' : 'Copiar JSON'}
                        </button>
                      </div>
                      <pre className="p-4 rounded-xl bg-[#06070a] border border-white/[0.06] text-emerald-300 text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
                        {JSON.stringify(report, null, 2)}
                      </pre>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
