import React from 'react';

const HeroSection: React.FC = () => (
  <div className="relative isolate overflow-hidden bg-background">
    <svg className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-border" aria-hidden="true">
      <defs>
        <pattern id="0787a7c5-978c-4f66-83c7-11c213f99cb7" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
    </svg>
    <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
        <div className="mt-24 sm:mt-32 lg:mt-16">
          <div className="inline-flex space-x-6">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm/6 font-semibold text-primary ring-1 ring-primary/10 ring-inset">
              Specjalista Mercedes-Benz
            </span>
            <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-muted-foreground">
              <span>Premium serwis i części</span>
              <svg className="size-5 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
        <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-foreground sm:text-7xl">
          Twój zaufany warsztat Mercedes-Benz
        </h1>
        <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
          Premium serwis, oryginalne części i ekspercka opieka nad Twoim Mercedesem-Benz. 
          Zarezerwuj serwis lub sprawdź nasz sklep z częściami już dziś.
        </p>
        <div className="mt-10 flex items-center gap-x-6">
          <a 
            href="/services" 
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
          >
            Zarezerwuj serwis
          </a>
          <a href="/parts" className="text-sm/6 font-semibold text-foreground hover:text-primary transition-colors">
            Sprawdź części <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <div className="-m-2 rounded-xl bg-muted/20 p-2 ring-1 ring-border lg:-m-4 lg:rounded-2xl lg:p-4">
            <img 
              src="/garage-car-front.png" 
              alt="Merc Auto Bogatka - Front warsztat Mercedes-Benz" 
              className="w-full max-w-[500px] lg:w-[500px] rounded-md shadow-2xl ring-1 ring-border opacity-60 hover:opacity-90 transition-all duration-500 ease-in-out transform hover:scale-105 hover:rotate-1" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;