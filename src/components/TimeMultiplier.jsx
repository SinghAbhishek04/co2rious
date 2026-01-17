import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp } from 'lucide-react';
import { formatCO2 } from '../data/equivalencies';
import { usePreferences } from '../context/PreferencesContext';

const TIME_PERIODS = [
  { id: 'once', label: 'Once', multiplier: 1 },
  { id: 'daily', label: 'Daily', multiplier: 365 },
  { id: 'weekly', label: 'Weekly', multiplier: 52 },
  { id: 'monthly', label: 'Monthly', multiplier: 12 },
];

export default function TimeMultiplier({ baseCO2, activityName }) {
  const [selectedPeriod, setSelectedPeriod] = useState('once');
  const { country } = usePreferences();

  // Use country-specific yearly average (in grams)
  const yearlyAverageGrams = country.yearlyAverageKg * 1000;

  const period = TIME_PERIODS.find(p => p.id === selectedPeriod);
  const yearlyTotal = baseCO2 * period.multiplier;
  const formatted = formatCO2(yearlyTotal);

  // Calculate percentage of country-specific average
  const percentOfAverage = ((yearlyTotal / yearlyAverageGrams) * 100);

  // Format the percentage nicely
  const formattedPercent = percentOfAverage >= 1
    ? percentOfAverage.toFixed(1)
    : percentOfAverage.toFixed(2);

  return (
    <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-amber-600" />
        <span className="text-sm font-semibold text-amber-900">
          If you do this...
        </span>
      </div>

      {/* Period Selector */}
      <div className="flex gap-1 p-1 bg-white/60 rounded-lg mb-4">
        {TIME_PERIODS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPeriod(p.id)}
            className={`
              flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
              ${selectedPeriod === p.id
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-700 hover:bg-amber-100'
              }
            `}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Yearly Impact */}
      {selectedPeriod !== 'once' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-amber-700">Your yearly total:</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-amber-900">{formatted.value}</span>
              <span className="text-lg text-amber-700 ml-1">{formatted.unit}</span>
            </div>
          </div>

          {/* Context Bar */}
          <div className="relative">
            <div className="h-3 bg-amber-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentOfAverage, 100)}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full rounded-full ${
                  percentOfAverage < 1 ? 'bg-green-500' :
                  percentOfAverage < 5 ? 'bg-amber-500' :
                  'bg-red-500'
                }`}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-amber-600">
              <span>0%</span>
              <span>{country.name} avg ({(country.yearlyAverageKg / 1000).toFixed(1)}t/year)</span>
            </div>
          </div>

          {/* Insight */}
          <div className="flex items-start gap-2 p-3 bg-white/80 rounded-lg">
            <TrendingUp className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
              percentOfAverage < 1 ? 'text-green-600' :
              percentOfAverage < 5 ? 'text-amber-600' :
              'text-red-600'
            }`} />
            <p className="text-sm text-amber-800">
              {percentOfAverage < 0.1 ? (
                <>This is <span className="font-semibold text-green-700">negligible</span> — just {formattedPercent}% of an average person's yearly footprint.</>
              ) : percentOfAverage < 1 ? (
                <>This is <span className="font-semibold text-green-700">relatively small</span> — about {formattedPercent}% of an average person's yearly footprint.</>
              ) : percentOfAverage < 5 ? (
                <>This is <span className="font-semibold text-amber-700">noticeable</span> — {formattedPercent}% of an average person's yearly footprint.</>
              ) : percentOfAverage < 20 ? (
                <>This is <span className="font-semibold text-orange-700">significant</span> — {formattedPercent}% of an average person's yearly footprint.</>
              ) : (
                <>This is <span className="font-semibold text-red-700">substantial</span> — {formattedPercent}% of an average person's yearly footprint.</>
              )}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
