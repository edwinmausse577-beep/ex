import { FileCheck, Compass, HardHat, ShieldCheck, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export default function TrustIndicators() {
  const indicators = [
    {
      icon: FileCheck,
      title: 'Segurança Jurídica & DUAT',
      tagline: 'Fim do receio de sobreposição de terras',
      description:
        'Cada lote possui levantamento topográfico oficial e enquadramento cadastral no Município de Marracuene. Sem intermediários duvidosos nem conflitos comunitários.',
      fact: 'Processo cadastral e certidão de delimitação acessíveis para consulta.',
    },
    {
      icon: Compass,
      title: 'Localização Alta e Solo Seco',
      tagline: 'Terreno 100% livre de cheias',
      description:
        'Marracuene é a zona de eleição para quem foge da saturação do centro de Maputo. Solo firme com excelente drenagem natural, ideal para fundações sólidas sem custos ocultos.',
      fact: 'A 20 minutos do centro da cidade pela Estrada Circular de Maputo.',
    },
    {
      icon: HardHat,
      title: 'Fase da Obra no Terreno',
      tagline: 'Topografia e vias abertas no local',
      description:
        'Não vendemos promessas em papel. O parcelamento está piqueteado no solo, com eixos de ruas definidos para que possa pisar o seu lote exato antes de pagar qualquer valor.',
      fact: 'Vias de circulação abertas e piquetes georreferenciados.',
    },
    {
      icon: ShieldCheck,
      title: 'Condomínio Fechado Privado',
      tagline: 'Privacidade e valorização patrimonial',
      description:
        'Conceito de bairro planeado com portaria de controlo de acessos 24 horas, vedação perimetral e regulamento interno para assegurar um padrão arquitetónico harmonioso.',
      fact: 'Infraestrutura de água e energia em fase de implementação.',
    },
  ];

  return (
    <section className="py-20 bg-[#0E0E0E] border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 mb-3">
            Transparência Absoluta
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
            Compre o seu lote sem medo de conflitos fundiários.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Em Moçambique, a maior preocupação de quem compra um terreno é a falta de documentação clara e o perigo de dupla venda. Na Dolce Vita_Real Estate, cada etapa é acompanhada com suporte jurídico rigoroso.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {indicators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-8 hover:border-gold-500/40 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-gold-400/90 mb-3">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center gap-2 text-xs text-neutral-300">
                  <span className="font-semibold text-gold-400">Facto Verificável:</span>
                  <span>{item.fact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Adjacency Proof Callout with direct CTA */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-gold-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-1">
              Deseja consultar a planta de demarcação e documentação?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              Disponibilizamos a pasta técnica para os clientes interessados antes de qualquer pagamento.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl({
              customMessage: 'Olá! Gostaria de receber a planta topográfica e comprovação documental do Condomínio Dolce Vita.',
              context: 'hero',
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-black bg-gold-gradient hover:opacity-95 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0"
          >
            <span>Pedir Documentos no WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
