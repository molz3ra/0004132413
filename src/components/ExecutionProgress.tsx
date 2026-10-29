'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Sparkles, Check, Terminal } from 'lucide-react';

interface ExecutionProgressProps {
  personasCount: number;
}

const STEPS = [
  {
    id: 1,
    tag: 'STAGE_01',
    title: 'Ingestão e Sanitização Estrutural',
    detail: 'Lendo DOM via Jina Reader API e isolando Hero, Headings e Propostas de Valor...',
  },
  {
    id: 2,
    tag: 'STAGE_02',
    title: 'Disparo Paralelo do Comitê Sintético',
    detail: 'Instanciando chamadas concorrentes com viés cognitivo e ceticismo individual...',
  },
  {
    id: 3,
    tag: 'STAGE_03',
    title: 'Consolidação de CRO & Diff de Copywriting',
    detail: 'Calculando vetores de atrito e gerando reescrita de alta conversão...',
  },
];

export function ExecutionProgress({ personasCount }: ExecutionProgressProps) {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setCurrentStep(2), 1100);
    const t2 = setTimeout(() => setCurrentStep(3), 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      <div className="double-bezel">
        <div className="double-bezel-inner p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Execução do Pipeline Multi-Agente
                </h3>
                <p className="text-[11px] text-zinc-400 font-mono">
                  {personasCount} personas sintéticas avaliando a proposta concorrentemente
                </p>
              </div>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
              FASE {currentStep}/3
            </span>
          </div>

          {/* Stepper Pipeline */}
          <div className="space-y-2.5">
            {STEPS.map((step) => {
              const isDone = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div
                  key={step.id}
                  className={`p-3 rounded-xl border transition-all flex items-start space-x-3 ${
                    isCurrent
                      ? 'bg-white/[0.04] border-white/[0.15]'
                      : isDone
                      ? 'bg-white/[0.01] border-white/[0.04] opacity-70'
                      : 'bg-transparent border-transparent opacity-30'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold mt-0.5 ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isCurrent
                        ? 'bg-white text-zinc-950 font-bold'
                        : 'bg-white/[0.05] text-zinc-500'
                    }`}
                  >
                    {isDone ? <Check className="w-3 h-3 text-emerald-400" /> : step.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-500">{step.tag}</span>
                        <h4
                          className={`text-xs font-semibold ${
                            isCurrent ? 'text-white' : isDone ? 'text-zinc-300' : 'text-zinc-500'
                          }`}
                        >
                          {step.title}
                        </h4>
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-emerald-400">
                          Processando...
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 font-mono leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
