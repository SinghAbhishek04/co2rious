// Equivalencies database for relatable comparisons
// All CO2 values in grams

// Conversion constants
const KM_TO_MILES = 0.621371;

export const EQUIVALENCIES = {
  driving: {
    id: 'driving',
    name: 'Driving',
    co2_per_unit: 160, // g CO2 per km (DEFRA 2023)
    unit: 'km',
    unit_plural: 'km',
    imperial_unit: 'mi',
    imperial_unit_plural: 'miles',
    icon: 'Car',
    template: 'Driving {value} {unit}',
    min_threshold: 50,
    max_threshold: 50000,
    priority: 1,
    convertible: true
  },

  phone_charges: {
    id: 'phone_charges',
    name: 'Phone charging',
    co2_per_unit: 7, // g CO2 per full charge (Apple specs + OWID grid)
    unit: 'charge',
    unit_plural: 'charges',
    icon: 'Smartphone',
    template: '{value} phone {unit}',
    min_threshold: 5,
    max_threshold: 5000,
    priority: 2
  },

  tree_hours: {
    id: 'tree_hours',
    name: 'Tree absorption',
    co2_per_unit: 2.5, // g CO2 absorbed per hour by one tree (US Forest Service)
    unit: 'tree-hour',
    unit_plural: 'tree-hours',
    icon: 'TreeDeciduous',
    template: '{value} {unit} to offset',
    min_threshold: 1,
    max_threshold: 200000,
    priority: 3
  },

  streaming_hours: {
    id: 'streaming_hours',
    name: 'Streaming video',
    co2_per_unit: 55, // g CO2 per hour
    unit: 'hour',
    unit_plural: 'hours',
    icon: 'Play',
    template: '{value} {unit} of streaming',
    min_threshold: 20,
    max_threshold: 10000,
    priority: 4
  },

  led_bulb_hours: {
    id: 'led_bulb_hours',
    name: 'LED bulb',
    co2_per_unit: 5, // g CO2 per hour (10W bulb, 500g/kWh grid)
    unit: 'hour',
    unit_plural: 'hours',
    icon: 'Lightbulb',
    template: '{value} {unit} of LED lighting',
    min_threshold: 10,
    max_threshold: 10000,
    priority: 5
  },

  google_searches: {
    id: 'google_searches',
    name: 'Google searches',
    co2_per_unit: 0.2, // g CO2 per search
    unit: 'search',
    unit_plural: 'searches',
    icon: 'Search',
    template: '{value} Google {unit}',
    min_threshold: 1,
    max_threshold: 500,
    priority: 6
  },

  flights_km: {
    id: 'flights_km',
    name: 'Flying',
    co2_per_unit: 185, // g CO2 per km (economy class, DEFRA 2023)
    unit: 'km',
    unit_plural: 'km',
    imperial_unit: 'mi',
    imperial_unit_plural: 'miles',
    icon: 'Plane',
    template: 'Flying {value} {unit}',
    min_threshold: 500,
    max_threshold: 500000,
    priority: 7,
    convertible: true
  },

  balloons: {
    id: 'balloons',
    name: 'Balloons of CO₂',
    co2_per_unit: 28, // 28g fills a standard 11" balloon (Engineering Toolbox)
    unit: 'balloon',
    unit_plural: 'balloons',
    icon: 'Circle',
    template: '{value} {unit} of CO₂',
    min_threshold: 1,
    max_threshold: 10000,
    priority: 8
  },

  showers: {
    id: 'showers',
    name: 'Hot showers',
    co2_per_unit: 1400, // 8-minute shower (175g/min × 8)
    unit: 'shower',
    unit_plural: 'showers',
    icon: 'ShowerHead',
    template: '{value} hot {unit}',
    min_threshold: 500,
    max_threshold: 50000,
    priority: 9
  },

  eggs_cooked: {
    id: 'eggs_cooked',
    name: 'Eggs',
    co2_per_unit: 234, // per egg (Poore & Nemecek)
    unit: 'egg',
    unit_plural: 'eggs',
    icon: 'Egg',
    template: '{value} {unit}',
    min_threshold: 100,
    max_threshold: 20000,
    priority: 10
  },

  train_km: {
    id: 'train_km',
    name: 'Train travel',
    co2_per_unit: 35.5, // g CO2 per km (intercity train)
    unit: 'km',
    unit_plural: 'km',
    imperial_unit: 'mi',
    imperial_unit_plural: 'miles',
    icon: 'TrainFront',
    template: '{value} {unit} by train',
    min_threshold: 100,
    max_threshold: 100000,
    priority: 11,
    convertible: true
  }
};

/**
 * Generate appropriate equivalencies for a given CO2 amount
 * @param {number} co2_grams - Amount of CO2 in grams
 * @param {number} count - Number of equivalencies to return (default 4)
 * @param {string} unitSystem - 'metric' or 'imperial' (default 'metric')
 * @returns {Array} Array of equivalency objects with calculated values
 */
export const generateEquivalents = (co2_grams, count = 4, unitSystem = 'metric') => {
  const results = [];

  Object.values(EQUIVALENCIES).forEach(equiv => {
    // Check if this equivalency is appropriate for the scale
    if (co2_grams < equiv.min_threshold || co2_grams > equiv.max_threshold) {
      return;
    }

    let rawValue = co2_grams / equiv.co2_per_unit;

    // Convert to imperial if needed for convertible units
    if (unitSystem === 'imperial' && equiv.convertible) {
      rawValue = rawValue * KM_TO_MILES;
    }

    // Format the value nicely
    let displayValue;
    if (rawValue >= 100) {
      displayValue = Math.round(rawValue).toLocaleString();
    } else if (rawValue >= 10) {
      displayValue = Math.round(rawValue).toString();
    } else if (rawValue >= 1) {
      displayValue = rawValue.toFixed(1).replace(/\.0$/, '');
    } else {
      displayValue = rawValue.toFixed(2).replace(/\.?0+$/, '');
    }

    // Determine singular or plural with unit system support
    let unit;
    if (unitSystem === 'imperial' && equiv.convertible) {
      unit = rawValue === 1 ? equiv.imperial_unit : equiv.imperial_unit_plural;
    } else {
      unit = rawValue === 1 ? equiv.unit : equiv.unit_plural;
    }

    results.push({
      ...equiv,
      rawValue,
      displayValue,
      displayUnit: unit,
      text: equiv.template
        .replace('{value}', displayValue)
        .replace('{unit}', unit)
    });
  });

  // Sort by priority and return top N
  return results
    .sort((a, b) => a.priority - b.priority)
    .slice(0, count);
};

/**
 * Format CO2 value for display
 * @param {number} grams - CO2 in grams
 * @returns {object} Formatted value and unit
 */
export const formatCO2 = (grams) => {
  if (grams >= 1000000) {
    return {
      value: (grams / 1000000).toFixed(1).replace(/\.0$/, ''),
      unit: 'tonnes',
      fullUnit: 'CO₂-eq'
    };
  } else if (grams >= 1000) {
    return {
      value: (grams / 1000).toFixed(1).replace(/\.0$/, ''),
      unit: 'kg',
      fullUnit: 'CO₂-eq'
    };
  } else {
    return {
      value: Math.round(grams).toString(),
      unit: 'g',
      fullUnit: 'CO₂-eq'
    };
  }
};
