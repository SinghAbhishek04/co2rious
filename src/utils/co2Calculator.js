// CO₂ calculation utilities with country-specific grid factors

import { getGridFactor, REFERENCE_GRID_INTENSITY } from '../config/countries';
import { convertValue, convertToMetric, getDisplayUnit, isConvertibleUnit } from '../config/units';

/**
 * Calculate CO₂ emissions for an activity, adjusted for country grid intensity
 * @param {Object} activity - Activity object from activities.js
 * @param {number} quantity - User-entered quantity (in display units)
 * @param {string} countryCode - Country code for grid factor
 * @param {string} unitSystem - 'metric' or 'imperial'
 * @returns {number} CO₂ in grams
 */
export const calculateCO2 = (activity, quantity, countryCode = 'global', unitSystem = 'metric') => {
  if (!activity) return 0;

  // Convert quantity to metric if needed (for distance/volume-based activities)
  const metricQuantity = convertToMetric(quantity, activity.unit, unitSystem);

  // Base calculation
  let co2 = activity.co2_per_unit * metricQuantity;

  // Apply grid factor for electricity-dependent activities
  if (activity.gridDependent) {
    const gridFactor = getGridFactor(countryCode);
    co2 = co2 * gridFactor;
  }

  return co2;
};

/**
 * Calculate CO₂ range for an activity, adjusted for country grid intensity
 * @param {Object} activity - Activity object from activities.js
 * @param {number} quantity - User-entered quantity (in display units)
 * @param {string} countryCode - Country code for grid factor
 * @param {string} unitSystem - 'metric' or 'imperial'
 * @returns {[number, number]} CO₂ range in grams [min, max]
 */
export const calculateCO2Range = (activity, quantity, countryCode = 'global', unitSystem = 'metric') => {
  if (!activity || !activity.co2_range_per_unit) return [0, 0];

  const metricQuantity = convertToMetric(quantity, activity.unit, unitSystem);

  let min = activity.co2_range_per_unit[0] * metricQuantity;
  let max = activity.co2_range_per_unit[1] * metricQuantity;

  if (activity.gridDependent) {
    const gridFactor = getGridFactor(countryCode);
    min = min * gridFactor;
    max = max * gridFactor;
  }

  return [min, max];
};

/**
 * Get the CO₂ per unit for display, adjusted for country and unit system
 * @param {Object} activity - Activity object
 * @param {string} countryCode - Country code
 * @param {string} unitSystem - 'metric' or 'imperial'
 * @returns {{ value: number, unit: string }} CO₂ per unit with display unit
 */
export const getCO2PerUnit = (activity, countryCode = 'global', unitSystem = 'metric') => {
  if (!activity) return { value: 0, unit: '' };

  let co2PerUnit = activity.co2_per_unit;

  // Apply grid factor if needed
  if (activity.gridDependent) {
    const gridFactor = getGridFactor(countryCode);
    co2PerUnit = co2PerUnit * gridFactor;
  }

  // For convertible units (distance, volume), adjust the per-unit value
  // If showing in miles, need to show CO₂ per mile (not per km)
  if (unitSystem === 'imperial' && isConvertibleUnit(activity.unit)) {
    // Convert CO₂/km to CO₂/mile (multiply by 1.609 since 1 mile = 1.609 km)
    if (activity.unit === 'km') {
      co2PerUnit = co2PerUnit * 1.60934;
    }
    // Convert CO₂/L to CO₂/gallon
    if (activity.unit === 'liter' || activity.unit === 'liters' || activity.unit === 'L') {
      co2PerUnit = co2PerUnit * 3.78541;
    }
  }

  const displayUnit = getDisplayUnit(activity.unit, unitSystem);

  return {
    value: Math.round(co2PerUnit),
    unit: displayUnit
  };
};

/**
 * Convert activity quantity constraints for display unit system
 * @param {Object} activity - Activity object
 * @param {string} unitSystem - 'metric' or 'imperial'
 * @returns {{ min: number, max: number, step: number, default: number }}
 */
export const getQuantityConstraints = (activity, unitSystem = 'metric') => {
  if (!activity) return { min: 1, max: 100, step: 1, default: 1 };

  let { min_quantity, max_quantity, step, default_quantity } = activity;

  // Convert constraints for imperial units
  if (unitSystem === 'imperial' && isConvertibleUnit(activity.unit)) {
    min_quantity = convertValue(min_quantity, activity.unit, unitSystem);
    max_quantity = convertValue(max_quantity, activity.unit, unitSystem);
    default_quantity = convertValue(default_quantity, activity.unit, unitSystem);
    step = convertValue(step, activity.unit, unitSystem);

    // Round step to nice values
    if (step < 1) {
      step = Math.round(step * 10) / 10;
    } else {
      step = Math.round(step);
    }
  }

  return {
    min: min_quantity,
    max: max_quantity,
    step: step,
    default: default_quantity
  };
};

/**
 * Format CO₂ value for display
 * @param {number} grams - CO₂ in grams
 * @returns {{ value: string, unit: string, fullUnit: string }}
 */
export const formatCO2 = (grams) => {
  if (grams < 1000) {
    return {
      value: Math.round(grams).toLocaleString(),
      unit: 'g',
      fullUnit: 'grams CO₂'
    };
  }
  if (grams < 1000000) {
    const kg = grams / 1000;
    return {
      value: kg < 10 ? kg.toFixed(1) : Math.round(kg).toLocaleString(),
      unit: 'kg',
      fullUnit: 'kilograms CO₂'
    };
  }
  const tonnes = grams / 1000000;
  return {
    value: tonnes < 10 ? tonnes.toFixed(2) : tonnes.toFixed(1),
    unit: 't',
    fullUnit: 'tonnes CO₂'
  };
};
