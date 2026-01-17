import { useState } from 'react';
import { Settings as SettingsIcon, ChevronDown, Globe, Ruler } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreferences } from '../context/PreferencesContext';
import { getCountriesArray } from '../config/countries';
import { UNIT_SYSTEMS } from '../config/units';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { country, unitSystem, setCountry, setUnitSystem } = usePreferences();
  const countries = getCountriesArray();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/90 hover:text-white"
        aria-label="Settings"
      >
        <SettingsIcon className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">{country.flag} {country.name}</span>
        <span className="text-sm font-medium sm:hidden">{country.flag}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  Region
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Affects grid carbon intensity for electricity-based activities
                </p>
                <select
                  value={country.code}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-2 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name} ({c.gridIntensity}g/kWh)
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-emerald-600" />
                  Units
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Distance and volume measurements
                </p>
                <div className="mt-2 flex gap-2">
                  {Object.values(UNIT_SYSTEMS).map((sys) => (
                    <button
                      key={sys.id}
                      onClick={() => setUnitSystem(sys.id)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        unitSystem === sys.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {sys.name}
                      <span className="block text-xs opacity-75">
                        {sys.id === 'metric' ? 'km, L' : 'mi, gal'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  <span className="font-medium">{country.name}</span> avg: {(country.yearlyAverageKg / 1000).toFixed(1)}t CO₂/year per capita
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
