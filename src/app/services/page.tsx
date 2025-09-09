'use client';

import { ServiceCard } from "@/components/ui/service-card";

const services = [
  {
    title: 'Serwis A',
    description: 'Podstawowa konserwacja Mercedes-Benz obejmująca wymianę oleju, filtrów i kompleksowy przegląd pojazdu.',
  },
  {
    title: 'Serwis B',
    description: 'Kompleksowy serwis Mercedes-Benz obejmujący wszystko z Serwisu A plus przegląd hamulców i dodatkowe kontrole.',
  },
  {
    title: 'Diagnostyka Zaawansowana',
    description: 'Najnowocześniejszy system diagnostyczny Mercedes-Benz STAR do precyzyjnego wykrywania i naprawy usterek.',
  },
  {
    title: 'Serwis Hamulców',
    description: 'Kompleksowy serwis układu hamulcowego, wymiana klocków, tarcz, płynu hamulcowego i przegląd bezpieczeństwa.',
  },
  {
    title: 'Naprawa Silników',
    description: 'Ekspercka diagnostyka i naprawa silników wszystkich modeli Mercedes-Benz z wykorzystaniem oryginalnych części OEM.',
  },
  {
    title: 'Serwis Skrzyni Biegów',
    description: 'Profesjonalna konserwacja i naprawa skrzyń manualnych i automatycznych Mercedes-Benz.',
  },
  {
    title: 'Układy Elektryczne',
    description: 'Diagnostyka i naprawa złożonych układów elektrycznych, komputerów pokładowych i systemów wspomagania kierowcy.',
  },
  {
    title: 'Tuning Wydajności',
    description: 'Autoryzowane modyfikacje wydajnościowe i usprawnienia AMG dla Twojego pojazdu Mercedes-Benz.',
  },
];

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Serwis Mercedes-Benz na Najwyższym Poziomie
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Certyfikowani technicy Mercedes-Benz świadczący usługi zgodne ze standardami OEM, 
            z wykorzystaniem oryginalnych części i najnowocześniejszego sprzętu diagnostycznego. 
            Twoja satysfakcja i wydajność pojazdu to nasz priorytet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {services.map((service, idx) => (
            <div key={idx} className="flex justify-center">
              <ServiceCard 
                {...service} 
                onBook={() => {
                  // TODO: Integrate with booking system
                  alert(`Rezerwacja ${service.title} - Integracja wkrótce!`);
                }}
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Dlaczego Wybrać Nasz Serwis Mercedes-Benz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Certyfikowani Technicy</h3>
              <p className="text-gray-600">Specjaliści z certyfikatem Mercedes-Benz z ciągłym szkoleniem fabrycznym</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Oryginalne Części OEM</h3>
              <p className="text-gray-600">Tylko autentyczne części Mercedes-Benz dla zachowania gwarancji i wydajności</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Zaawansowana Diagnostyka</h3>
              <p className="text-gray-600">System diagnostyczny Mercedes-Benz STAR do precyzyjnej identyfikacji problemów</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}