import { useState } from 'react';
import { CheckCircle2, Circle, Eye, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export default function AboutCondo() {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);

  const gallery = [
    {
      title: 'Topografia & Arruamentos Abertos',
      subtitle: 'Demarcações com piquetes e terraplanagem em execução',
      src: '/images/masterplan_plots.jpg',
      aspect: 'Lotes demarcados e solo plano',
    },
    {
      title: 'Conceito da Portaria de Segurança',
      subtitle: 'Controlo rigoroso 24 horas e muro perimetral planeado',
      src: '/images/condo_gate.jpg',
      aspect: 'Acesso controlado para moradores',
    },
    {
      title: 'Localização Elevada em Marracuene',
      subtitle: 'Solo seco, brisa fresca e afastado de zonas inundáveis',
      src: '/images/hero_drone.jpg',
      aspect: 'Vista panorâmica do desenvolvimento',
    },
    {
      title: 'Padrão Arquitetónico Sugerido',
      subtitle: 'Liberdade construtiva com valorização estética coletiva',
      src: '/images/villa_concept.jpg',
      aspect: 'Moradias contemporâneas unifamiliares',
    },
  ];

  const stages = [
    {
      fase: 'Fase 1',
      title: 'Regularização e Levantamento Cadastral',
      status: 'concluido',
      desc: 'Levantamento de coordenadas GPS e registo perante os órgãos reguladores de Marracuene.',
    },
    {
      fase: 'Fase 2',
      title: 'Demarcação Física com Piquetes',
      status: 'concluido',
      desc: 'Fixação de marcos de concreto e identificação no terreno de cada lote individual.',
    },
    {
      fase: 'Fase 3',
      title: 'Abertura das Vias Principais e Acessos',
      status: 'em_andamento',
      desc: 'Nivelamento de vias internas e acessos diretos para circulação de viaturas de obras.',
    },
    {
      fase: 'Fase 4',
      title: 'Portaria, Vedação e Redes de Abastecimento',
      status: 'a_seguir',
      desc: 'Execução da guarita de controlo, muro perimetral e encaminhamento das ligações de água e luz.',
    },
  ];

  return (
    <section id="condominio" className="py-20 bg-[#0A0A0A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 mb-3">
            O Projeto
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
            Um condomínio pensado para quem valoriza sossego, privacidade e valorização patrimonial.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            O Condomínio Dolce Vita nasce para dar resposta à necessidade crescente de habitação de qualidade em Marracuene. Esqueça os bairros desordenados: aqui o seu investimento está protegido por um traçado urbanístico limpo, regras claras de vizinhança e tranquilidade garantida.
          </p>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {gallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageModal(item.src)}
              className="relative group rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-gold-500/50 transition-all cursor-pointer shadow-lg"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Overlay Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1 block">
                      {item.aspect}
                    </span>
                    <h3 className="text-lg font-semibold text-white group-hover:text-gold-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1">{item.subtitle}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-neutral-900/80 border border-neutral-700 flex items-center justify-center text-white group-hover:bg-gold-500 group-hover:text-black transition-colors shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estado da Obra / Construction Timeline */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
            <div>
              <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
                Relatório de Campo
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Estado Atual da Obra e Desenvolvimento
              </h3>
            </div>
            <a
              href={buildWhatsAppUrl({
                customMessage: 'Olá! Gostaria de agendar uma visita para ver o andamento da obra do Condomínio Dolce Vita no local.',
                context: 'visita',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-black bg-gold-gradient rounded-xl hover:opacity-95 transition-all self-start md:self-auto"
            >
              <span>Verificar Pessoalmente em Visita</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage, sIdx) => {
              const isDone = stage.status === 'concluido';
              const isInProgress = stage.status === 'em_andamento';

              return (
                <div
                  key={sIdx}
                  className={`p-5 rounded-2xl border transition-all ${
                    isDone
                      ? 'bg-neutral-900/90 border-neutral-700'
                      : isInProgress
                      ? 'bg-neutral-900/90 border-gold-500/50 glow-gold'
                      : 'bg-neutral-950/60 border-neutral-800/80 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-semibold text-neutral-400">
                      {stage.fase}
                    </span>
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Concluído
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-gold-400">
                        <Circle className="w-3 h-3 fill-gold-400" />
                        Em Execução (80%)
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-neutral-500">A Seguir</span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{stage.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImageModal(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gold-400 focus:outline-none"
              aria-label="Fechar visualização"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={activeImageModal}
              alt="Visualização expandida"
              className="max-h-[80vh] w-auto rounded-xl object-contain border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
