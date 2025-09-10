'use client';

import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/logo_bogatka.png" 
              alt="Bogatka Logo" 
              className="h-12 w-auto"
            />
          </a>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-foreground hover:text-primary transition-colors">Start</a>
          <a href="/services" className="text-foreground hover:text-primary transition-colors">Usługi</a>
          <a href="/parts" className="text-foreground hover:text-primary transition-colors">Części</a>
          <a href="/about" className="text-foreground hover:text-primary transition-colors">O nas</a>
          <a href="/contact" className="text-foreground hover:text-primary transition-colors">Kontakt</a>
        </div>

        <button 
          className="md:hidden text-foreground z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-background z-40 md:hidden">
            <div className="flex flex-col h-full">
              {/* Header with logo */}
              <div className="flex items-center justify-center pt-24 pb-8">
                <img 
                  src="/logo_bogatka.png" 
                  alt="Bogatka Logo" 
                  className="h-16 w-auto"
                />
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 flex flex-col justify-center space-y-8 px-8">
                <a 
                  href="/" 
                  className="block text-center py-4 px-6 text-xl font-semibold text-foreground bg-gray-100 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-gray-200 hover:scale-105 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🏠 Start
                </a>
                <a 
                  href="/services" 
                  className="block text-center py-4 px-6 text-xl font-semibold text-foreground bg-gray-100 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-gray-200 hover:scale-105 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🔧 Usługi
                </a>
                <a 
                  href="/parts" 
                  className="block text-center py-4 px-6 text-xl font-semibold text-foreground bg-gray-100 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-gray-200 hover:scale-105 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ⚙️ Części
                </a>
                <a 
                  href="/about" 
                  className="block text-center py-4 px-6 text-xl font-semibold text-foreground bg-gray-100 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-gray-200 hover:scale-105 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ℹ️ O nas
                </a>
                <a 
                  href="/contact" 
                  className="block text-center py-4 px-6 text-xl font-semibold text-foreground bg-gray-100 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-gray-200 hover:scale-105 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📞 Kontakt
                </a>
              </div>
              
              {/* Footer */}
              <div className="text-center pb-8 px-8">
                <p className="text-muted-foreground text-sm">Premium serwis Mercedes-Benz</p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;