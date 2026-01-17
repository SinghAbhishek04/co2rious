import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ACTIVITIES, calculateCO2 } from '../data/activities';

const PRESET_COMPARISONS = [
  {
    id: 'coffee',
    title: 'Coffee showdown',
    description: 'Black vs Latte',
    activity1: { id: 'coffee_black', quantity: 1 },
    activity2: { id: 'coffee_latte', quantity: 1 },
  },
  {
    id: 'commute',
    title: 'Commute choice',
    description: 'Car vs E-bike (10km)',
    activity1: { id: 'car_drive', quantity: 10 },
    activity2: { id: 'e_bike', quantity: 10 },
  },
  {
    id: 'meal',
    title: 'Protein pick',
    description: 'Beef vs Chicken meal',
    activity1: { id: 'beef_burger', quantity: 1 },
    activity2: { id: 'chicken_meal', quantity: 1 },
  },
  {
    id: 'laundry',
    title: 'Laundry dilemma',
    description: 'Tumble dry vs Air dry',
    activity1: { id: 'tumble_dryer', quantity: 1 },
    activity2: { id: 'washing_machine', quantity: 1 },
  },
  {
    id: 'travel',
    title: 'Travel choice',
    description: 'Flight vs Train (500km)',
    activity1: { id: 'short_haul_flight', quantity: 500 },
    activity2: { id: 'train_intercity', quantity: 500 },
  },
  {
    id: 'bathing',
    title: 'Getting clean',
    description: 'Bath vs 8min Shower',
    activity1: { id: 'bath', quantity: 1 },
    activity2: { id: 'hot_shower', quantity: 8 },
  },
];

export default function QuickCompare({ onSelectComparison }) {
  const getIcon = (iconName, className = "w-4 h-4") => {
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className={className} /> : null;
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-semibold text-slate-700">Quick comparisons</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRESET_COMPARISONS.map((preset, index) => {
          const act1 = ACTIVITIES[preset.activity1.id];
          const act2 = ACTIVITIES[preset.activity2.id];
          const co2_1 = calculateCO2(preset.activity1.id, preset.activity1.quantity);
          const co2_2 = calculateCO2(preset.activity2.id, preset.activity2.quantity);
          const winner = co2_1 < co2_2 ? 1 : 2;
          const ratio = Math.round(Math.max(co2_1, co2_2) / Math.min(co2_1, co2_2));

          return (
            <motion.button
              key={preset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectComparison(preset)}
              className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center gap-1">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${winner === 1 ? 'bg-green-100' : 'bg-slate-100'}`}>
                  {getIcon(act1.icon, `w-4 h-4 ${winner === 1 ? 'text-green-600' : 'text-slate-500'}`)}
                </div>
                <span className="text-slate-400 text-xs">vs</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${winner === 2 ? 'bg-green-100' : 'bg-slate-100'}`}>
                  {getIcon(act2.icon, `w-4 h-4 ${winner === 2 ? 'text-green-600' : 'text-slate-500'}`)}
                </div>
              </div>

              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="font-medium text-slate-900 text-sm truncate">{preset.title}</div>
                <div className="text-xs text-slate-500 truncate">{preset.description}</div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-green-600 whitespace-nowrap">{ratio}× less</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
