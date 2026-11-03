import { UTMParams } from '../types';

const UTM_STORAGE_KEY = 'dolce_vita_utms';

export function getStoredOrUrlUTMs(): UTMParams {
  if (typeof window === 'undefined') {
    return {
      utm_source: 'site_direto',
      utm_medium: 'organico',
      utm_campaign: 'geral',
      utm_content: '',
    };
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const urlSource = params.get('utm_source');
    const urlMedium = params.get('utm_medium');
    const urlCampaign = params.get('utm_campaign');
    const urlContent = params.get('utm_content');

    // If new UTMs in query string, store them
    if (urlSource || urlMedium || urlCampaign) {
      const detected: UTMParams = {
        utm_source: urlSource || 'instagram_ads',
        utm_medium: urlMedium || 'cpc',
        utm_campaign: urlCampaign || 'lotes_marracuene',
        utm_content: urlContent || '',
      };
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(detected));
      return detected;
    }

    // Check existing stored UTMs
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.warn('Could not read UTMs', err);
  }

  return {
    utm_source: 'site_direto',
    utm_medium: 'organico',
    utm_campaign: 'geral',
    utm_content: '',
  };
}
