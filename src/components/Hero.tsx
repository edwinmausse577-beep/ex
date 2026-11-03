import { MessageCircle, ChevronDown, ShieldCheck, MapPin, Layers, Clock } from 'lucide-react';
import { buildWhatsAppUrl, trackConversion } from '../utils/whatsapp';

export default function Hero() {
  const handleWhatsAppHero = () => {
    trackConversion('Lead', { source: 'hero_primary_cta' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-neutral-950 text-white">
      {/* Background Drone Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_drone.jpg"
          alt="Vista aérea do Condomínio Dolce Vita em Marracuene Moçambique"
          className="w-full h-full object-cover object-center scale-105 transform animate-fade-in"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark scrim for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-black/60" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16 flex-1 flex flex-col justify-center text-center">
        {/* Clean Editorial Kicker (Zero-Pill discipline) */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-gold-400 mb-4 sm:mb-6">
          <span>Dolce Vita_Real Estate</span>
          <span aria-hidden="true" className="text-neutral-500">·</span>
          <span>Marracuene, Moçambique</span>
          <span aria-hidden="true" className="text-neutral-500">·</span>
          <span>Acesso pela Circular</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight mb-6" style={{ textWrap: 'balance' }}>
          O seu terreno com <span className="text-gold-gradient">DUAT regularizado</span> num condomínio privado em Marracuene.
        </h1>

        {/* Subtitle with direct Mozambique value proposition */}
        <p className="text-base sm:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
          Lotes residenciais planos, demarcados e com infraestrutura planeada. Invista sem receio de sobreposições de terra, com pagamento facilitado em até 24 prestações directas.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto w-full">
          {/* Primary CTA - WhatsApp */}
          <a
            href={buildWhatsAppUrl({ context: 'hero' })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppHero}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-black bg-gradient-to-r from-[#E8C766] to-[#C9A227] hover:from-[#F0D584] hover:to-[#DEB843] rounded-xl transition-all shadow-lg shadow-gold-500/20 active:scale-98 whitespace-nowrap"
          >
            <MessageCircle className="w-5 h-5 fill-black/20" />
            <span>Agendar visita no WhatsApp</span>
          </a>

          {/* Secondary CTA - View Lots */}
          <a
            href="#lotes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-medium text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 hover:border-gold-500/50 rounded-xl transition-all whitespace-nowrap"
          >
            <span>Ver lotes disponíveis</span>
            <ChevronDown className="w-4 h-4 text-gold-400" />
          </a>
        </div>
      </div>

      {/* Trust KPI Strip (Full-width row directly below hero) */}
      <div className="relative z-10 w-full border-t border-neutral-800/80 bg-neutral-950/90 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-gold-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">DUAT e Titulação</p>
                <p className="text-xs text-neutral-400">Processo legal regularizado</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-gold-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">20 Minutos de Maputo</p>
                <p className="text-xs text-neutral-400">Acesso via Circular e EN1</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-gold-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Lotes de 450m² a 1.000m²</p>
                <p className="text-xs text-neutral-400">Demarcados com piquetes</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-gold-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Até 24x Prestações</p>
                <p className="text-xs text-neutral-400">Pagamento directo sem juros</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
