import { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'O terreno possui DUAT regularizado e documentação comprovável?',
      a: 'Sim. O Condomínio Dolce Vita possui processo de parcelamento e enquadramento cadastral aprovado nos órgãos reguladores competentes de Marracuene. Disponibilizamos a planta topográfica georreferenciada e os comprovativos documentais para consulta prévia do seu advogado ou consultor de confiança antes de qualquer compromisso financeiro.',
    },
    {
      q: 'Como funciona o parcelamento em até 24 prestações? Há juros bancários?',
      a: 'O parcelamento é direto com a Dolce Vita_Real Estate, sem burocracias de aprovação bancária nem taxas de juros escondidas. O comprador adianta uma entrada mínima (a partir de 20%) e liquida o restante em até 24 mensalidades fixas em Meticais (MZN).',
    },
    {
      q: 'Existe risco de dupla venda ou litígio com a comunidade local?',
      a: 'Não. Todas as parcelas estão delimitadas com piquetes físicos no solo e cadastradas no mapa mestre do condomínio. Ao reservar, o lote é imediatamente retirado do inventário com contrato formal e comprovativo bancário oficial. Não trabalhamos com posse informal ou intermediários não credenciados.',
    },
    {
      q: 'Quando posso começar a construir a minha casa?',
      a: 'Poderá dar início à preparação do solo, vedação e fundações assim que atingir 50% do pagamento acordado e tiver o seu projeto de arquitetura submetido de acordo com as diretrizes do regulamento interno do condomínio.',
    },
    {
      q: 'Como funciona a compra se eu estiver na diáspora (África do Sul, Portugal, Reino Unido)?',
      a: 'Atendemos dezenas de clientes residentes no estrangeiro. Realizamos visitas guiadas por videochamada em direto no lote exato, enviamos relatórios fotográficos e tratamos da minuta contratual digital com total validade jurídica e assistência bancária internacional.',
    },
    {
      q: 'O condomínio terá portaria 24h e infraestrutura de água e energia?',
      a: 'Sim. O projeto do Condomínio Dolce Vita inclui guarita de segurança com controlo de acessos permanente, muro perimetral, vias internas niveladas e previsão de ligação às redes de eletricidade e captação/distribuição de água potável.',
    },
    {
      q: 'Existe desconto para pronto pagamento?',
      a: 'Sim. Para clientes que efetuam o pagamento integral a pronto na celebração do contrato, aplicamos uma bonificação comercial sobre o valor de tabela do lote.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="perguntas" className="py-20 bg-[#0A0A0A] text-white border-b border-neutral-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 mb-3 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Tire as Suas Dúvidas</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
            Perguntas Frequentes & Respostas Claras
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A transparência é o nosso principal pilar. Veja as respostas diretas às questões mais comuns colocadas pelos nossos clientes.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-14">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-neutral-900/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-medium text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Objection Adjacency WhatsApp CTA */}
        <div className="bg-neutral-900/70 border border-gold-500/30 rounded-2xl p-6 sm:p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-1">
              Tem alguma dúvida específica sobre um dos lotes?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              A nossa equipa comercial responde diretamente no WhatsApp em poucos minutos.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl({
              customMessage: 'Olá! Estive a ler as perguntas frequentes do Condomínio Dolce Vita e tenho uma dúvida adicional.',
              context: 'faq',
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-black bg-gold-gradient rounded-xl hover:opacity-95 transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-black/20" />
            <span>Falar com Consultor</span>
          </a>
        </div>
      </div>
    </section>
  );
}
