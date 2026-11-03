import { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { buildWhatsAppUrl, trackConversion } from '../utils/whatsapp';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    trackConversion('Contact', { method: 'whatsapp_navbar' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Single text element wordmark in luxury display typography */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-white hover:text-gold-300 transition-colors whitespace-nowrap shrink-0"
          >
            DOLCE VITA
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <a href="#condominio" className="hover:text-gold-300 transition-colors whitespace-nowrap shrink-0">
              O Condomínio
            </a>
            <a href="#lotes" className="hover:text-gold-300 transition-colors whitespace-nowrap shrink-0">
              Lotes & Preços
            </a>
            <a href="#localizacao" className="hover:text-gold-300 transition-colors whitespace-nowrap shrink-0">
              Localização
            </a>
            <a href="#como-comprar" className="hover:text-gold-300 transition-colors whitespace-nowrap shrink-0">
              Como Comprar
            </a>
            <a href="#perguntas" className="hover:text-gold-300 transition-colors whitespace-nowrap shrink-0">
              Perguntas Frequentes
            </a>
          </nav>

          {/* Zone 3: 1 primary action (WhatsApp CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl({ context: 'navbar' })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#E8C766] to-[#C9A227] hover:from-[#F0D584] hover:to-[#DEB843] rounded-lg transition-all shadow-md hover:shadow-gold-500/20 active:scale-95 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-black/20" />
              <span>Agendar Visita</span>
            </a>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-5 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-neutral-300">
            <a
              href="#condominio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-gold-300 transition-colors"
            >
              O Condomínio
            </a>
            <a
              href="#lotes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-gold-300 transition-colors"
            >
              Lotes Disponíveis & Valores
            </a>
            <a
              href="#localizacao"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-gold-300 transition-colors"
            >
              Localização em Marracuene
            </a>
            <a
              href="#como-comprar"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-gold-300 transition-colors"
            >
              Passo a Passo de Compra
            </a>
            <a
              href="#perguntas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-gold-300 transition-colors"
            >
              Perguntas Frequentes (FAQ)
            </a>
            <a
              href="#formulario"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-gold-300 transition-colors text-gold-400 font-semibold"
            >
              Formulário de Reserva
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
