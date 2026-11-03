import { getStoredOrUrlUTMs } from './utms';

// Default Mozambique official phone for Dolce Vita Real Estate
export const DEFAULT_WHATSAPP_NUMBER = '258865000777';

export function getWhatsAppNumber(): string {
  // Check Vite and Next.js compatible env variables or fallback to 258865000777
  const envNum =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WHATSAPP_NUMBER) ||
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_WHATSAPP_NUMBER);

  if (envNum && typeof envNum === 'string' && envNum.trim().length > 0) {
    // Strip non-numeric characters just in case
    return envNum.replace(/\D/g, '');
  }

  return DEFAULT_WHATSAPP_NUMBER;
}

export interface WhatsAppLinkOptions {
  customMessage?: string;
  loteNumero?: string;
  loteArea?: number;
  lotePreco?: string;
  context?: 'hero' | 'lote_card' | 'navbar' | 'sticky' | 'form_sucesso' | 'visita' | 'faq';
}

export function buildWhatsAppUrl(options: WhatsAppLinkOptions = {}): string {
  const number = getWhatsAppNumber();
  const utms = getStoredOrUrlUTMs();
  const sourceTag = utms.utm_source ? ` (origem: ${utms.utm_source})` : '';

  let message = options.customMessage;

  if (!message) {
    if (options.loteNumero) {
      message = `Olá! Vi o Lote ${options.loteNumero}${options.loteArea ? ` de ${options.loteArea}m²` : ''} no Condomínio Dolce Vita${sourceTag} e gostaria de saber as condições de reserva.`;
    } else if (options.context === 'visita') {
      message = `Olá! Tenho interesse no Condomínio Dolce Vita em Marracuene${sourceTag} e quero agendar uma visita presencial ao terreno.`;
    } else if (options.context === 'form_sucesso') {
      message = `Olá! Acabei de submeter os meus dados no site do Condomínio Dolce Vita${sourceTag} e pretendo atendimento prioritário.`;
    } else {
      message = `Olá! Vi o Condomínio Dolce Vita em Marracuene${sourceTag} e quero agendar uma visita e receber o catálogo com os preços.`;
    }
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

/**
 * Fires Meta Pixel and GA4 event if tracking is installed
 */
export function trackConversion(eventName: string, params: Record<string, unknown> = {}) {
  try {
    // Meta Pixel
    if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', eventName, params);
    }

    // Google Analytics
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, params);
    }
  } catch (err) {
    console.debug('Tracking event error:', err);
  }
}
