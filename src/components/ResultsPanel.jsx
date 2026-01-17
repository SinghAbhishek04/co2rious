import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ExternalLink, HelpCircle } from 'lucide-react';
import { ACTIVITIES, CATEGORIES } from '../data/activities';
import { generateEquivalents, formatCO2 } from '../data/equivalencies';
import EquivalencyCard from './EquivalencyCard';
import ImpactContext from './ImpactContext';
import TimeMultiplier from './TimeMultiplier';
import ShareButton from './ShareButton';
import { usePreferences } from '../context/PreferencesContext';
import { calculateCO2, calculateCO2Range } from '../utils/co2Calculator';
import { getDisplayUnit, getDisplayUnitPlural } from '../config/units';

export default function ResultsPanel({ selectedActivity, quantity }) {
  const [showRangeTooltip, setShowRangeTooltip] = useState(false);
  const { country, unitSystem } = usePreferences();

  if (!selectedActivity) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
            <Info className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 text-lg">
            Select an activity to see its carbon footprint
          </p>
        </div>
      </div>
    );
  }

  const activity = ACTIVITIES[selectedActivity];
  const category = CATEGORIES[activity.category];
  const totalCO2 = calculateCO2(activity, quantity, country.code, unitSystem);
  const co2Range = calculateCO2Range(activity, quantity, country.code, unitSystem);
  const formatted = formatCO2(totalCO2);
  const equivalencies = generateEquivalents(totalCO2, 4, unitSystem);

  const displayUnit = getDisplayUnit(activity.unit, unitSystem);
  const displayUnitPlural = getDisplayUnitPlural(activity.unit_plural, unitSystem);
  const unitLabel = quantity === 1 ? displayUnit : displayUnitPlural;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedActivity}-${quantity}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header with Share */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-sm text-slate-600 font-medium mb-3">
                {category.name}
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                {activity.name} <span className="text-slate-500 font-normal">× {quantity} {unitLabel}</span>
              </h3>
            </div>
            <ShareButton activityId={selectedActivity} quantity={quantity} />
          </div>

          {/* Main CO2 Value */}
          <div className="text-center py-8 mb-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
            <motion.div
              key={totalCO2}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl sm:text-6xl font-bold text-slate-900">
                  {formatted.value}
                </span>
                <span className="text-2xl sm:text-3xl font-medium text-slate-500">
                  {formatted.unit}
                </span>
              </div>
              <div className="mt-2 text-slate-500">
                {formatted.fullUnit}
              </div>
            </motion.div>

            {/* Range indicator with tooltip */}
            <div className="mt-4 flex items-center justify-center gap-1 text-sm text-slate-400">
              <span>Range: {formatCO2(co2Range[0]).value}{formatCO2(co2Range[0]).unit} – {formatCO2(co2Range[1]).value}{formatCO2(co2Range[1]).unit}</span>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowRangeTooltip(true)}
                  onMouseLeave={() => setShowRangeTooltip(false)}
                  onClick={() => setShowRangeTooltip(!showRangeTooltip)}
                  className="p-0.5 hover:text-slate-600"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {showRangeTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-slate-900 text-white text-xs rounded-lg z-10"
                    >
                      <p className="font-medium mb-1">Why is there a range?</p>
                      <p className="text-slate-300">
                        Carbon footprints vary based on location, energy sources, production methods, and other factors. The range shows typical minimum and maximum values from research.
                      </p>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Impact Context */}
          <div className="mb-6">
            <ImpactContext co2Grams={totalCO2} />
          </div>

          {/* Equivalencies */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              That's equivalent to
            </h4>
            <div className="grid gap-3">
              {equivalencies.map((equiv, index) => (
                <EquivalencyCard
                  key={equiv.id}
                  equivalency={equiv}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Time Multiplier */}
          <TimeMultiplier baseCO2={totalCO2} activityName={activity.name} />

          {/* Source Citation */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-start gap-2 text-sm text-slate-500">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Source:</span>{' '}
                {activity.source.title}
                {activity.source.year && ` (${activity.source.year})`}
                {activity.source.note && (
                  <span className="block text-slate-400 mt-1">
                    {activity.source.note}
                  </span>
                )}
                {activity.source.url && (
                  <a
                    href={activity.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1 text-green-600 hover:text-green-700"
                  >
                    Learn more <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
