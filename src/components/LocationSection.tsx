import { MapPin, Navigation, Car, ExternalLink, CheckCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export default function LocationSection() {
  const landmarks = [
    {
      name: 'Nó da Estrada Circular de Maputo',
      time: '6 minutos',
      description: 'Acesso rápido sem engarrafamentos urbanos para Maputo e Matola.',
    },
    {
      name: 'Centro da Vila de Marracuene',
      time: '5 minutos',
      description: 'Bancos (BIM, BCI, Standard Bank), bombas de combustível, farmácias e comércio.',
    },
    {
      name: 'Praia de Macaneta (atravessamento)',
      time: '15 minutos',
      description: 'Lazer ao fim de semana com acesso pavimentado através da nova ponte.',
    },
    {
      name: 'Aeroporto Internacional de Maputo',
      time: '22 minutos',
      description: 'Ligação direta pela Circular de Maputo sem passar pelo trânsito da cidade.',
    },
    {
      name: 'Baixa de Maputo / Zona Central',
      time: '25 a 30 minutos',
      description: 'Deslocação suave para quem trabalha no centro da capital.',
    },
  ];

  return (
    <section id="localizacao" className="py-20 bg-[#0A0A0A] text-white border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 mb-3">
            Localização Estratégica
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
            Marracuene: O vetor de maior valorização residencial na Grande Maputo.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Com a conclusão da Estrada Circular e a expansão de serviços essenciais, Marracuene tornou-se a escolha natural de quem procura qualidade de vida, ar puro e segurança, a minutos do centro de Maputo.
          </p>
        </div>

        {/* 2-Column Layout: Interactive Map + Landmarks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl">
            {/* Map Container */}
            <div className="relative w-full h-[360px] sm:h-[420px] bg-neutral-950">
              <iframe
                title="Mapa do Condomínio Dolce Vita em Marracuene"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114880.89966141434!2d32.610000!3d-25.790000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee67b5e406f52ef%3A0x868b201476b744a8!2sMarracuene%2C%20Mozambique!5e0!3m2!1sen!2smz!4v1710000000000!5m2!1sen!2smz"
                className="w-full h-full border-0 filter grayscale-[20%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating Card */}
              <div className="absolute top-4 left-4 bg-neutral-950/95 border border-gold-500/40 backdrop-blur-md p-3.5 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-gold-400 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>Condomínio Dolce Vita</span>
                </div>
                <p className="text-[11px] text-neutral-300">
                  Marracuene, Província de Maputo (acesso junto à via circular).
                </p>
              </div>
            </div>

            {/* Map Action Bar */}
            <div className="p-4 sm:p-6 bg-neutral-900/90 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400 text-center sm:text-left">
                Ponto de encontro para visitas guiadas aos fins de semana e dias úteis.
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="https://maps.google.com/?q=Marracuene,Mozambique"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-gold-400" />
                  <span>Abrir no Google Maps</span>
                </a>
                <a
                  href={buildWhatsAppUrl({
                    customMessage: 'Olá! Pretendo visitar o Condomínio Dolce Vita em Marracuene. Podem enviar a localização exata por WhatsApp?',
                    context: 'visita',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-black bg-gold-gradient rounded-xl hover:opacity-95 transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                  <span>Pedir GPS no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Landmarks Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-neutral-900/70 border border-neutral-800 rounded-3xl p-6 sm:p-7">
              <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-wider mb-4">
                <Car className="w-4 h-4" />
                <span>Distâncias & Tempos de Condução</span>
              </div>

              <div className="space-y-4">
                {landmarks.map((mark, i) => (
                  <div
                    key={i}
                    className="pb-3.5 border-b border-neutral-800/80 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between text-sm font-semibold text-white mb-1">
                      <span>{mark.name}</span>
                      <span className="text-gold-300 font-mono text-xs tabular-nums bg-neutral-950 px-2.5 py-0.5 rounded-full border border-neutral-800">
                        {mark.time}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">{mark.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro Trust Proof */}
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800/80 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-300 leading-relaxed">
                <span className="font-semibold text-white">Acesso 100% praticável em qualquer estação do ano:</span> vias de acesso transitáveis mesmo durante o período das chuvas com veículos ligeiros.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
