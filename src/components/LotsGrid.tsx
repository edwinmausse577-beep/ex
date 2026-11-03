import { useState, useEffect } from 'react';
import { Lote } from '../types';
import { MessageCircle, Check, HelpCircle, SlidersHorizontal, Calculator } from 'lucide-react';
import { buildWhatsAppUrl, trackConversion } from '../utils/whatsapp';

// High-fidelity fallback lots in case local json fetch is delayed or cached
const FALLBACK_LOTES: Lote[] = [
  {
    id: 'LOTE-01',
    numero: '01',
    bloco: 'A',
    area_m2: 450,
    dimensoes: '15m x 30m',
    preco_mzn: 750000,
    preco_formatado: '750.000 MT',
    entrada_minima_mzn: 150000,
    prestacoes_meses: 24,
    valor_prestacao_mzn: 25000,
    estado: 'livre',
    destaque: 'Esquina privilegiada junto à entrada principal',
    topografia: 'Plano e 100% seco',
    orientacao: 'Nascente',
    duat: 'Regularizado (Processo Municipal)',
  },
  {
    id: 'LOTE-02',
    numero: '02',
    bloco: 'A',
    area_m2: 450,
    dimensoes: '15m x 30m',
    preco_mzn: 690000,
    preco_formatado: '690.000 MT',
    entrada_minima_mzn: 138000,
    prestacoes_meses: 24,
    valor_prestacao_mzn: 23000,
    estado: 'livre',
    destaque: 'Excelente localização na Rua das Acácias',
    topografia: 'Plano e pronto para fundação',
    orientacao: 'Norte',
    duat: 'Regularizado (Processo Municipal)',
  },
  {
    id: 'LOTE-03',
    numero: '03',
    bloco: 'A',
    area_m2: 500,
    dimensoes: '20m x 25m',
    preco_mzn: 790000,
    preco_formatado: '790.000 MT',
    entrada_minima_mzn: 158000,
    prestacoes_meses: 24,
    valor_prestacao_mzn: 26333,
    estado: 'reservado',
    destaque: 'Frente ampla de 20 metros para projeto arquitetónico moderno',
    topografia: 'Plano',
    orientacao: 'Nascente',
    duat: 'Regularizado (Processo Municipal)',
  },
  {
    id: 'LOTE-04',
    numero: '04',
    bloco: 'B',
    area_m2: 600,
    dimensoes: '20m x 30m',
    preco_mzn: 920000,
    preco_formatado: '920.000 MT',
    entrada_minima_mzn: 184000,
    prestacoes_meses: 24,
    valor_prestacao_mzn: 30666,
    estado: 'livre',
    destaque: 'Lote nobre com vista desafogada para área verde',
    topografia: 'Ligeiro declive favorável a drenagem natural',
    orientacao: 'Nascente',
    duat: 'Regularizado (Processo Municipal)',
  },
  {
    id: 'LOTE-05',
    numero: '05',
    bloco: 'B',
    area_m2: 600,
    dimensoes: '20m x 30m',
    preco_mzn: 920000,
    preco_formatado: '920.000 MT',
    entrada_minima_mzn: 184000,
    prestacoes_meses: 24,
    valor_prestacao_mzn: 30666,
    estado: 'vendido',
    destaque: 'Vendido na fase de pré-lançamento',
    topografia: 'Plano',
    orientacao: 'Poente',
    duat: 'Regularizado (Processo Municipal)',
  },
  {
    id: 'LOTE-06',
    numero: '06',
    bloco: 'B',
    area_m2: 750,
    dimensoes: '25m x 30m',
    preco_mzn: 1150000,
    preco_formatado: '1.150.000 MT',
    entrada_minima_mzn: 230000,
    prestacoes_meses: 24,
    valor_prestacao_mzn: 38333,
    estado: 'livre',
    destaque: 'Grande metragem para moradia de luxo com piscina',
    topografia: 'Plano e 100% limpo',
    orientacao: 'Nascente',
    duat: 'Regularizado (Processo Municipal)',
  },
  {
    id: 'LOTE-07',
    numero: '07',
    bloco: 'C',
    area_m2: 450,
    dimensoes: '15m x 30m',
    preco_mzn: 690000,
    preco_formatado: '690.000 MT',
    entrada_minima_mzn: 138000,
    prestacoes_meses: 24,
    valor_prestacao_mzn: 23000,
    estado: 'livre',
    destaque: 'Zona tranquila do condomínio, excelente privacidade',
    topografia: 'Plano',
    orientacao: 'Norte',
    duat: 'Regularizado (Processo Municipal)',
  },
  {
    id: 'LOTE-08',
    numero: '08',
    bloco: 'C',
    area_m2: 1000,
    dimensoes: '25m x 40m',
    preco_mzn: 1550000,
    preco_formatado: '1.550.000 MT',
    entrada_minima_mzn: 310000,
    prestacoes_meses: 24,
    valor_prestacao_mzn: 51666,
    estado: 'livre',
    destaque: 'Lote Master VIP: 1.000m² em ponto alto com privacidade absoluta',
    topografia: 'Plano',
    orientacao: 'Nascente / Poente',
    duat: 'Regularizado (Processo Municipal)',
  },
];

interface LotsGridProps {
  onSelectLoteForForm?: (loteId: string) => void;
}

export default function LotsGrid({ onSelectLoteForForm }: LotsGridProps) {
  const [lotes, setLotes] = useState<Lote[]>(FALLBACK_LOTES);
  const [statusFilter, setStatusFilter] = useState<'todos' | 'livre' | 'reservado' | 'vendido'>('todos');
  const [sizeFilter, setSizeFilter] = useState<'todos' | 'ate500' | 'mais500'>('todos');
  const [selectedLoteForCalc, setSelectedLoteForCalc] = useState<Lote | null>(null);
  const [simulatedMonths, setSimulatedMonths] = useState<number>(24);
  const [simulatedDownPaymentPercent, setSimulatedDownPaymentPercent] = useState<number>(20);

  // Load from /data/lotes.json dynamically
  useEffect(() => {
    fetch('/data/lotes.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLotes(data);
        }
      })
      .catch((err) => {
        console.debug('Using bundled fallback lotes:', err);
      });
  }, []);

  // Filter lots
  const filteredLotes = lotes.filter((lote) => {
    if (statusFilter !== 'todos' && lote.estado !== statusFilter) return false;
    if (sizeFilter === 'ate500' && lote.area_m2 > 500) return false;
    if (sizeFilter === 'mais500' && lote.area_m2 <= 500) return false;
    return true;
  });

  const handleLoteWhatsAppClick = (lote: Lote) => {
    trackConversion('InitiateCheckout', {
      lote: lote.numero,
      area: lote.area_m2,
      value: lote.preco_mzn,
      currency: 'MZN',
    });
  };

  return (
    <section id="lotes" className="py-20 bg-[#0E0E0E] text-white border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 mb-2">
              Inventário Atualizado · /data/lotes.json
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Lotes Disponíveis & Condições de Pagamento
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Escolha a dimensão que melhor se adapta ao projeto da sua moradia. Sem taxas surpresa e com parcelamento transparente.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-400 font-mono bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl self-start md:self-auto">
            <span className="text-emerald-400 font-semibold">
              {lotes.filter((l) => l.estado === 'livre').length} Livres
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-semibold">
              {lotes.filter((l) => l.estado === 'reservado').length} Reservados
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-500">
              {lotes.filter((l) => l.estado === 'vendido').length} Vendidos
            </span>
          </div>
        </div>

        {/* Filter Controls (Segmented buttons - allowed per Section 1.A) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-800">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/90 border border-neutral-800 rounded-xl">
            <button
              onClick={() => setStatusFilter('todos')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === 'todos'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Todos os Lotes ({lotes.length})
            </button>
            <button
              onClick={() => setStatusFilter('livre')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === 'livre'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Apenas Livres
            </button>
            <button
              onClick={() => setStatusFilter('reservado')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === 'reservado'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Reservados
            </button>
            <button
              onClick={() => setStatusFilter('vendido')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === 'vendido'
                  ? 'bg-neutral-800 text-neutral-400'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Vendidos
            </button>
          </div>

          {/* Size Filter */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <SlidersHorizontal className="w-4 h-4 text-gold-400" />
            <span>Dimensão:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSizeFilter('todos')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  sizeFilter === 'todos' ? 'text-gold-400 font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Todas
              </button>
              <span className="text-neutral-700">/</span>
              <button
                onClick={() => setSizeFilter('ate500')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  sizeFilter === 'ate500' ? 'text-gold-400 font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Até 500m²
              </button>
              <span className="text-neutral-700">/</span>
              <button
                onClick={() => setSizeFilter('mais500')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  sizeFilter === 'mais500' ? 'text-gold-400 font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                + de 500m²
              </button>
            </div>
          </div>
        </div>

        {/* Lots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-14">
          {filteredLotes.map((lote) => {
            const isLivre = lote.estado === 'livre';
            const isReservado = lote.estado === 'reservado';
            const isVendido = lote.estado === 'vendido';

            return (
              <div
                key={lote.id}
                className={`rounded-2xl border transition-all flex flex-col justify-between p-6 ${
                  isLivre
                    ? 'bg-neutral-900/80 border-neutral-800 hover:border-gold-500/50 hover:shadow-lg'
                    : isReservado
                    ? 'bg-neutral-900/50 border-amber-900/40'
                    : 'bg-neutral-950/70 border-neutral-800/50 opacity-60'
                }`}
              >
                <div>
                  {/* Card Header (Unboxed metadata per Section 1.A) */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
                    <div>
                      <span className="text-xs font-mono font-medium text-neutral-400 uppercase">
                        Bloco {lote.bloco}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-white">
                        Lote {lote.numero}
                      </h3>
                    </div>

                    {/* Status Text (Clean unboxed inline typography) */}
                    <div>
                      {isLivre && (
                        <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                          Livre para Reserva
                        </span>
                      )}
                      {isReservado && (
                        <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">
                          Reservado
                        </span>
                      )}
                      {isVendido && (
                        <span className="text-xs font-semibold text-neutral-500 tracking-wide uppercase">
                          Vendido
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lot Highlight */}
                  <p className="text-xs text-neutral-300 italic mb-5 min-h-[32px]">
                    "{lote.destaque}"
                  </p>

                  {/* Specifications */}
                  <div className="space-y-2.5 text-xs text-neutral-300 mb-6 bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800/70">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Área Total:</span>
                      <span className="font-semibold text-white font-mono tabular-nums">
                        {lote.area_m2} m²
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Dimensões:</span>
                      <span className="text-white font-mono tabular-nums">{lote.dimensoes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Topografia:</span>
                      <span className="text-white">{lote.topografia}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Situação DUAT:</span>
                      <span className="text-gold-400 font-medium">{lote.duat}</span>
                    </div>
                  </div>

                  {/* Price and Installment Details */}
                  <div className="mb-6">
                    <div className="text-xs text-neutral-400 mb-1">Preço Pronto Pagamento:</div>
                    <div className="text-2xl font-bold font-serif text-gold-300 font-mono tabular-nums">
                      {lote.preco_formatado}
                    </div>

                    {isLivre && (
                      <div className="mt-2 text-xs text-neutral-300 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-400">Entrada mín. (20%):</span>
                          <span className="font-mono tabular-nums font-medium text-white">
                            {lote.entrada_minima_mzn.toLocaleString('pt-MZ')} MT
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-400">Até 24x sem juros:</span>
                          <span className="font-mono tabular-nums font-semibold text-emerald-400">
                            {Math.round(lote.valor_prestacao_mzn).toLocaleString('pt-MZ')} MT/mês
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  {isLivre ? (
                    <>
                      <a
                        href={buildWhatsAppUrl({
                          loteNumero: lote.numero,
                          loteArea: lote.area_m2,
                          lotePreco: lote.preco_formatado,
                          context: 'lote_card',
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLoteWhatsAppClick(lote)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#E8C766] to-[#C9A227] hover:from-[#F0D584] hover:to-[#DEB843] rounded-xl transition-all shadow-md active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4 fill-black/20" />
                        <span>Reservar no WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLoteForCalc(lote);
                          if (onSelectLoteForForm) {
                            onSelectLoteForForm(`Lote ${lote.numero} (${lote.area_m2}m²)`);
                          }
                        }}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg transition-colors"
                      >
                        <Calculator className="w-3.5 h-3.5 text-gold-400" />
                        <span>Simular Prestações</span>
                      </button>
                    </>
                  ) : isReservado ? (
                    <a
                      href={buildWhatsAppUrl({
                        customMessage: `Olá! Vi que o Lote ${lote.numero} (${lote.area_m2}m²) está reservado no Condomínio Dolce Vita. Gostaria de entrar na lista de espera caso haja desistência.`,
                        context: 'lote_card',
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium text-amber-300 bg-amber-950/60 border border-amber-800/60 rounded-xl hover:bg-amber-900/50 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Fila de Espera no WhatsApp</span>
                    </a>
                  ) : (
                    <div className="py-2.5 text-center text-xs text-neutral-500 font-medium">
                      Lote vendido · Não disponível
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Installment Simulator Modal / Card */}
        {selectedLoteForCalc && (
          <div className="bg-neutral-900 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto mb-10 shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    Simulador de Prestações: Lote {selectedLoteForCalc.numero} ({selectedLoteForCalc.area_m2}m²)
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Valor total de tabela:{' '}
                    <span className="text-gold-300 font-semibold font-mono tabular-nums">
                      {selectedLoteForCalc.preco_formatado}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLoteForCalc(null)}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Fechar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Slider Entrada */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Percentagem de Entrada:{' '}
                  <span className="text-gold-400 font-semibold font-mono">{simulatedDownPaymentPercent}%</span>
                  {' '}(
                  <span className="font-mono tabular-nums">
                    {Math.round(
                      (selectedLoteForCalc.preco_mzn * simulatedDownPaymentPercent) / 100
                    ).toLocaleString('pt-MZ')}{' '}
                    MT
                  </span>
                  )
                </label>
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="5"
                  value={simulatedDownPaymentPercent}
                  onChange={(e) => setSimulatedDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#C9A227] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1 font-mono">
                  <span>20% (Mínimo)</span>
                  <span>40%</span>
                  <span>60%</span>
                </div>
              </div>

              {/* Slider Meses */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Prazo de Financiamento Directo:{' '}
                  <span className="text-gold-400 font-semibold font-mono">{simulatedMonths} meses</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[6, 12, 18, 24].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSimulatedMonths(m)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                        simulatedMonths === m
                          ? 'bg-gold-500 text-black border-gold-400'
                          : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                      }`}
                    >
                      {m}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulation Result */}
            {(() => {
              const downPayment = (selectedLoteForCalc.preco_mzn * simulatedDownPaymentPercent) / 100;
              const remaining = selectedLoteForCalc.preco_mzn - downPayment;
              const monthly = remaining / simulatedMonths;

              return (
                <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-neutral-400">Prestação Mensal Estimada:</span>
                    <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                      {Math.round(monthly).toLocaleString('pt-MZ')} MT / mês
                    </div>
                    <span className="text-[11px] text-neutral-500">
                      Entrada de {Math.round(downPayment).toLocaleString('pt-MZ')} MT + {simulatedMonths} prestações sem juros
                    </span>
                  </div>

                  <a
                    href={buildWhatsAppUrl({
                      customMessage: `Olá! Fiz uma simulação para o Lote ${selectedLoteForCalc.numero} (${selectedLoteForCalc.area_m2}m²): Entrada de ${Math.round(downPayment).toLocaleString('pt-MZ')} MT e ${simulatedMonths}x de ${Math.round(monthly).toLocaleString('pt-MZ')} MT. Quero avançar com a reserva.`,
                      context: 'lote_card',
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-black bg-gold-gradient rounded-xl hover:opacity-95 transition-all shadow-md active:scale-95 whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 fill-black/20" />
                    <span>Aprovar Proposta no WhatsApp</span>
                  </a>
                </div>
              );
            })()}
          </div>
        )}

        {/* Guarantee Note */}
        <div className="text-center max-w-xl mx-auto text-xs text-neutral-400">
          <p>
            * Todos os valores são em Meticais (MZN) e incluem parcelamento cadastral e demarcação física com piquetes. Escritura e averbamento do DUAT sujeitos às taxas municipais regulamentares em vigor.
          </p>
        </div>
      </div>
    </section>
  );
}
