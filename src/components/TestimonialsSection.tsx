import React from 'react';
import { Card, CardContent } from '@/components/ui';

const testimonials = [
  {
    quote: 'Zespół w Merc Auto Bogatka to prawdziwi profesjonaliści. Mój samochód nigdy nie jeździł lepiej!',
    name: 'Anna S.',
  },
  {
    quote: 'Szybko, przyjaźnie i z wiedzą. Gorąco polecam każdemu właścicielowi Mercedesa.',
    name: 'Jakub K.',
  },
  {
    quote: 'Oryginalne części i eksperci serwis. Ufam im wszystkie moje potrzeby konserwacyjne.',
    name: 'Maria L.',
  },
];

const achievementBadges = [
  'https://www.orlymotoryzacji.pl/images/projectImages/laureate_medal_2018.png',
  'https://www.orlymotoryzacji.pl/images/projectImages/gold_medal_2020.png',
  'https://www.orlymotoryzacji.pl/images/projectImages/laureate_medal_2020.png',
  'https://www.orlymotoryzacji.pl/images/projectImages/gold_medal_2021.png',
  'https://www.orlymotoryzacji.pl/images/projectImages/gold_medal_2021.png',
  'https://www.orlymotoryzacji.pl/images/projectImages/gold_medal_2022.png',
  'https://www.orlymotoryzacji.pl/images/projectImages/laureate_medal_2022.png',
  'https://www.orlymotoryzacji.pl/images/projectImages/silver_medal_2024.png',
  'https://www.orlymotoryzacji.pl/images/projectImages/laureate_medal_2024.png',
];

const TestimonialsSection: React.FC = () => (
  <>
    <style>
      {`
        @keyframes scroll-left-to-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}
    </style>
    <section className="py-12 bg-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
          Co mówią nasi klienci
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-12">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="flex-1 max-w-md mx-auto">
              <CardContent className="p-6">
                <p className="text-lg italic text-foreground mb-4">"{t.quote}"</p>
                <div className="text-right text-primary font-semibold">- {t.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16">
          <h3 className="text-xl md:text-2xl font-bold text-primary mb-8 text-center">
            Nasze osiągnięcia i nagrody
          </h3>
          <div className="relative overflow-hidden">
            <div 
              className="flex"
              style={{
                animation: 'scroll-left-to-right 25s linear infinite',
                width: 'max-content'
              }}
            >
              {achievementBadges.map((badge, idx) => (
                <div key={`first-${idx}`} className="flex-shrink-0 mx-4">
                  <img 
                    src={badge} 
                    alt={`Odznaka osiągnięć ${idx + 1}`}
                    className="h-16 w-auto object-contain hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  />
                </div>
              ))}
              {achievementBadges.map((badge, idx) => (
                <div key={`second-${idx}`} className="flex-shrink-0 mx-4">
                  <img 
                    src={badge} 
                    alt={`Odznaka osiągnięć ${idx + 1}`}
                    className="h-16 w-auto object-contain hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Nagrody i odznaki z{' '}
              <a 
                href="https://www.orlymotoryzacji.pl/profile-888245-autobogatka" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline transition-colors duration-200"
              >
                Orły Motoryzacji
              </a>
              {' '}plebiscytu
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default TestimonialsSection;