import { createContext, useContext, useState, useEffect } from 'react';
import { COUNTRIES, getCountry } from '../config/countries';
import { UNIT_SYSTEMS } from '../config/units';

const STORAGE_KEY = 'co2rious_preferences';

const defaultPreferences = {
  countryCode: 'global',
  unitSystem: 'metric'
};

const PreferencesContext = createContext(null);

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    // Load from localStorage on init
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate stored values
        if (COUNTRIES[parsed.countryCode] && UNIT_SYSTEMS[parsed.unitSystem]) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load preferences:', e);
    }
    return defaultPreferences;
  });

  // Persist to localStorage when preferences change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.warn('Failed to save preferences:', e);
    }
  }, [preferences]);

  const setCountry = (countryCode) => {
    const country = getCountry(countryCode);
    setPreferences(prev => ({
      ...prev,
      countryCode,
      // Optionally auto-switch to country's default unit system
      unitSystem: country.defaultUnitSystem
    }));
  };

  const setUnitSystem = (unitSystem) => {
    if (UNIT_SYSTEMS[unitSystem]) {
      setPreferences(prev => ({
        ...prev,
        unitSystem
      }));
    }
  };

  const country = getCountry(preferences.countryCode);
  const unitSystemConfig = UNIT_SYSTEMS[preferences.unitSystem];

  const value = {
    preferences,
    country,
    unitSystem: preferences.unitSystem,
    unitSystemConfig,
    setCountry,
    setUnitSystem
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
