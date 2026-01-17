import { motion } from 'framer-motion';
import { Info, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';

// Impact thresholds (as percentage of daily average)
const THRESHOLDS = {
  negligible: 0.1,   // < 0.1% of daily
  low: 1,            // < 1% of daily
  moderate: 5,       // < 5% of daily
  high: 15,          // < 15% of daily
  // very high: >= 15%
};

export default function ImpactContext({ co2Grams }) {
  const { country } = usePreferences();

  // Daily average based on country's yearly average
  const dailyAverageGrams = (country.yearlyAverageKg * 1000) / 365;
  const percentOfDaily = (co2Grams / dailyAverageGrams) * 100;

  let level, color, bgColor, borderColor, Icon, message;

  if (percentOfDaily < THRESHOLDS.negligible) {
    level = 'Negligible';
    color = 'text-green-700';
    bgColor = 'bg-green-50';
    borderColor = 'border-green-200';
    Icon = CheckCircle;
    message = 'Barely registers in your daily footprint';
  } else if (percentOfDaily < THRESHOLDS.low) {
    level = 'Low impact';
    color = 'text-green-700';
    bgColor = 'bg-green-50';
    borderColor = 'border-green-200';
    Icon = CheckCircle;
    message = `About ${percentOfDaily.toFixed(1)}% of a typical day's emissions`;
  } else if (percentOfDaily < THRESHOLDS.moderate) {
    level = 'Moderate';
    color = 'text-amber-700';
    bgColor = 'bg-amber-50';
    borderColor = 'border-amber-200';
    Icon = AlertCircle;
    message = `Around ${percentOfDaily.toFixed(0)}% of a typical day's emissions`;
  } else if (percentOfDaily < THRESHOLDS.high) {
    level = 'Significant';
    color = 'text-orange-700';
    bgColor = 'bg-orange-50';
    borderColor = 'border-orange-200';
    Icon = AlertTriangle;
    message = `About ${percentOfDaily.toFixed(0)}% of a typical day's emissions`;
  } else {
    level = 'High impact';
    color = 'text-red-700';
    bgColor = 'bg-red-50';
    borderColor = 'border-red-200';
    Icon = AlertTriangle;
    message = percentOfDaily >= 100
      ? `More than a full day's average emissions!`
      : `About ${percentOfDaily.toFixed(0)}% of a typical day's emissions`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-3 p-3 ${bgColor} ${borderColor} border rounded-xl`}
    >
      <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-semibold ${color}`}>{level}</div>
        <div className="text-xs text-slate-600">{message}</div>
      </div>
      <div className="relative group">
        <Info className="w-4 h-4 text-slate-400 cursor-help" />
        <div className="absolute bottom-full right-0 mb-2 w-52 p-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
          Based on {country.name} average of {(country.yearlyAverageKg / 1000).toFixed(1)}t CO₂/year (~{Math.round(dailyAverageGrams / 1000)}kg/day)
          <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900"></div>
        </div>
      </div>
    </motion.div>
  );
}
