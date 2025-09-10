import HeroSection from "@/components/HeroSection";
import ServiceHighlightCard from "@/components/ServiceHighlightCard";
import IntroductionSection from "@/components/IntroductionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTASection from "@/components/FinalCTASection";

const serviceHighlights = [
  {
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=200&q=80',
    title: 'Konserwacja rutynowa',
    description: 'Utrzymaj swój Mercedes-Benz w sprawności dzięki regularnym przeglądom i wymianom oleju.',
    buttonText: 'Dowiedz się więcej',
  },
  {
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
    title: 'Zaawansowana diagnostyka',
    description: 'Najnowocześniejsza diagnostyka dla dokładnych i wydajnych napraw oraz rozwiązywania problemów.',
    buttonText: 'Dowiedz się więcej',
  },
  {
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=200&q=80',
    title: 'Oryginalne części',
    description: 'Używamy wyłącznie oryginalnych części Mercedes-Benz dla jakości i niezawodności.',
    buttonText: 'Dowiedz się więcej',
  },
  {
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    title: 'Usprawnienia wydajności',
    description: 'Ulepsz swój pojazd dzięki premium usprawnieniom i akcesoriom.',
    buttonText: 'Dowiedz się więcej',
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="max-w-4xl mx-auto py-12 px-4">
        <IntroductionSection />
      </section>
      <div className="max-w-5xl mx-auto border-t border-border my-4" />
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-extrabold text-primary mb-8 text-center tracking-tight">
          Nasze usługi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {serviceHighlights.map((service, idx) => (
            <ServiceHighlightCard key={idx} {...service} />
          ))}
        </div>
      </section>
      <div className="max-w-5xl mx-auto border-t border-border my-4" />
      <section className="max-w-4xl mx-auto py-12 px-4">
        <TestimonialsSection />
      </section>
      <section className="max-w-4xl mx-auto py-12 px-4">
        <FinalCTASection />
      </section>
    </>
  );
}