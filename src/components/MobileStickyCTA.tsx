import { MessageCircle, MapPin } from 'lucide-react';
import { buildWhatsAppUrl, trackConversion } from '../utils/whatsapp';

export default function MobileStickyCTA() {
  const handleStickyWhatsAppClick = () => {
    trackConversion('Contact', { method: 'sticky_bar_whatsapp' });
  };

  return (
    <>
      {/* Mobile Fixed Bottom Bar (Strictly capped under 60px / <10% mobile viewport) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-neutral-800 p-2.5 px-4 shadow-2xl flex items-center gap-3">
        {/* Secondary fast jump to lots */}
        <a
          href="#lotes"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-700 rounded-xl active:bg-neutral-800 transition-colors whitespace-nowrap"
        >
          <MapPin className="w-3.5 h-3.5 text-gold-400" />
          <span>Ver Lotes</span>
        </a>

        {/* Primary WhatsApp Conversion CTA */}
        <a
          href={buildWhatsAppUrl({ context: 'sticky' })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleStickyWhatsAppClick}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 text-xs font-bold text-black bg-gradient-to-r from-[#E8C766] to-[#C9A227] active:from-[#F0D584] active:to-[#DEB843] rounded-xl shadow-lg shadow-gold-500/25 transition-all whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 fill-black/20" />
          <span>WhatsApp Oficial</span>
        </a>
      </div>

      {/* Desktop/Tablet Floating WhatsApp Button (Bottom-right corner) */}
      <aside aria-label="Atendimento rápido" className="hidden md:block fixed bottom-8 right-8 z-40 group">
        <a
          href={buildWhatsAppUrl({ context: 'hero' })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackConversion('Contact', { method: 'desktop_floating_whatsapp' })}
          className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-[#E8C766] to-[#C9A227] hover:from-[#F0D584] hover:to-[#DEB843] text-black font-bold text-sm rounded-full shadow-2xl hover:shadow-gold-500/40 hover:scale-105 transition-all duration-300"
          aria-label="Falar com corretor no WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-black/20" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black" />
          </div>
          <span>Agendar no WhatsApp</span>
        </a>
      </aside>
    </>
  );
}
