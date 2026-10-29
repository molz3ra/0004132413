'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Globe, Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface ExecutionProgressProps {
  personasCount: number;
}

const STEPS = [
  {
    id: 1,
    title: 'Ingestão e Sanitização',
    desc: 'Lendo DOM com Jina Reader API e removendo scripts/ruído...',
    icon: Globe,
  },
  {
    id: 2,
    title: 'Disparo Paralelo de Agentes',
    desc: 'Executando avaliação simultânea com Personas via Promise.all...',
    icon: Users,
  },
  {
    id: 3,
    title: 'Síntese de CRO e Reescrita de Copy',
    desc: 'Nó Consolidador calculando métricas de radar e plano Antes vs Depois...',
    icon: Sparkles,
  },
];

export function ExecutionProgress({ personasCount }: ExecutionProgressProps) {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setCurrentStep(2), 1200);
    const t2 = setTimeout(() => setCurrentStep(3), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-12 p-6 rounded-2xl glass-panel border border-emerald-500/30 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
          <div>
            <h3 className="text-sm font-semibold text-white">
              Executando Pipeline do Focus Group Sintético
            </h3>
            <p className="text-xs text-zinc-400">
              Orquestrando {personasCount} personas sintéticas com contratos Zod
            </p>
          </div>
        </div>
        <span className="font-mono text-xs text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
          Etapa {currentStep} de 3
        </span>
      </div>

      <div className="space-y-4">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isDone = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0.5, y: 5 }}
              animate={{ opacity: isCurrent || isDone ? 1 : 0.4, y: 0 }}
              className={`p-3.5 rounded-xl border transition-all flex items-start space-x-3.5 ${
                isCurrent
                  ? 'bg-zinc-900 border-emerald-500/50 shadow-md shadow-emerald-500/5'
                  : isDone
                  ? 'bg-zinc-900/30 border-zinc-800 text-zinc-400'
                  : 'bg-zinc-950/20 border-zinc-900 text-zinc-600'
              }`}
            >
              <div
                className={`p-2 rounded-lg mt-0.5 ${
                  isCurrent
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : isDone
                    ? 'bg-zinc-800 text-emerald-400'
                    : 'bg-zinc-900 text-zinc-600'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Icon className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-xs font-semibold ${
                      isCurrent ? 'text-white' : isDone ? 'text-zinc-300' : 'text-zinc-500'
                    }`}
                  >
                    {step.title}
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Em execução...
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

