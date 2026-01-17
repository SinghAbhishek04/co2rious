import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ACTIVITIES, CATEGORIES } from '../data/activities';
import { usePreferences } from '../context/PreferencesContext';
import { getCO2PerUnit } from '../utils/co2Calculator';
import { getDisplayUnit } from '../config/units';

export default function ActivityDropdown({ selectedActivity, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const { country, unitSystem } = usePreferences();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Filter activities based on search
  const filteredActivities = Object.values(ACTIVITIES).filter(activity =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    CATEGORIES[activity.category].name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered activities by category
  const groupedActivities = filteredActivities.reduce((acc, activity) => {
    if (!acc[activity.category]) {
      acc[activity.category] = [];
    }
    acc[activity.category].push(activity);
    return acc;
  }, {});

  const handleSelect = (activity) => {
    onSelect(activity);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Get icon component dynamically
  const getIcon = (iconName, className = "w-5 h-5") => {
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className={className} /> : null;
  };

  const selected = selectedActivity ? ACTIVITIES[selectedActivity] : null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-3 px-4 py-4
          bg-white border rounded-xl
          transition-all duration-200
          ${isOpen
            ? 'border-slate-900 ring-2 ring-slate-900/5'
            : 'border-slate-200 hover:border-slate-300'
          }
        `}
      >
        <div className="flex items-center gap-3">
          {selected ? (
            <>
              <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg">
                {getIcon(selected.icon, "w-5 h-5 text-slate-700")}
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-900">{selected.name}</div>
                <div className="text-sm text-slate-500">
                  {CATEGORIES[selected.category].name}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <span className="text-slate-500">Select an activity...</span>
            </>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search activities..."
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 placeholder-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Activities List */}
            <div className="max-h-80 overflow-y-auto">
              {Object.keys(groupedActivities).length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  No activities found
                </div>
              ) : (
                Object.entries(groupedActivities).map(([categoryId, activities]) => (
                  <div key={categoryId}>
                    {/* Category Header */}
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        {getIcon(CATEGORIES[categoryId].icon, "w-4 h-4 text-slate-500")}
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {CATEGORIES[categoryId].name}
                        </span>
                      </div>
                    </div>

                    {/* Category Items */}
                    {activities.map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => handleSelect(activity)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 text-left
                          transition-colors duration-150
                          ${selectedActivity === activity.id
                            ? 'bg-green-50 text-green-900'
                            : 'hover:bg-slate-50 text-slate-700'
                          }
                        `}
                      >
                        <div className={`
                          flex items-center justify-center w-9 h-9 rounded-lg
                          ${selectedActivity === activity.id
                            ? 'bg-green-100'
                            : 'bg-slate-100'
                          }
                        `}>
                          {getIcon(activity.icon, `w-4 h-4 ${selectedActivity === activity.id ? 'text-green-700' : 'text-slate-600'}`)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{activity.name}</div>
                          <div className="text-xs text-slate-500">
                            {(() => {
                              const co2Info = getCO2PerUnit(activity, country.code, unitSystem);
                              const displayUnit = getDisplayUnit(activity.unit, unitSystem);
                              return `~${co2Info.value >= 1000
                                ? `${(co2Info.value / 1000).toFixed(1)}kg`
                                : `${co2Info.value}g`
                              } CO₂ per ${displayUnit}`;
                            })()}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
