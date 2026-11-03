# Condomínio Dolce Vita — Landing Page de Alta Conversão

Landing page oficial de alta conversão para venda de lotes residenciais no **Condomínio Dolce Vita**, desenvolvido pela imobiliária **Dolce Vita_Real Estate** em **Marracuene, Província de Maputo, Moçambique**.

Construída com foco absoluto em conversão de leads qualificados via **WhatsApp** e **Formulário com Webhook**, otimizada para tráfego pago (Instagram Ads / Facebook Ads) em redes móveis (3G/4G).

---

## 📁 1. Estrutura de Pastas e Ficheiros

```text
├── /data
│   └── lotes.json                     # Tabela de lotes editável (preço, área, estado, prestações)
├── /public
│   ├── /images
│   │   ├── hero_drone.jpg             # Foto aérea do loteamento e envolvente em Marracuene
│   │   ├── condo_gate.jpg             # Portaria e guarita de controlo de acessos
│   │   ├── masterplan_plots.jpg       # Topografia e vias de circulação abertas
│   │   └── villa_concept.jpg          # Conceito arquitetónico de moradias modernas
├── /src
│   ├── /components
│   │   ├── Navbar.tsx                 # Top bar minimalista (Wordmark + Links + CTA WhatsApp)
│   │   ├── Hero.tsx                   # Hook com benefício direto, scrim escuro e CTAs de conversão
│   │   ├── TrustIndicators.tsx        # 4 Factos verificáveis (DUAT, solo seco, vias abertas, portaria)
│   │   ├── AboutCondo.tsx             # Descrição, galeria em bento grid e timeline do estado da obra
│   │   ├── LotsGrid.tsx               # Grelha de lotes (/data/lotes.json) + Simulador de prestações até 24x
│   │   ├── LocationSection.tsx        # Mapa de Marracuene, tempos de condução e pedido de GPS
│   │   ├── HowToBuy.tsx               # 4 Passos simples e transparentes de compra
│   │   ├── FAQSection.tsx             # Objeções reais respondidas (dupla venda, DUAT, juros, diáspora)
│   │   ├── LeadForm.tsx               # Formulário de lead, captura de UTMs, webhook POST e página de agradecimento
│   │   ├── Footer.tsx                 # Marca, projetos do grupo (Pérola del Sol, Rio del Mar, Empire)
│   │   └── MobileStickyCTA.tsx        # Barra fixa inferior mobile (<15% altura) e botão flutuante desktop
│   ├── /types
│   │   └── index.ts                   # Tipos TypeScript (Lote, LeadFormData, UTMParams)
│   ├── /utils
│   │   ├── utms.ts                    # Captura inteligente e persistência de UTMs na sessão
│   │   └── whatsapp.ts                # Construtor dinâmico de links WhatsApp com mensagens por contexto
│   ├── App.tsx                        # Montagem de todas as secções na ordem estrita solicitada
│   ├── index.css                      # Tailwind v4, tema dark (#0A0A0A), paleta dourada e tipografia
│   └── main.tsx                       # Ponto de entrada React
├── .env.example                       # Variáveis de ambiente de exemplo
├── index.html                         # SEO avançado em pt-MZ, OpenGraph, Twitter card e Schema.org
├── metadata.json                      # Metadados do applet
├── package.json                       # Dependências do projeto
└── tsconfig.json                      # Configuração TypeScript
```

---

## ⚙️ 2. Variáveis de Ambiente (.env)

Crie o seu ficheiro `.env` a partir de `.env.example`:

```bash
# Webhook para Make.com, n8n, Notion ou Google Sheets
VITE_WEBHOOK_URL="https://hook.eu1.make.com/exemplo-webhook"
NEXT_PUBLIC_WEBHOOK_URL="https://hook.eu1.make.com/exemplo-webhook"

# Número de WhatsApp Comercial de Moçambique (com código 258, sem espaços nem +)
VITE_WHATSAPP_NUMBER="258865000777"
NEXT_PUBLIC_WHATSAPP_NUMBER="258865000777"

# Meta Pixel (Facebook / Instagram Ads) - Opcional
VITE_META_PIXEL_ID=""
NEXT_PUBLIC_META_PIXEL_ID=""

# Google Analytics 4 (GA4 ID) - Opcional
VITE_GA4_ID=""
NEXT_PUBLIC_GA4_ID=""
```

---

## 🚀 3. Como Correr Localmente e Fazer Deploy

### Execução Local:
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Abra no navegador em `http://localhost:3000` (ou a porta indicada no terminal).

### Deploy na Vercel:
1. Envie o repositório para o GitHub ou GitLab.
2. Na Vercel, clique em **Add New Project** e selecione o repositório.
3. Se utilizar **Vite (SPA)**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Se migrar para **Next.js (App Router)**:
   - Framework Preset: `Next.js`
   - Os ficheiros em `src/components/*` podem ser importados diretamente em `app/page.tsx`.
5. Adicione as variáveis de ambiente em **Settings > Environment Variables** na Vercel:
   - `NEXT_PUBLIC_WEBHOOK_URL` ou `VITE_WEBHOOK_URL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` ou `VITE_WHATSAPP_NUMBER`

---

## 📋 4. Lista do que o Cliente Tem de Fornecer

Para a entrega final definitiva ao cliente Dolce Vita_Real Estate, solicite os seguintes itens:

1. **Número Oficial do WhatsApp:**
   - Confirmar se `+258 86 500 0777` é o telemóvel comercial definitivo da equipa de vendas ou se há um número específico de atendimento de plantão.
2. **Fotografias e Vídeo com Drone em Alta Resolução:**
   - 3 a 5 fotos reais em dias de céu limpo com o drone a sobrevoar a entrada, a via de acesso e os piquetes com marcos demarcatórios.
   - 1 vídeo curto (30 a 60 segundos) no formato 9:16 ou 16:9 mostrando o acesso a partir da Estrada Circular de Marracuene.
3. **Tabela Oficial de Preços e Lotes:**
   - Tabela em Excel com o número dos lotes, áreas em m², preços atualizados e estado atual (livres, reservados, vendidos) para atualizar o ficheiro `/data/lotes.json`.
4. **Coordenadas GPS Exatas:**
   - Ponto de GPS (latitude e longitude) para centralizar a localização do mapa e gerar a rota direta no Google Maps e Waze.
5. **Dados Bancários Oficiais:**
   - Nomes das contas bancárias corporativas (Millennium BIM, BCI, Standard Bank, Moza) e NUIT da empresa para emissão da fatura pró-forma da reserva.
6. **IDs de Rastreamento (se houver campanhas ativas):**
   - ID do Meta Pixel e código do Google Analytics (GA4) para monitorar o Custo por Lead (CPL) dos anúncios do Instagram.
