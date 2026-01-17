// Country data with grid carbon intensity and regional settings
// Grid intensity sources: IEA 2023, Our World in Data
// Yearly average sources: Global Carbon Project 2023

export const COUNTRIES = {
  global: {
    code: 'global',
    name: 'Global Average',
    flag: '🌍',
    gridIntensity: 475, // g CO₂/kWh - world average
    defaultUnitSystem: 'metric',
    yearlyAverageKg: 6600, // 6.6 tonnes per capita
    source: 'IEA World Average 2023'
  },
  us: {
    code: 'us',
    name: 'United States',
    flag: '🇺🇸',
    gridIntensity: 380,
    defaultUnitSystem: 'imperial',
    yearlyAverageKg: 14700, // 14.7 tonnes per capita
    source: 'EIA 2023'
  },
  gb: {
    code: 'gb',
    name: 'United Kingdom',
    flag: '🇬🇧',
    gridIntensity: 230,
    defaultUnitSystem: 'metric',
    yearlyAverageKg: 5500,
    source: 'UK DEFRA 2023'
  },
  de: {
    code: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    gridIntensity: 350,
    defaultUnitSystem: 'metric',
    yearlyAverageKg: 8100,
    source: 'UBA Germany 2023'
  },
  fr: {
    code: 'fr',
    name: 'France',
    flag: '🇫🇷',
    gridIntensity: 60, // Nuclear-heavy grid
    defaultUnitSystem: 'metric',
    yearlyAverageKg: 4500,
    source: 'RTE France 2023'
  },
  au: {
    code: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    gridIntensity: 540,
    defaultUnitSystem: 'metric',
    yearlyAverageKg: 15000,
    source: 'Australian Government 2023'
  },
  in: {
    code: 'in',
    name: 'India',
    flag: '🇮🇳',
    gridIntensity: 630,
    defaultUnitSystem: 'metric',
    yearlyAverageKg: 1900,
    source: 'CEA India 2023'
  },
  cn: {
    code: 'cn',
    name: 'China',
    flag: '🇨🇳',
    gridIntensity: 530,
    defaultUnitSystem: 'metric',
    yearlyAverageKg: 7700,
    source: 'China Electricity Council 2023'
  },
  jp: {
    code: 'jp',
    name: 'Japan',
    flag: '🇯🇵',
    gridIntensity: 450,
    defaultUnitSystem: 'metric',
    yearlyAverageKg: 8500,
    source: 'METI Japan 2023'
  },
  ca: {
    code: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    gridIntensity: 130, // Hydro-heavy grid
    defaultUnitSystem: 'metric',
    yearlyAverageKg: 14200,
    source: 'Environment Canada 2023'
  }
};

// Reference grid intensity used for base CO₂ calculations in activities.js
// All electricity-based activities use this as the baseline
export const REFERENCE_GRID_INTENSITY = 475; // g CO₂/kWh (global average)

// Get country by code
export const getCountry = (code) => COUNTRIES[code] || COUNTRIES.global;

// Get all countries as array (sorted by name, global first)
export const getCountriesArray = () => {
  const countries = Object.values(COUNTRIES);
  return [
    countries.find(c => c.code === 'global'),
    ...countries.filter(c => c.code !== 'global').sort((a, b) => a.name.localeCompare(b.name))
  ];
};

// Calculate grid factor multiplier for a country
// Returns a multiplier to apply to grid-dependent CO₂ values
export const getGridFactor = (countryCode) => {
  const country = getCountry(countryCode);
  return country.gridIntensity / REFERENCE_GRID_INTENSITY;
};
