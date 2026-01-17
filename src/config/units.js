// Unit system definitions and conversion utilities

export const UNIT_SYSTEMS = {
  metric: {
    id: 'metric',
    name: 'Metric',
    distance: 'km',
    distancePlural: 'km',
    volume: 'L',
    volumePlural: 'liters',
    weight: 'kg',
    weightPlural: 'kg'
  },
  imperial: {
    id: 'imperial',
    name: 'Imperial',
    distance: 'mi',
    distancePlural: 'miles',
    volume: 'gal',
    volumePlural: 'gallons',
    weight: 'lb',
    weightPlural: 'lbs'
  }
};

// Conversion factors (multiply metric by factor to get imperial)
export const CONVERSIONS = {
  km_to_miles: 0.621371,
  miles_to_km: 1.60934,
  liters_to_gallons: 0.264172,
  gallons_to_liters: 3.78541,
  kg_to_lbs: 2.20462,
  lbs_to_kg: 0.453592
};

// Unit type mapping - maps activity units to their category
export const UNIT_TYPES = {
  // Distance units
  km: 'distance',
  mi: 'distance',
  miles: 'distance',

  // Volume units
  liter: 'volume',
  liters: 'volume',
  L: 'volume',
  gallon: 'volume',
  gallons: 'volume',
  gal: 'volume',

  // Weight units (for display, not conversion)
  kg: 'weight',
  lbs: 'weight',
  g: 'weight',

  // Non-convertible units (same in both systems)
  hour: 'time',
  hours: 'time',
  minute: 'time',
  minutes: 'time',
  day: 'time',
  days: 'time',
  cup: 'food',
  cups: 'food',
  meal: 'food',
  meals: 'food',
  burger: 'food',
  burgers: 'food',
  egg: 'food',
  eggs: 'food',
  slice: 'food',
  slices: 'food',
  glass: 'food',
  glasses: 'food',
  serving: 'food',
  servings: 'food',
  '100g': 'food',
  cycle: 'appliance',
  cycles: 'appliance',
  floor: 'building',
  floors: 'building',
  bath: 'other',
  baths: 'other'
};

// Convert a value from metric to the target unit system
export const convertValue = (value, unit, targetSystem) => {
  if (targetSystem === 'metric') return value;

  const unitType = UNIT_TYPES[unit];

  if (unitType === 'distance') {
    return value * CONVERSIONS.km_to_miles;
  }
  if (unitType === 'volume') {
    return value * CONVERSIONS.liters_to_gallons;
  }

  // Non-convertible units return as-is
  return value;
};

// Convert a value from imperial to metric (for calculations)
export const convertToMetric = (value, unit, sourceSystem) => {
  if (sourceSystem === 'metric') return value;

  const unitType = UNIT_TYPES[unit];

  if (unitType === 'distance') {
    return value * CONVERSIONS.miles_to_km;
  }
  if (unitType === 'volume') {
    return value * CONVERSIONS.gallons_to_liters;
  }

  return value;
};

// Get the display unit for a given unit in the target system
export const getDisplayUnit = (unit, unitSystem) => {
  if (unitSystem === 'metric') return unit;

  const unitType = UNIT_TYPES[unit];

  if (unitType === 'distance') {
    return unit === 'km' ? 'mi' : 'miles';
  }
  if (unitType === 'volume') {
    if (unit === 'liter' || unit === 'L') return 'gal';
    if (unit === 'liters') return 'gallons';
    return unit;
  }

  return unit;
};

// Get plural form of display unit
export const getDisplayUnitPlural = (unit, unitSystem) => {
  if (unitSystem === 'metric') return unit;

  const unitType = UNIT_TYPES[unit];

  if (unitType === 'distance') {
    return 'miles';
  }
  if (unitType === 'volume') {
    return 'gallons';
  }

  return unit;
};

// Check if a unit needs conversion between systems
export const isConvertibleUnit = (unit) => {
  const unitType = UNIT_TYPES[unit];
  return unitType === 'distance' || unitType === 'volume';
};

// Format a quantity with appropriate precision
export const formatQuantity = (value, decimals = 1) => {
  if (value >= 1000) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
  if (value >= 100) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
  if (value >= 10) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 1 });
  }
  return value.toLocaleString(undefined, { maximumFractionDigits: decimals });
};
