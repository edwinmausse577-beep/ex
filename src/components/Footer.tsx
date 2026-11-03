import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, getWhatsAppNumber } from '../utils/whatsapp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-neutral-400 text-xs sm:text-sm border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Col 1: Marca */}
          <div className="space-y-4">
            <a
              href="#"
              className="text-xl font-serif font-bold tracking-wider text-white hover:text-gold-300 transition-colors block"
            >
              DOLCE VITA_REAL ESTATE
            </a>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Especialistas em desenvolvimento e comercialização de empreendimentos residenciais e lotes com garantia jurídica na Província de Maputo.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-300 hover:border-gold-500/40 transition-colors"
                aria-label="Instagram Dolce Vita Real Estate"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold-300 hover:border-gold-500/40 transition-colors"
                aria-label="Facebook Dolce Vita Real Estate"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={buildWhatsAppUrl({ context: 'navbar' })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="WhatsApp Oficial"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Projetos Relacionados */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Projetos do Grupo
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <span className="text-gold-400 font-semibold">Condomínio Dolce Vita</span>{' '}
                <span className="text-neutral-500">(Marracuene - Em comercialização)</span>
              </li>
              <li className="hover:text-white transition-colors">
                <span>Pérola del Sol</span>{' '}
                <span className="text-neutral-500">(Empreendimento Residencial)</span>
              </li>
              <li className="hover:text-white transition-colors">
                <span>Rio del Mar</span>{' '}
                <span className="text-neutral-500">(Condomínio de Luxo)</span>
              </li>
              <li className="hover:text-white transition-colors">
                <span>Empire Residence</span>{' '}
                <span className="text-neutral-500">(Edifício Residencial)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navegação Rápida */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#condominio" className="hover:text-gold-300 transition-colors">
                  O Condomínio
                </a>
              </li>
              <li>
                <a href="#lotes" className="hover:text-gold-300 transition-colors">
                  Tabela de Lotes & Preços
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-gold-300 transition-colors">
                  Localização em Marracuene
                </a>
              </li>
              <li>
                <a href="#como-comprar" className="hover:text-gold-300 transition-colors">
                  4 Passos para Comprar
                </a>
              </li>
              <li>
                <a href="#perguntas" className="hover:text-gold-300 transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a href="#formulario" className="hover:text-gold-300 transition-colors text-gold-400">
                  Agendar Visita
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacto Oficial */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Atendimento Oficial
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Marracuene, Província de Maputo, Moçambique</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`tel:+${getWhatsAppNumber()}`}
                  className="hover:text-gold-300 transition-colors font-mono"
                >
                  +258 86 500 0777
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-neutral-400">vendas@dolcevitarealestate.co.mz</span>
              </div>
              <p className="text-[11px] text-neutral-500 pt-1">
                Segunda a Sábado: 08:00 - 18:00<br />
                Visitas ao Domingo mediante agendamento prévio.
              </p>
            </div>
          </div>
        </div>

        {/* Legal notice & Copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {currentYear} Dolce Vita_Real Estate. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Privacidade & Tratamento de Dados</span>
            <span aria-hidden="true">·</span>
            <span>Aviso Legal Fundiário</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
