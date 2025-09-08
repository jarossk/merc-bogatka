export type Locale = 'pl' | 'en' | 'de'

export const defaultLocale: Locale = 'pl'

export const locales: Locale[] = ['pl', 'en', 'de']

export const localeNames: Record<Locale, string> = {
  pl: 'Polski',
  en: 'English', 
  de: 'Deutsch'
}

export interface Translations {
  common: {
    loading: string
    error: string
    save: string
    cancel: string
    delete: string
    edit: string
    add: string
  }
  home: {
    title: string
    subtitle: string
    bookingManagement: {
      title: string
      description: string
      features: string[]
    }
    jobCards: {
      title: string
      description: string
      features: string[]
    }
    oemIntegration: {
      title: string
      description: string
      features: string[]
    }
    footer: {
      title: string
      description: string
    }
  }
}

export const translations: Record<Locale, Translations> = {
  pl: {
    common: {
      loading: 'Ładowanie...',
      error: 'Błąd',
      save: 'Zapisz',
      cancel: 'Anuluj',
      delete: 'Usuń',
      edit: 'Edytuj',
      add: 'Dodaj'
    },
    home: {
      title: 'Merc Auto Bogatka',
      subtitle: 'System zarządzania warsztatem dla autoryzowanych serwisów Mercedes-Benz',
      bookingManagement: {
        title: 'Zarządzanie Rezerwacjami',
        description: 'Kompleksowy system obsługi rezerwacji serwisowych',
        features: [
          'Kalendarz rezerwacji online',
          'Automatyczne przypomnienia',
          'Historia obsługi pojazdu'
        ]
      },
      jobCards: {
        title: 'Karty Pracy',
        description: 'Digitalne zarządzanie procesami serwisowymi',
        features: [
          'Listy kontrolne Mercedes-Benz',
          'Śledzenie postępów w czasie rzeczywistym',
          'Przypisanie techników'
        ]
      },
      oemIntegration: {
        title: 'Integracja OEM',
        description: 'Oficjalne API Mercedes-Benz Developer',
        features: [
          'Dekodowanie VIN',
          'Specyfikacje pojazdów',
          'Zgodność z standardami MB'
        ]
      },
      footer: {
        title: 'Profesjonalny system dla warsztatów Mercedes-Benz',
        description: 'Merc Auto Bogatka to nowoczesny system zarządzania warsztatem, zaprojektowany specjalnie dla autoryzowanych serwisów Mercedes-Benz. Oferuje kompletne rozwiązanie obejmujące rezerwacje, karty pracy, listy kontrolne oraz integrację z oficjalnymi API Mercedes-Benz.'
      }
    }
  },
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add'
    },
    home: {
      title: 'Merc Auto Bogatka',
      subtitle: 'Workshop Management System for Mercedes-Benz Service Centers',
      bookingManagement: {
        title: 'Booking Management',
        description: 'Comprehensive service booking system',
        features: [
          'Online booking calendar',
          'Automatic reminders',
          'Vehicle service history'
        ]
      },
      jobCards: {
        title: 'Job Cards',
        description: 'Digital service process management',
        features: [
          'Mercedes-Benz checklists',
          'Real-time progress tracking',
          'Technician assignment'
        ]
      },
      oemIntegration: {
        title: 'OEM Integration',
        description: 'Official Mercedes-Benz Developer API',
        features: [
          'VIN decoding',
          'Vehicle specifications',
          'MB standards compliance'
        ]
      },
      footer: {
        title: 'Professional system for Mercedes-Benz workshops',
        description: 'Merc Auto Bogatka is a modern workshop management system designed specifically for authorized Mercedes-Benz service centers. It offers a complete solution including bookings, job cards, checklists and integration with official Mercedes-Benz APIs.'
      }
    }
  },
  de: {
    common: {
      loading: 'Laden...',
      error: 'Fehler',
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      add: 'Hinzufügen'
    },
    home: {
      title: 'Merc Auto Bogatka',
      subtitle: 'Werkstatt-Managementsystem für Mercedes-Benz Servicezentren',
      bookingManagement: {
        title: 'Terminverwaltung',
        description: 'Umfassendes Service-Buchungssystem',
        features: [
          'Online-Buchungskalender',
          'Automatische Erinnerungen',
          'Fahrzeug-Servicehistorie'
        ]
      },
      jobCards: {
        title: 'Auftragskarten',
        description: 'Digitales Service-Prozessmanagement',
        features: [
          'Mercedes-Benz Checklisten',
          'Echtzeit-Fortschrittsverfolgung',
          'Technikerzuweisung'
        ]
      },
      oemIntegration: {
        title: 'OEM-Integration',
        description: 'Offizielle Mercedes-Benz Developer API',
        features: [
          'VIN-Dekodierung',
          'Fahrzeugspezifikationen',
          'MB-Standards-Konformität'
        ]
      },
      footer: {
        title: 'Professionelles System für Mercedes-Benz Werkstätten',
        description: 'Merc Auto Bogatka ist ein modernes Werkstatt-Managementsystem, das speziell für autorisierte Mercedes-Benz Servicezentren entwickelt wurde. Es bietet eine komplette Lösung mit Terminbuchungen, Auftragskarten, Checklisten und Integration mit offiziellen Mercedes-Benz APIs.'
      }
    }
  }
}

export function getTranslations(locale: Locale = defaultLocale): Translations {
  return translations[locale] || translations[defaultLocale]
}