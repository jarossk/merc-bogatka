"use client";

import { PartCard } from "@/components/ui/part-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const parts = [
  {
    image: "/air-filter.png",
    name: "Filtr Powietrza",
    price: "119 zł",
    description:
      "Oryginalny filtr powietrza Mercedes-Benz zapewniający optymalną wydajność silnika i oszczędność paliwa.",
  },
  {
    image: "/break_pads.png",
    name: "Klocki Hamulcowe",
    price: "179 zł",
    description:
      "Oryginalne klocki hamulcowe OEM zaprojektowane specjalnie dla pojazdów Mercedes-Benz. Doskonała siła hamowania i trwałość.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=200&q=80",
    name: "Skrzynie Biegów",
    price: "500 zł",
    description:
      "Wysokiej jakości olej do skrzyni biegów Mercedes-Benz zapewniający płynną pracę i ochronę przed zużyciem.",
  },
  {
    image: "/Fuel-Injectors.png",
    name: "Wtryskiwacze Paliwa",
    price: "310 zł",
    description:
      "Zestaw 4 oryginalnych wtryskiwaczy paliwa Mercedes-Benz zapewniających płynną pracę silnika i optymalną oszczędność paliwa.",
  },
  {
    image: "/Fuel-Pumps.png",
    name: "Pompy Paliwa",
    price: "250 zł",
    description:
      "Wysokiej jakości pompy paliwa zaprojektowane do idealnego dopasowania w pojazdach Mercedes-Benz.",
  },
  {
    image: "/ECUs.png",
    name: "Komputery Pokładowe",
    price: "680 zł",
    description:
      "Wysokiej jakości komputery pokładowe Mercedes-Benz zapewniające optymalną wydajność i diagnostykę pojazdu.",
  },
  {
    image: "/oil_submission.png",
    name: "Płyn i Oleje",
    price: "129 zł",
    description:
      "Zatwierdzone przez Mercedes-Benz automatyczne płyny do skrzyni biegów zapewniające płynne zmiany biegów.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=200&q=80",
    name: "Akumulatory",
    price: "300 zł",
    description:
      "Wysokowydajny akumulator zaprojektowany dla systemów elektrycznych Mercedes-Benz i technologii start-stop.",
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
            Autentyczne części i akcesoria OEM do Twojego Mercedes-Benz. Każda
            część jest zaprojektowana zgodnie z dokładnymi specyfikacjami
            fabrycznymi z pokryciem gwarancyjnym.
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
                  alert(
                    `Dodano ${part.name} do koszyka - Integracja e-commerce wkrótce!`
                  );
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
              <p className="text-gray-600">
                Wyprodukowane zgodnie z dokładnymi specyfikacjami i standardami
                jakości Mercedes-Benz
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Ochrona Gwarancyjna
              </h3>
              <p className="text-gray-600">
                Pełne pokrycie gwarancyjne i ochrona systemów Twojego pojazdu
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Szybka Dostawa</h3>
              <p className="text-gray-600">
                Szybka dostawa i usługi montażu dostępne dla wszystkich części
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Nie możesz znaleźć potrzebnej części? Nasi specjaliści mogą pomóc
              w zlokalizowaniu każdego komponentu Mercedes-Benz.
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
