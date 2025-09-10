"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const team = [
  {
    name: "Bogdan Taraszkiewicz",
    role: "Właściciel & Główny Mechanik",
    image: "/bodzio.png",
    experience: "15+ lat z certyfikatem Mercedes-Benz",
    specialization: "Diagnostyka silnika i wydajność AMG",
  },
  {
    name: "Anna Mudlaff",
    role: "Doradca Serwisowy",
    image: "/anna.png",
    experience: "8 lat w branży motoryzacyjnej",
    specialization: "Relacje z klientami i planowanie serwisu",
  },
  {
    name: "Jarosław Klata",
    role: "Specjalista IT",
    image: "/jarek.png",
    experience: "12 lat ekspertyzy w częściach OEM",
    specialization: "Oryginalne części i zarządzanie witrynami",
  },
];

const certifications = [
  "Certyfikowane Centrum Serwisowe Mercedes-Benz",
  "Certyfikacja Systemu Diagnostycznego STAR",
  "ASE Mistrz Mechanik Samochodowy",
  "Specjalista Mercedes-Benz AMG",
  "Absolwent Fabrycznego Programu Szkoleniowego",
  "Autoryzowany Dealer Części OEM",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            O Merc Auto Bogatka
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Od ponad 25 lat Auto Bogatka jest wiodącą destynacją dla serwisu,
            części i ekspertyzy Mercedes-Benz. Łączymy tradycyjne rzemiosło z
            najnowocześniejszą technologią, aby zapewnić wyjątkową opiekę nad
            Twoim pojazdem Mercedes-Benz.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Nasza Misja
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Zapewnianie właścicielom Mercedes-Benz niezrównanej doskonałości
                serwisowej, utrzymywanie najwyższych standardów rzemiosła przy
                jednoczesnym zapewnianiu spersonalizowanej uwagi każdemu
                klientowi. Jesteśmy zaangażowani w zachowanie wydajności,
                bezpieczeństwa i luksusu, które definiują doświadczenie
                Mercedes-Benz.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Nasze Wartości
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">★</span>
                  Doskonałość w każdej interakcji serwisowej
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">★</span>
                  Przejrzystość i uczciwa komunikacja
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">★</span>
                  Ciągła edukacja i innowacje
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">★</span>
                  Satysfakcja klienta ponad wszystko
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-3">★</span>
                  Oryginalne standardy Mercedes-Benz
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Poznaj Nasz Zespoł Ekspertów
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <Card
                key={idx}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover border-4 border-yellow-200"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-lg font-medium text-blue-600">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{member.experience}</p>
                    <p className="text-sm font-medium">
                      {member.specialization}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications & Credentials */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Certyfikaty i Uprawnienia
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Nasze zaangażowanie w doskonałość poparte jest wiodącymi w branży
              certyfikatami
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div className="bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Dlaczego Wybrać Auto Bogatka?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                25+ Lat Doświadczenia
              </h3>
              <p className="text-gray-600">
                Ćwierć wieku ekspertyzy Mercedes i zaufania klientów
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔬</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Zaawansowane Wyposażenie
              </h3>
              <p className="text-gray-600">
                System diagnostyczny Mercedes-Benz STAR i narzędzia klasy
                fabrycznej
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Tylko Oryginalne Części
              </h3>
              <p className="text-gray-600">
                Wyłącznie autentyczne części i płyny Mercedes-Benz OEM
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Klient na Pierwszym Miejscu
              </h3>
              <p className="text-gray-600">
                Spersonalizowana obsługa z przejrzystą komunikacją i uczciwą
                ceną
              </p>
            </div>
          </div>
        </div>

        {/* Company History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Nasza Historia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Założone w 1999 roku, Auto Bogatka rozpoczęło działalność jako
                mały niezależny warsztat z prostą misją: zapewniać właścicielom
                Mercedes-Benz serwis odpowiadający jakości ich pojazdów. Nasz
                założyciel, Mechanik Bogdan, założył warsztat po 20 latach
                doświadczenia w autoryzowanych salonach Mercedes-Benz.
              </p>
              <p className="mb-4">
                Na przestrzeni lat rozwinęliśmy się z dwustanowiskowej operacji
                do najnowocześniejszego obiektu wyposażonego w najnowszy sprzęt
                diagnostyczny Mercedes-Benz i obsługiwanego przez przeszkolonych
                fabrycznie techników. Pomimo naszego wzrostu, nigdy nie
                straciliśmy z oczu naszych podstawowych wartości: jakość
                wykonania, uczciwy serwis i szczera troska o naszych klientów.
              </p>
              <p>
                Dzisiaj Merc Auto Bogatka jest uznawane za wiodące niezależne
                centrum serwisowe Mercedes-Benz w regionie, obsługując tysiące
                zadowolonych klientów i utrzymując długoterminowe relacje
                zbudowane na zaufaniu i doskonałości.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
