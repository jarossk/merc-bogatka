import React from 'react';

const IntroductionSection: React.FC = () => (
  <section className="py-12 bg-background">
    <div className="container mx-auto px-4 text-center max-w-2xl">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
        Doświadczenie. Ekspertyza. Doskonałość.
      </h2>
      <p className="text-lg text-foreground mb-2">
        W Merc Auto Bogatka łączymy dziesięciolecia doświadczenia z pasją do precyzyjnej inżynierii. 
        Nasi certyfikowani technicy i podejście stawiające klienta na pierwszym miejscu zapewniają, 
        że Twój pojazd otrzyma opiekę, na jaką zasługuje — niezależnie od tego, czy potrzebujesz 
        rutynowej konserwacji, zaawansowanej diagnostyki czy oryginalnych części.
      </p>
      <p className="text-md text-muted-foreground">
        Twoja satysfakcja i wydajność Twojego samochodu to nasze najwyższe priorytety.
      </p>
    </div>
  </section>
);

export default IntroductionSection;