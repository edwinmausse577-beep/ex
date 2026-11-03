export interface Lote {
  id: string;
  numero: string;
  bloco: string;
  area_m2: number;
  dimensoes: string;
  preco_mzn: number;
  preco_formatado: string;
  entrada_minima_mzn: number;
  prestacoes_meses: number;
  valor_prestacao_mzn: number;
  estado: 'livre' | 'reservado' | 'vendido';
  destaque: string;
  topografia: string;
  orientacao: string;
  duat: string;
}

export interface LeadFormData {
  nome: string;
  telefone: string;
  orcamento: string;
  modalidade: string;
  prazo: string;
  loteInteresse: string;
  mensagem?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  dataEnvio?: string;
}

export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
}
