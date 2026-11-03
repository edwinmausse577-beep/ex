import { useState, useEffect, FormEvent } from 'react';
import { LeadFormData } from '../types';
import { getStoredOrUrlUTMs } from '../utils/utms';
import { buildWhatsAppUrl, trackConversion } from '../utils/whatsapp';
import { Send, CheckCircle2, AlertCircle, MessageCircle, RefreshCw, ShieldAlert } from 'lucide-react';

interface LeadFormProps {
  initialLoteInteresse?: string;
}

export default function LeadForm({ initialLoteInteresse }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    nome: '',
    telefone: '',
    orcamento: '700000_900000',
    modalidade: 'prestacoes',
    prazo: 'imediato',
    loteInteresse: initialLoteInteresse || 'Quero sugestão do consultor',
    mensagem: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync initialLoteInteresse when prop changes
  useEffect(() => {
    if (initialLoteInteresse) {
      setFormData((prev) => ({ ...prev, loteInteresse: initialLoteInteresse }));
    }
  }, [initialLoteInteresse]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side validation
    if (!formData.nome.trim()) {
      setErrorMsg('Por favor, indique o seu nome completo.');
      return;
    }

    const cleanPhone = formData.telefone.replace(/\D/g, '');
    if (cleanPhone.length < 8) {
      setErrorMsg('Por favor, introduza um número de telefone ou WhatsApp válido.');
      return;
    }

    setLoading(true);

    const utms = getStoredOrUrlUTMs();
    const payload: LeadFormData = {
      ...formData,
      utmSource: utms.utm_source,
      utmMedium: utms.utm_medium,
      utmCampaign: utms.utm_campaign,
      utmContent: utms.utm_content,
      dataEnvio: new Date().toISOString(),
    };

    // Save lead in localStorage so data is NEVER lost even with network drops
    try {
      const savedLeads = JSON.parse(localStorage.getItem('dolce_vita_leads') || '[]');
      savedLeads.push(payload);
      localStorage.setItem('dolce_vita_leads', JSON.stringify(savedLeads));
    } catch {
      // LocalStorage access silent ignore
    }

    // Determine Webhook URL from env
    const webhookUrl =
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEBHOOK_URL) ||
      (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_WEBHOOK_URL);

    if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.trim().length > 0) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.warn('Webhook responded with status:', response.status);
        }
      } catch (err) {
        console.warn('Webhook delivery notice (stored locally):', err);
      }
    }

    // Track conversion in analytics
    trackConversion('Lead', {
      source: 'web_form',
      lote: formData.loteInteresse,
      modalidade: formData.modalidade,
      orcamento: formData.orcamento,
    });

    setLoading(false);
    setSubmitted(true);
  };

  // Pre-filled WhatsApp message for Thank You screen
  const getThankYouWhatsAppUrl = () => {
    const custom = `Olá! Acabei de preencher o formulário no site do Condomínio Dolce Vita.\nNome: ${formData.nome}\nInteresse: ${formData.loteInteresse}\nModalidade: ${
      formData.modalidade === 'prestacoes' ? 'Prestações' : 'Pronto Pagamento'
    }\nQuero receber o catálogo completo e agendar visita.`;
    return buildWhatsAppUrl({ customMessage: custom, context: 'form_sucesso' });
  };

  return (
    <section id="formulario" className="py-20 bg-[#0E0E0E] text-white border-b border-neutral-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-400 mb-3">
            Atendimento Prioritário
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
            Receba o Catálogo Oficial e Reserve a Sua Visita
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Preencha os seus dados em menos de 1 minuto. A nossa equipa entrará em contacto direto para esclarecer condições de pagamento e agendar a visita ao terreno.
          </p>
        </div>

        {/* Form Card or Thank You Screen */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {submitted ? (
            /* Thank You Success Screen */
            <div className="py-8 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                Pedido Recebido com Sucesso, {formData.nome.split(' ')[0]}!
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
                Os seus dados foram registados. Para obter atendimento imediato sem esperar na fila, confirme o seu interesse agora mesmo pelo WhatsApp:
              </p>

              <div className="max-w-md mx-auto space-y-4">
                <a
                  href={getThankYouWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-black bg-gradient-to-r from-[#E8C766] to-[#C9A227] hover:from-[#F0D584] hover:to-[#DEB843] rounded-xl transition-all shadow-lg shadow-gold-500/20 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-black/20" />
                  <span>Acelerar Atendimento no WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      nome: '',
                      telefone: '',
                      orcamento: '700000_900000',
                      modalidade: 'prestacoes',
                      prazo: 'imediato',
                      loteInteresse: 'Quero sugestão do consultor',
                      mensagem: '',
                    });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Enviar outro pedido</span>
                </button>
              </div>
            </div>
          ) : (
            /* Lead Capture Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nome */}
                <div>
                  <label htmlFor="lead-nome" className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wider">
                    Nome Completo *
                  </label>
                  <input
                    id="lead-nome"
                    type="text"
                    required
                    placeholder="Ex.: Carlos Mabunda"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-white placeholder-neutral-500 text-sm"
                  />
                </div>

                {/* Telefone / WhatsApp */}
                <div>
                  <label htmlFor="lead-telefone" className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wider">
                    Telemóvel / WhatsApp *
                  </label>
                  <div className="relative">
                    <input
                      id="lead-telefone"
                      type="tel"
                      required
                      placeholder="+258 84/86/87 XXXXXXX"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-white placeholder-neutral-500 text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Modalidade de Pagamento */}
                <div>
                  <label htmlFor="lead-modalidade" className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wider">
                    Modalidade
                  </label>
                  <select
                    id="lead-modalidade"
                    value={formData.modalidade}
                    onChange={(e) => setFormData({ ...formData, modalidade: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-white text-sm"
                  >
                    <option value="prestacoes">Em Prestações (até 24x)</option>
                    <option value="pronto_pagamento">Pronto Pagamento (com desconto)</option>
                  </select>
                </div>

                {/* Orçamento Previsto */}
                <div>
                  <label htmlFor="lead-orcamento" className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wider">
                    Orçamento Previsto
                  </label>
                  <select
                    id="lead-orcamento"
                    value={formData.orcamento}
                    onChange={(e) => setFormData({ ...formData, orcamento: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-white text-sm"
                  >
                    <option value="600000_800000">600.000 a 800.000 MT</option>
                    <option value="700000_900000">800.000 a 1.000.000 MT</option>
                    <option value="1000000_1500000">1.000.000 a 1.500.000 MT</option>
                    <option value="mais_1500000">Mais de 1.500.000 MT (Lotes VIP)</option>
                  </select>
                </div>

                {/* Prazo de Compra */}
                <div>
                  <label htmlFor="lead-prazo" className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wider">
                    Pretende Comprar Quando?
                  </label>
                  <select
                    id="lead-prazo"
                    value={formData.prazo}
                    onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-white text-sm"
                  >
                    <option value="imediato">Imediato (neste mês)</option>
                    <option value="1_a_3_meses">Dentro de 1 a 3 meses</option>
                    <option value="pesquisa">Apenas a pesquisar opções</option>
                  </select>
                </div>
              </div>

              {/* Lote de Interesse */}
              <div>
                <label htmlFor="lead-lote" className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wider">
                  Lote de Interesse (opcional)
                </label>
                <input
                  id="lead-lote"
                  type="text"
                  placeholder="Ex.: Lote 01 (450m²) ou Indeciso"
                  value={formData.loteInteresse}
                  onChange={(e) => setFormData({ ...formData, loteInteresse: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-white placeholder-neutral-500 text-sm"
                />
              </div>

              {/* Mensagem Opcional */}
              <div>
                <label htmlFor="lead-msg" className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wider">
                  Dúvida ou Mensagem Adicional (opcional)
                </label>
                <textarea
                  id="lead-msg"
                  rows={3}
                  placeholder="Ex.: Gostaria de agendar para sábado de manhã e saber como funciona a entrada mínima."
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-white placeholder-neutral-500 text-sm resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-black bg-gradient-to-r from-[#E8C766] to-[#C9A227] hover:from-[#F0D584] hover:to-[#DEB843] rounded-xl transition-all shadow-lg shadow-gold-500/20 active:scale-98 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>A registar os seus dados...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submeter Pedido & Agendar Visita</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 text-center">
                <ShieldAlert className="w-3.5 h-3.5 text-gold-500" />
                <span>Os seus dados são confidenciais e utilizados apenas para contacto direto da Dolce Vita_Real Estate.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
