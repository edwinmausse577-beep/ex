import { Eye, MapPin, FileSignature, Award, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export default function HowToBuy() {
  const steps = [
    {
      num: '01',
      icon: Eye,
      title: 'Visita Guiada ao Terreno',
      subtitle: 'Sem compromisso',
      description:
        'Acompanhamos o cliente ao local para inspecionar os acessos, a vizinhança e o ambiente. Se estiver fora de Moçambique (África do Sul, Europa, etc.), realizamos visita guiada por vídeo em direto.',
    },
    {
      num: '02',
      icon: MapPin,
      title: 'Escolha e Identificação do Lote',
      subtitle: 'Conferência física',
      description:
        'Pisa no terreno e verifica pessoalmente os marcos de concreto e a delimitação topográfica do lote que escolheu na planta do condomínio.',
    },
    {
      num: '03',
      icon: FileSignature,
      title: 'Reserva e Contrato-Promessa (CPCV)',
      subtitle: 'Segurança bancária',
      description:
        'Pagamento da entrada por transferência ou depósito na conta bancária oficial da Dolce Vita_Real Estate. Emissão de recibo e assinatura do Contrato de Promessa de Compra e Venda.',
    },
    {
      num: '04',
      icon: Award,
      title: 'Quitação e Transmissão do DUAT',
      subtitle: 'Titulação definitiva',
      description:
        'Com a liquidação das prestações (ou pagamento a pronto), é emitida a declaração formal de quitação e instruído o processo de registo e averbamento do DUAT em seu nome.',
    },
  ];

  return (
    <section id="como-comprar" className="py-20 bg-[#0E0E0E] text-white border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 mb-3">
            Processo Transparente
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
            Como comprar o seu lote em 4 passos simples e seguros.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Eliminamos burocracias desnecessárias e intermediários informais. Cada etapa é documentada e acompanhada pela equipa jurídica da Dolce Vita_Real Estate.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-gold-500/40 transition-colors relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-serif font-bold text-gold-400/80 font-mono tabular-nums">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                  <span className="text-xs font-medium text-gold-400/90 block mb-3">
                    {step.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 font-mono">
                  Etapa {step.num} de 04
                </div>
              </div>
            );
          })}
        </div>

        {/* Conversion Action Box */}
        <div className="text-center max-w-xl mx-auto">
          <p className="text-sm text-neutral-300 mb-5">
            O primeiro passo é sempre visitar e conhecer o local sem qualquer compromisso.
          </p>
          <a
            href={buildWhatsAppUrl({
              customMessage: 'Olá! Li os 4 passos para comprar no Condomínio Dolce Vita e quero dar o primeiro passo: agendar a minha visita guiada.',
              context: 'visita',
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-black bg-gradient-to-r from-[#E8C766] to-[#C9A227] hover:from-[#F0D584] hover:to-[#DEB843] rounded-xl transition-all shadow-lg shadow-gold-500/20 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-black/20" />
            <span>Agendar visita no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
