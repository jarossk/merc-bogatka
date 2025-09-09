'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with contact form backend
    alert('Dziękujemy za wiadomość! Wkrótce się z Tobą skontaktujemy.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Skontaktuj się z Merc Auto Bogatka
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Skontaktuj się z naszymi specjalistami Mercedes-Benz. Jesteśmy tutaj, aby pomóc we wszystkich 
            potrzebach serwisowych, zapytaniach o części i pytaniach technicznych.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Skontaktuj się z nami</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Adres</h3>
                    <p className="text-gray-600">
                      Bogatka 18<br/>
                      Bogatka<br/>
                      Poland
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Telefon</h3>
                    <p className="text-gray-600">
                      Główny: <a href="tel:+48508874122" className="text-blue-600 hover:underline">+48 508 874 122</a><br/>
                      Serwis: <a href="tel:+48508874122" className="text-blue-600 hover:underline">+48 508 874 122</a><br/>
                      Pomoc: <a href="tel:+48508874122" className="text-blue-600 hover:underline">+48 508 874 122</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">E-mail</h3>
                    <p className="text-gray-600">
                      Główny: <a href="mailto:bogdan746@wp.pl" className="text-blue-600 hover:underline">bogdan746@wp.pl</a><br/>
                      Serwis: <a href="mailto:bogdan746@wp.pl" className="text-blue-600 hover:underline">bogdan746@wp.pl</a><br/>
                      Części: <a href="mailto:bogdan746@wp.pl" className="text-blue-600 hover:underline">bogdan746@wp.pl</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <span className="text-xl">🕒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Godziny Otwarcia</h3>
                    <p className="text-gray-600">
                      Poniedziałek - Piątek: 7:00 - 18:00<br/>
                      Sobota: 8:00 - 14:00<br/>
                      Niedziela: Nieczynne<br/>
                      <span className="text-red-600 font-medium">Serwis awaryjny dostępny 24/7</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Lokalizacja</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  {/* Placeholder for Google Maps integration */}
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">🗺️</span>
                    <p>Interaktywna Mapa</p>
                    <p className="text-sm">(Integracja z Google Maps wkrótce)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Wyślij nam Wiadomość</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Imię i Nazwisko *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Twoje imię i nazwisko"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Numer Telefonu
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+48 123 456 789"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adres E-mail *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="twoj.email@przykład.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Temat *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Jak możemy Ci pomóc?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Wiadomość *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Opowiedz nam o swoim modelu Mercedes-Benz, roczniku i potrzebnym serwisie..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3"
                >
                  Wyślij Wiadomość
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  * Pola wymagane. Zazwyczaj odpowiadamy w ciągu 2-4 godzin roboczych.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Obszary Obsługi i Pomoc Awaryjna</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Obszary Obsługi</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Dzielnica Stuttgart i okolice</li>
                    <li>• Mobilne usługi diagnostyczne</li>
                    <li>• Organizacja holowania przy większych naprawach</li>
                    <li>• Usługa odbioru i dostawy</li>
                    <li>• Kontrakty serwisowe dla flot</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Usługi Awaryjne</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Pomoc drogowa 24/7</li>
                    <li>• Odładowanie akumulatora i wymiana</li>
                    <li>• Awaryjne otwieranie pojazdu</li>
                    <li>• Naprawa i wymiana opon</li>
                    <li>• Awaryjna diagnostyka</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}