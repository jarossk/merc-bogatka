import React from 'react';

const Header: React.FC = () => (
  <header className="bg-background border-b border-border sticky top-0 z-50">
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" 
          alt="Mercedes-Benz Logo" 
          className="h-8 w-8"
        />
        <h1 className="text-xl font-bold text-primary">Merc Auto Bogatka</h1>
      </div>
      
      <div className="hidden md:flex space-x-6">
        <a href="/" className="text-foreground hover:text-primary transition-colors">Start</a>
        <a href="/services" className="text-foreground hover:text-primary transition-colors">Usługi</a>
        <a href="/parts" className="text-foreground hover:text-primary transition-colors">Części</a>
        <a href="/about" className="text-foreground hover:text-primary transition-colors">O nas</a>
        <a href="/contact" className="text-foreground hover:text-primary transition-colors">Kontakt</a>
      </div>

      <button className="md:hidden text-foreground">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  </header>
);

export default Header;