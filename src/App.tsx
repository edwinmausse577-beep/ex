/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustIndicators from './components/TrustIndicators';
import AboutCondo from './components/AboutCondo';
import LotsGrid from './components/LotsGrid';
import LocationSection from './components/LocationSection';
import HowToBuy from './components/HowToBuy';
import FAQSection from './components/FAQSection';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import MobileStickyCTA from './components/MobileStickyCTA';

export default function App() {
  const [selectedLoteForForm, setSelectedLoteForForm] = useState<string>('');

  const handleSelectLote = (loteTitle: string) => {
    setSelectedLoteForForm(loteTitle);
    const formElement = document.getElementById('formulario');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col font-sans pb-16 md:pb-0">
      {/* 1. Header / Navbar following Top Bar Contract */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Prova e Confiança (4 Fact-checked Indicators) */}
        <TrustIndicators />

        {/* 3. O Condomínio (Galeria & Estado da Obra) */}
        <AboutCondo />

        {/* 4. Lotes Disponíveis (Carregado de /data/lotes.json) */}
        <LotsGrid onSelectLoteForForm={handleSelectLote} />

        {/* 5. Localização em Marracuene */}
        <LocationSection />

        {/* 6. Como Comprar (4 Passos Transparentes) */}
        <HowToBuy />

        {/* 7. Perguntas Frequentes (Objeções Reais) */}
        <FAQSection />

        {/* 8. Formulário de Lead de Alta Conversão */}
        <LeadForm initialLoteInteresse={selectedLoteForForm} />
      </main>

      {/* 9. Rodapé & Projetos do Grupo */}
      <Footer />

      {/* Mobile Sticky CTA & Desktop Floating WhatsApp */}
      <MobileStickyCTA />
    </div>
  );
}
