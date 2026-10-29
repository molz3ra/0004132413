'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroInput } from '@/components/HeroInput';
import { ExecutionProgress } from '@/components/ExecutionProgress';
import { ReportDashboard } from '@/components/ReportDashboard';
import { TelemetryDrawer } from '@/components/TelemetryDrawer';
import { AnalysisResponse, FinalReport, Telemetry } from '@/types/analysis';
import { PRESET_ANALYSES, PresetItem } from '@/lib/presets';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeReport, setActiveReport] = useState<FinalReport | null>(null);
  const [activeTelemetry, setActiveTelemetry] = useState<Telemetry | null>(null);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [activePersonasCount, setActivePersonasCount] = useState(3);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Execução via API (/api/analyze)
  const handleAnalyze = async (params: {
    input: string;
    niche: string;
    personaIds: string[];
    customPersona?: {
      name: string;
      role: string;
      skepticismLevel: number;
      mainPain: string;
    };
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setActivePersonasCount(
      params.personaIds.length + (params.customPersona ? 1 : 0)
    );

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao processar a análise.');
      }

      const data: AnalysisResponse = await response.json();
      setActiveReport(data.report);
      setActiveTelemetry(data.telemetry);
    } catch (err) {
      console.error('[Home] Erro na análise:', err);
      setErrorMessage(
        err instanceof Error ? err.message : 'Erro inesperado ao conectar com o servidor.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Carregamento instantâneo via Zero-Click Preset (0.2s)
  const handleSelectPreset = (preset: PresetItem) => {
    setErrorMessage(null);
    setIsLoading(true);

    // Micro-delay para sensação de transição suave (150ms)
    setTimeout(() => {
      setActiveReport(preset.data.report);
      setActiveTelemetry(preset.data.telemetry);
      setIsLoading(false);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-white">
      {/* Navigation Header */}
      <Header
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        hasTelemetryData={Boolean(activeTelemetry)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20">
        {/* Hero & Input Section */}
        <HeroInput
          onAnalyze={handleAnalyze}
          onSelectPreset={handleSelectPreset}
          isLoading={isLoading}
        />

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="max-w-3xl mx-auto px-4 my-4">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
              <span>{errorMessage}</span>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-rose-400 hover:text-white font-mono text-sm ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Loading Execution Stepper */}
        {isLoading && (
          <ExecutionProgress personasCount={activePersonasCount} />
        )}

        {/* Results Dashboard */}
        {!isLoading && activeReport && (
          <ReportDashboard
            report={activeReport}
            onOpenTelemetry={() => setIsTelemetryOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-6 text-center text-xs text-zinc-500 font-mono">
        <p>
          ObjectionLab • Simulador de Focus Group Sintético com Vercel AI SDK &amp; Zod
        </p>
      </footer>

      {/* Slide-over Developer Telemetry Drawer */}
      <TelemetryDrawer
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
        telemetry={activeTelemetry}
        report={activeReport}
      />
    </div>
  );
}
