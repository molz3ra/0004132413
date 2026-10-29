'use client';

import React, { useState } from 'react';
import { Globe, FileText, ArrowRight, Sparkles, Plus, Check, Sliders, ShieldAlert } from 'lucide-react';
import { PRESET_PERSONAS, PersonaArchetype } from '@/lib/personas';
import { PRESET_ANALYSES, PresetItem } from '@/lib/presets';

interface HeroInputProps {
  onAnalyze: (params: {
    input: string;
    niche: string;
    personaIds: string[];
    customPersona?: {
      name: string;
      role: string;
      skepticismLevel: number;
      mainPain: string;
    };
  }) => void;
  onSelectPreset: (preset: PresetItem) => void;
  isLoading: boolean;
}

const NICHES = [
  'SaaS B2B',
  'Infoproduto / Educação',
  'E-commerce & D2C',
  'App Mobile & Consumo',
  'Fintech & Pagamentos',
  'Serviços & Consultoria',
];

export function HeroInput({ onAnalyze, onSelectPreset, isLoading }: HeroInputProps) {
  const [mode, setMode] = useState<'url' | 'text'>('url');
  const [inputValue, setInputValue] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('SaaS B2B');
  const [selectedPersonaIds, setSelectedPersonaIds] = useState<string[]>([
    'cfo-skeptic',
    'dev-senior',
    'busy-smb',
  ]);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [customSkepticism, setCustomSkepticism] = useState(8);
  const [customPain, setCustomPain] = useState('');
  const [hasCustomPersona, setHasCustomPersona] = useState(false);

  const togglePersona = (id: string) => {
    if (selectedPersonaIds.includes(id)) {
      if (selectedPersonaIds.length > 1) {
        setSelectedPersonaIds(selectedPersonaIds.filter((p) => p !== id));
      }
    } else {
      if (selectedPersonaIds.length < 5) {
        setSelectedPersonaIds([...selectedPersonaIds, id]);
      }
    }
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customName && customRole && customPain) {
      setHasCustomPersona(true);
      setShowCustomModal(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    onAnalyze({
      input: inputValue,
      niche: selectedNiche,
      personaIds: selectedPersonaIds,
      customPersona: hasCustomPersona
        ? {
            name: customName,
            role: customRole,
            skepticismLevel: customSkepticism,
            mainPain: customPain,
          }
        : undefined,
    });
  };

  return (
    <section className="relative pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Hero Title */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Teste a copy antes de queimar orçamento em tráfego pago</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Simulador de <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Focus Group</span> Sintético
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Cole a URL da sua Landing Page. Múltiplos agentes de IA com vieses psicológicos contrastantes analisam seu posicionamento em paralelo e apontam cada atrito de conversão.
        </p>
      </div>

      {/* Main Input Card */}
      <div className="relative rounded-2xl glass-panel p-5 sm:p-6 shadow-2xl border border-zinc-800/80">
        {/* Mode Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 bg-zinc-900/90 p-1 rounded-lg border border-zinc-800 text-xs font-medium">
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                mode === 'url' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              Analisar URL
            </button>
            <button
              type="button"
              onClick={() => setMode('text')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                mode === 'text' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Colar Copy/Texto
            </button>
          </div>

          {/* Niche selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-zinc-400 hidden sm:inline">Nicho da Oferta:</span>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500/60"
            >
              {NICHES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'url' ? (
            <div className="relative">
              <input
                type="url"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="https://suapagina.com.br/oferta-especial"
                required
                className="w-full bg-zinc-900/90 border border-zinc-800/90 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
              />
            </div>
          ) : (
            <textarea
              rows={4}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Cole aqui a headline, subtítulo, tópicos e chamada para ação do seu anúncio ou página..."
              required
              className="w-full bg-zinc-900/90 border border-zinc-800/90 rounded-xl p-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30 transition-all font-sans"
            />
          )}

          {/* Personas Selector Chips */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                Selecione as Personas Sintéticas ({selectedPersonaIds.length} ativas):
              </span>
              <button
                type="button"
                onClick={() => setShowCustomModal(true)}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3 h-3" />
                {hasCustomPersona ? 'Editar Persona Custom' : 'Criar Persona Custom'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESET_PERSONAS.map((p) => {
                const isSelected = selectedPersonaIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePersona(p.id)}
                    className={`flex items-start space-x-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-zinc-800/90 border-emerald-500/50 shadow-sm shadow-emerald-500/10'
                        : 'bg-zinc-900/40 border-zinc-800/60 opacity-60 hover:opacity-100 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-xl leading-none mt-0.5">{p.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-100 truncate">{p.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-[10px] text-zinc-400 truncate">{p.role}</p>
                      <div className="flex items-center gap-1 mt-1 text-[9px] text-zinc-500 font-mono">
                        <span>Ceticismo:</span>
                        <div className="w-10 bg-zinc-700 h-1 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${p.skepticismLevel * 10}%` }}
                            className={`h-full ${
                              p.skepticismLevel >= 8
                                ? 'bg-rose-500'
                                : p.skepticismLevel >= 6
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                          />
                        </div>
                        <span>{p.skepticismLevel}/10</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {hasCustomPersona && (
              <div className="mt-2 p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👤</span>
                  <div>
                    <span className="text-xs font-semibold text-purple-300">
                      {customName} ({customRole})
                    </span>
                    <p className="text-[10px] text-zinc-400">Dor: &quot;{customPain}&quot;</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  Customizada Ativa
                </span>
              </div>
            )}
          </div>

          {/* Action CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 font-bold text-sm tracking-wide shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
              <span>{isLoading ? 'Executando Focus Group Sintético...' : 'Auditar Página com Agentes em Paralelo'}</span>
              <ArrowRight className="w-4 h-4 text-zinc-950 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        {/* Zero-Click Presets Showcase */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Vitrine de Demonstração Instantânea (Zero-Click, 0.2s):
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PRESET_ANALYSES.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset)}
                className="group p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-900 text-left transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-zinc-700">
                    {preset.badge}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors">
                    Score: {preset.data.report.overallScore}/100
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                  {preset.title}
                </h4>
                <p className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">
                  {preset.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Persona Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-400" />
                Criar Persona Sintética Personalizada
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-zinc-500 hover:text-zinc-300 text-xs"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveCustom} className="space-y-3.5">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Nome da Persona:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Amanda Silveira"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Cargo / Perfil:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Head de Marketing com meta agressiva"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-1">
                  <span>Nível de Ceticismo:</span>
                  <span className="font-mono text-purple-400 font-bold">{customSkepticism}/10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={customSkepticism}
                  onChange={(e) => setCustomSkepticism(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Maior Objeção / Medo:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Medo de comprar e a equipe não usar no dia a dia"
                  value={customPain}
                  onChange={(e) => setCustomPain(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white"
                >
                  Adicionar ao Debate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

