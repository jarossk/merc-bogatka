'use client';

import { PartCard } from "@/components/ui/part-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const parts = [
  {
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=200&q=80',
    name: 'Filtr Powietrza',
    price: '119 zł',
    description: 'Oryginalny filtr powietrza Mercedes-Benz zapewniający optymalną wydajność silnika i oszczędność paliwa.',
  },
  {
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
    name: 'Klocki Hamulcowe',
    price: '359 zł',
    description: 'Oryginalne klocki hamulcowe OEM zaprojektowane specjalnie dla pojazdów Mercedes-Benz. Doskonała siła hamowania i trwałość.',
  },
  {
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=200&q=80',
    name: 'Filtr Oleju',
    price: '79 zł',
    description: 'Wysokiej jakości filtr oleju zaprojektowany zgodnie ze specyfikacjami Mercedes-Benz dla ochrony silnika.',
  },
  {
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    name: 'Świece Zapłonowe',
    price: '199 zł',
    description: 'Zestaw 4 oryginalnych świec zapłonowych Mercedes-Benz zapewniających płynną pracę silnika i optymalną oszczędność paliwa.',
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=200&q=80',
    name: 'Wycieraczki',
    price: '139 zł',
    description: 'Wysokiej jakości pióra wycieraczek zaprojektowane do idealnego dopasowania na szybach Mercedes-Benz.',
  },
  {
    image: 'https://images.unsplash.com/photo-1607620854577-c94b801e5c3d?auto=format&fit=crop&w=200&q=80',
    name: 'Filtr Kabinowy',
    price: '99 zł',
    description: 'Filtr powietrza kabinowego HEPA zapewniający czyste powietrze w kabinie i ochronę przed alergenami.',
  },
  {
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=200&q=80',
    name: 'Płyn do Skrzyni Biegów',
    price: '159 zł',
    description: 'Zatwierdzone przez Mercedes-Benz automatyczne płyny do skrzyni biegów zapewniające płynne zmiany biegów.',
  },
  {
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=200&q=80',
    name: 'Akumulator',
    price: '639 zł',
    description: 'Wysokowydajny akumulator zaprojektowany dla systemów elektrycznych Mercedes-Benz i technologii start-stop.',
  },
];

export default function PartsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sklep z Oryginalnymi Częściami Mercedes-Benz
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Autentyczne części i akcesoria OEM do Twojego Mercedes-Benz. 
            Każda część jest zaprojektowana zgodnie z dokładnymi specyfikacjami fabrycznymi z pokryciem gwarancyjnym.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Input
              type="text"
              placeholder="Szukaj części po nazwie lub numerze części..."
              className="w-full sm:w-64 h-12"
            />
            <select className="w-full sm:w-48 h-12 rounded-md border border-gray-300 px-3">
              <option value="">Wszystkie Modele</option>
              <option value="c-class">Klasa C</option>
              <option value="e-class">Klasa E</option>
              <option value="s-class">Klasa S</option>
              <option value="glc">GLC</option>
              <option value="gle">GLE</option>
              <option value="amg">Modele AMG</option>
            </select>
            <select className="w-full sm:w-52 h-12 rounded-md border border-gray-300 px-3 pr-8">
              <option value="">Wszystkie Kategorie</option>
              <option value="engine">Silnik</option>
              <option value="brakes">Hamulce</option>
              <option value="filters">Filtry</option>
              <option value="electrical">Elektryka</option>
              <option value="maintenance">Konserwacja</option>
            </select>
            <Button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 h-12 px-8">
              Szukaj
            </Button>
          </div>
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {parts.map((part, idx) => (
            <div key={idx} className="flex justify-center">
              <PartCard 
                {...part} 
                onAddToCart={() => {
                  // TODO: Integrate with shopping cart system
                  alert(`Dodano ${part.name} do koszyka - Integracja e-commerce wkrótce!`);
                }}
              />
            </div>
          ))}
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Dlaczego Wybrać Oryginalne Części Mercedes-Benz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Jakość OEM</h3>
              <p className="text-gray-600">Wyprodukowane zgodnie z dokładnymi specyfikacjami i standardami jakości Mercedes-Benz</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ochrona Gwarancyjna</h3>
              <p className="text-gray-600">Pełne pokrycie gwarancyjne i ochrona systemów Twojego pojazdu</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Szybka Dostawa</h3>
              <p className="text-gray-600">Szybka dostawa i usługi montażu dostępne dla wszystkich części</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Nie możesz znaleźć potrzebnej części? Nasi specjaliści mogą pomóc w zlokalizowaniu każdego komponentu Mercedes-Benz.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Skontaktuj się z Działem Części
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}