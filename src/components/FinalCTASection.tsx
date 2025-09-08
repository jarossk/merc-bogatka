import React from 'react';

const FinalCTASection: React.FC = () => (
  <section className="py-12 bg-primary text-primary-foreground text-center">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Gotowy na doświadczenie najlepszego dla Twojego Mercedes-Benz?
      </h2>
      <p className="mb-8 text-lg text-primary-foreground/80">
        Skontaktuj się z nami już dziś lub sprawdź nasze usługi i części, aby rozpocząć.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/contact" 
          className="bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded shadow hover:bg-secondary/90 transition-colors"
        >
          Skontaktuj się
        </a>
        <a 
          href="/services" 
          className="bg-primary-foreground text-primary font-semibold px-6 py-3 rounded shadow hover:bg-primary-foreground/90 transition-colors"
        >
          Nasze usługi
        </a>
        <a 
          href="/parts" 
          className="bg-muted text-muted-foreground font-semibold px-6 py-3 rounded shadow hover:bg-muted/90 transition-colors"
        >
          Sklep z częściami
        </a>
      </div>
    </div>
  </section>
);

export default FinalCTASection;