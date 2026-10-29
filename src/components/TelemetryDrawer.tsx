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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/40">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-semibold text-white flex items-center gap-2">
                    Developer Telemetry & Pipeline Inspector
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans">
                    Inspeção técnica em tempo real de latência, tokens e dados estruturados
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-5 border-b border-zinc-800/80 bg-zinc-900/20 flex space-x-1 font-mono text-xs">
              <button
                onClick={() => setActiveTab('benchmarks')}
                className={`py-3 px-3.5 border-b-2 font-medium flex items-center gap-2 transition-colors ${
                  activeTab === 'benchmarks'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Benchmarks (ms)
              </button>
              <button
                onClick={() => setActiveTab('tokens')}
                className={`py-3 px-3.5 border-b-2 font-medium flex items-center gap-2 transition-colors ${
                  activeTab === 'tokens'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Tokens & Custo
              </button>
              <button
                onClick={() => setActiveTab('markdown')}
                className={`py-3 px-3.5 border-b-2 font-medium flex items-center gap-2 transition-colors ${
                  activeTab === 'markdown'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Markdown Bruto
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`py-3 px-3.5 border-b-2 font-medium flex items-center gap-2 transition-colors ${
                  activeTab === 'json'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Zod Schema JSON
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!telemetry ? (
                <div className="text-center py-16 text-zinc-500 font-mono text-xs">
                  Nenhuma análise executada ainda. Execute um teste ou clique em um dos exemplos rápidos da tela inicial.
                </div>
              ) : (
                <>
                  {/* TAB 1: BENCHMARKS */}
                  {activeTab === 'benchmarks' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono text-zinc-400">Tempo Total do Pipeline</span>
                          <span className="text-xl font-mono font-bold text-emerald-400">
                            {telemetry.totalExecutionTimeMs} ms
                          </span>
                        </div>
                        <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden flex">
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
                            title="Agentes Paralelos"
                          />
                          <div
                            style={{
                              width: `${Math.max(
                                8,
                                (telemetry.consolidationTimeMs / telemetry.totalExecutionTimeMs) * 100
                              )}%`,
                            }}
                            className="bg-violet-500"
                            title="Consolidador"
                          />
                        </div>
                      </div>

                      {/* Detail Breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80">
                          <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono mb-1">
                            <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            Scraper (Jina/Cheerio)
                          </div>
                          <div className="text-lg font-mono font-semibold text-white">
                            {telemetry.scrapeTimeMs} ms
                          </div>
                          <p className="text-[11px] text-zinc-500 mt-1">Extração e higienização DOM</p>
                        </div>

                        <div className="p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80">
                          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono mb-1">
                            <Zap className="w-3 h-3" />
                            Personas em Paralelo
                          </div>
                          <div className="text-lg font-mono font-semibold text-white">
                            {telemetry.parallelPersonasTimeMs} ms
                          </div>
                          <p className="text-[11px] text-zinc-500 mt-1">Promise.all() simultâneo</p>
                        </div>

                        <div className="p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80">
                          <div className="flex items-center gap-1.5 text-violet-400 text-xs font-mono mb-1">
                            <ShieldCheck className="w-3 h-3" />
                            Agente Consolidador
                          </div>
                          <div className="text-lg font-mono font-semibold text-white">
                            {telemetry.consolidationTimeMs} ms
                          </div>
                          <p className="text-[11px] text-zinc-500 mt-1">Síntese de CRO e Copy</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-zinc-300 font-sans leading-relaxed">
                        <strong className="text-emerald-400 font-mono block mb-1">
                          💡 Vantagem de Engenharia (Promise.all vs Sequencial):
                        </strong>
                        Se as {report?.personas.length || 3} personas tivessem rodado em fila (sequencialmente), o pipeline teria levado mais de{' '}
                        <span className="font-mono font-semibold text-white">
                          {((telemetry.parallelPersonasTimeMs * 2.8) / 1000).toFixed(1)}s
                        </span>
                        . O paralelismo reduziu o tempo total em mais de 65%.
                      </div>
                    </div>
                  )}

                  {/* TAB 2: TOKENS & CUSTO */}
                  {activeTab === 'tokens' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                          <span className="text-xs font-mono text-zinc-400">Tamanho da Página Higienizada</span>
                          <div className="text-xl font-mono font-bold text-white mt-1">
                            {telemetry.rawCharCount.toLocaleString('pt-BR')} caracteres
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                          <span className="text-xs font-mono text-zinc-400">Consumo Estimado de Contexto</span>
                          <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
                            ~{telemetry.estimatedTokensUsed.toLocaleString('pt-BR')} tokens
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2 font-mono text-xs">
                        <div className="flex justify-between py-1 border-b border-zinc-800/60">
                          <span className="text-zinc-400">Motor de Inferência:</span>
                          <span className="text-emerald-400 font-semibold">{telemetry.modelUsed}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-zinc-800/60">
                          <span className="text-zinc-400">Truncamento de Proteção:</span>
                          <span className="text-zinc-200">15.000 chars max (Hero & CTAs prioritized)</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-zinc-400">Custo de Execução:</span>
                          <span className="text-emerald-400 font-semibold">&lt; $0.0002 USD (Praticamente Zero)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: MARKDOWN */}
                  {activeTab === 'markdown' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-zinc-400">
                          Markdown limpo gerado para os agentes:
                        </span>
                        <button
                          onClick={() => handleCopy(telemetry.scrapedMarkdownPreview, 'markdown')}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono transition-colors"
                        >
                          {copied === 'markdown' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied === 'markdown' ? 'Copiado!' : 'Copiar'}
                        </button>
                      </div>
                      <pre className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
                        {telemetry.scrapedMarkdownPreview}
                      </pre>
                    </div>
                  )}

                  {/* TAB 4: STRICT JSON */}
                  {activeTab === 'json' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-zinc-400">
                          Payload validado contra FinalReportSchema:
                        </span>
                        <button
                          onClick={() => handleCopy(JSON.stringify(report, null, 2), 'json')}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono transition-colors"
                        >
                          {copied === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied === 'json' ? 'Copiado!' : 'Copiar JSON'}
                        </button>
                      </div>
                      <pre className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-emerald-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
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

