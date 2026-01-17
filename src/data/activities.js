// Activities database with CO2 equivalents
// All values in grams of CO2-equivalent per unit
// gridDependent: true means the CO2 value scales with local grid carbon intensity

export const ACTIVITIES = {
  // Transportation
  elevator: {
    id: 'elevator',
    name: 'Elevator ride',
    category: 'transportation',
    icon: 'ArrowUpDown',
    co2_per_unit: 5,
    co2_range_per_unit: [3, 8],
    unit: 'floor',
    unit_plural: 'floors',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 50,
    step: 1,
    gridDependent: true,
    source: {
      title: 'Energy use estimation',
      year: 2023,
      note: 'Based on avg elevator 0.005 kWh per floor'
    }
  },

  car_drive: {
    id: 'car_drive',
    name: 'Driving',
    category: 'transportation',
    icon: 'Car',
    co2_per_unit: 160,
    co2_range_per_unit: [120, 250],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 10,
    min_quantity: 1,
    max_quantity: 500,
    step: 1,
    source: {
      title: 'UK DEFRA Conversion Factors',
      year: 2023,
      note: 'Average medium car, petrol'
    }
  },

  metro: {
    id: 'metro',
    name: 'Metro/Subway',
    category: 'transportation',
    icon: 'Train',
    co2_per_unit: 28,
    co2_range_per_unit: [20, 40],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 5,
    min_quantity: 1,
    max_quantity: 100,
    step: 1,
    gridDependent: true,
    source: {
      title: 'UK DEFRA Conversion Factors',
      year: 2023,
      note: 'Light rail and tram, average occupancy'
    }
  },

  short_haul_flight: {
    id: 'short_haul_flight',
    name: 'Short-haul flight',
    category: 'transportation',
    icon: 'Plane',
    co2_per_unit: 183,
    co2_range_per_unit: [150, 220],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 500,
    min_quantity: 100,
    max_quantity: 3000,
    step: 50,
    source: {
      title: 'UK DEFRA Conversion Factors',
      year: 2023,
      note: 'Domestic/short-haul flights, economy class'
    }
  },

  long_haul_flight: {
    id: 'long_haul_flight',
    name: 'Long-haul flight',
    category: 'transportation',
    icon: 'PlaneTakeoff',
    co2_per_unit: 200,
    co2_range_per_unit: [170, 250],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 5000,
    min_quantity: 1000,
    max_quantity: 20000,
    step: 500,
    source: {
      title: 'UK DEFRA Conversion Factors',
      year: 2023,
      note: 'Long-haul international flights, economy class'
    }
  },

  bus_ride: {
    id: 'bus_ride',
    name: 'Bus ride',
    category: 'transportation',
    icon: 'Bus',
    co2_per_unit: 102,
    co2_range_per_unit: [80, 130],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 10,
    min_quantity: 1,
    max_quantity: 100,
    step: 1,
    source: {
      title: 'UK DEFRA Conversion Factors',
      year: 2023,
      note: 'Average local bus, all passengers'
    }
  },

  electric_car: {
    id: 'electric_car',
    name: 'Electric car',
    category: 'transportation',
    icon: 'Zap',
    co2_per_unit: 55,
    co2_range_per_unit: [30, 80],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 10,
    min_quantity: 1,
    max_quantity: 500,
    step: 1,
    gridDependent: true,
    source: {
      title: 'UK DEFRA Conversion Factors',
      year: 2023,
      note: 'Battery electric vehicle, average grid'
    }
  },

  motorcycle: {
    id: 'motorcycle',
    name: 'Motorcycle',
    category: 'transportation',
    icon: 'Bike',
    co2_per_unit: 114,
    co2_range_per_unit: [90, 150],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 10,
    min_quantity: 1,
    max_quantity: 200,
    step: 1,
    source: {
      title: 'UK DEFRA Conversion Factors',
      year: 2023,
      note: 'Average motorcycle'
    }
  },

  taxi_uber: {
    id: 'taxi_uber',
    name: 'Taxi/Uber',
    category: 'transportation',
    icon: 'CarTaxiFront',
    co2_per_unit: 208,
    co2_range_per_unit: [170, 260],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 5,
    min_quantity: 1,
    max_quantity: 100,
    step: 1,
    source: {
      title: 'UK DEFRA Conversion Factors',
      year: 2023,
      note: 'Taxi, including deadheading'
    }
  },

  train_intercity: {
    id: 'train_intercity',
    name: 'Intercity train',
    category: 'transportation',
    icon: 'TrainFront',
    co2_per_unit: 35.5,
    co2_range_per_unit: [25, 50],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 100,
    min_quantity: 10,
    max_quantity: 1000,
    step: 10,
    gridDependent: true,
    source: {
      title: 'UK DEFRA Conversion Factors',
      year: 2023,
      note: 'National rail, average occupancy'
    }
  },

  ferry: {
    id: 'ferry',
    name: 'Ferry',
    category: 'transportation',
    icon: 'Ship',
    co2_per_unit: 113,
    co2_range_per_unit: [80, 150],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 50,
    min_quantity: 5,
    max_quantity: 500,
    step: 5,
    source: {
      title: 'UK DEFRA Conversion Factors',
      year: 2023,
      note: 'Foot passenger ferry'
    }
  },

  coach: {
    id: 'coach',
    name: 'Coach',
    category: 'transportation',
    icon: 'Bus',
    co2_per_unit: 27.2,
    co2_range_per_unit: [20, 35],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 100,
    min_quantity: 10,
    max_quantity: 500,
    step: 10,
    source: {
      title: 'UK DEFRA Conversion Factors',
      year: 2023,
      note: 'Long-distance coach, average occupancy'
    }
  },

  e_bike: {
    id: 'e_bike',
    name: 'E-bike',
    category: 'transportation',
    icon: 'Bike',
    co2_per_unit: 5,
    co2_range_per_unit: [3, 8],
    unit: 'km',
    unit_plural: 'km',
    default_quantity: 10,
    min_quantity: 1,
    max_quantity: 100,
    step: 1,
    gridDependent: true,
    source: {
      title: 'Calculated',
      year: 2023,
      note: '~0.01 kWh/km × 500g CO₂/kWh avg grid'
    }
  },

  // Food & Drink
  coffee_black: {
    id: 'coffee_black',
    name: 'Black coffee',
    category: 'food',
    icon: 'Coffee',
    co2_per_unit: 300,
    co2_range_per_unit: [200, 400],
    unit: 'cup',
    unit_plural: 'cups',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 10,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, full supply chain LCA'
    }
  },

  coffee_latte: {
    id: 'coffee_latte',
    name: 'Latte (dairy)',
    category: 'food',
    icon: 'Coffee',
    co2_per_unit: 900,
    co2_range_per_unit: [700, 1200],
    unit: 'cup',
    unit_plural: 'cups',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 10,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Coffee + 250ml dairy milk, full LCA'
    }
  },

  beef_burger: {
    id: 'beef_burger',
    name: 'Beef burger',
    category: 'food',
    icon: 'Beef',
    co2_per_unit: 9000,
    co2_range_per_unit: [6000, 12000],
    unit: 'burger',
    unit_plural: 'burgers',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, 150g beef patty + bun, full LCA'
    }
  },

  vegetarian_meal: {
    id: 'vegetarian_meal',
    name: 'Vegetarian meal',
    category: 'food',
    icon: 'Salad',
    co2_per_unit: 450,
    co2_range_per_unit: [300, 700],
    unit: 'meal',
    unit_plural: 'meals',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 1,
    source: {
      title: 'Our World in Data',
      year: 2022,
      note: 'Average plant-based meal'
    }
  },

  chicken_meal: {
    id: 'chicken_meal',
    name: 'Chicken meal',
    category: 'food',
    icon: 'Drumstick',
    co2_per_unit: 1481,
    co2_range_per_unit: [1000, 2000],
    unit: 'meal',
    unit_plural: 'meals',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, 150g chicken serving, full LCA'
    }
  },

  fish_meal: {
    id: 'fish_meal',
    name: 'Fish meal (farmed)',
    category: 'food',
    icon: 'Fish',
    co2_per_unit: 2045,
    co2_range_per_unit: [1500, 3000],
    unit: 'meal',
    unit_plural: 'meals',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, 150g farmed fish, full LCA'
    }
  },

  pork_meal: {
    id: 'pork_meal',
    name: 'Pork meal',
    category: 'food',
    icon: 'Ham',
    co2_per_unit: 1847,
    co2_range_per_unit: [1200, 2500],
    unit: 'meal',
    unit_plural: 'meals',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, 150g pork serving, full LCA'
    }
  },

  lamb_meal: {
    id: 'lamb_meal',
    name: 'Lamb meal',
    category: 'food',
    icon: 'Beef',
    co2_per_unit: 5958,
    co2_range_per_unit: [4000, 8000],
    unit: 'meal',
    unit_plural: 'meals',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, 150g lamb serving, full LCA'
    }
  },

  eggs: {
    id: 'eggs',
    name: 'Eggs',
    category: 'food',
    icon: 'Egg',
    co2_per_unit: 234,
    co2_range_per_unit: [180, 300],
    unit: 'egg',
    unit_plural: 'eggs',
    default_quantity: 2,
    min_quantity: 1,
    max_quantity: 12,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, per egg, full LCA'
    }
  },

  cheese: {
    id: 'cheese',
    name: 'Cheese',
    category: 'food',
    icon: 'Slice',
    co2_per_unit: 2388,
    co2_range_per_unit: [1800, 3000],
    unit: '100g',
    unit_plural: '100g',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, per 100g, full LCA'
    }
  },

  rice: {
    id: 'rice',
    name: 'Rice',
    category: 'food',
    icon: 'Wheat',
    co2_per_unit: 334,
    co2_range_per_unit: [250, 450],
    unit: 'serving',
    unit_plural: 'servings',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, 150g cooked serving, full LCA'
    }
  },

  bread: {
    id: 'bread',
    name: 'Bread',
    category: 'food',
    icon: 'Sandwich',
    co2_per_unit: 47,
    co2_range_per_unit: [30, 70],
    unit: 'slice',
    unit_plural: 'slices',
    default_quantity: 2,
    min_quantity: 1,
    max_quantity: 10,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, per slice (~30g), full LCA'
    }
  },

  milk: {
    id: 'milk',
    name: 'Milk (dairy)',
    category: 'food',
    icon: 'GlassWater',
    co2_per_unit: 788,
    co2_range_per_unit: [600, 1000],
    unit: 'glass',
    unit_plural: 'glasses',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, 250ml glass, full LCA'
    }
  },

  chocolate: {
    id: 'chocolate',
    name: 'Chocolate',
    category: 'food',
    icon: 'Cookie',
    co2_per_unit: 4665,
    co2_range_per_unit: [3500, 6000],
    unit: '100g',
    unit_plural: '100g',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 1,
    source: {
      title: 'Poore & Nemecek',
      year: 2018,
      note: 'Science journal, per 100g bar, full LCA (includes cocoa)'
    }
  },

  // Home Energy
  boil_water_kettle: {
    id: 'boil_water_kettle',
    name: 'Boiling water',
    category: 'home',
    icon: 'Flame',
    co2_per_unit: 50,
    co2_range_per_unit: [30, 70],
    unit: 'liter',
    unit_plural: 'liters',
    default_quantity: 1,
    min_quantity: 0.5,
    max_quantity: 5,
    step: 0.5,
    gridDependent: true,
    source: {
      title: 'Energy calculation + OWID grid',
      year: 2023,
      note: '0.1 kWh × ~500g CO₂/kWh world avg'
    }
  },

  dishwasher_cycle: {
    id: 'dishwasher_cycle',
    name: 'Dishwasher',
    category: 'home',
    icon: 'Droplets',
    co2_per_unit: 550,
    co2_range_per_unit: [400, 800],
    unit: 'cycle',
    unit_plural: 'cycles',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 10,
    step: 1,
    gridDependent: true,
    source: {
      title: 'Energy Star',
      year: 2023,
      note: 'Modern efficient model, ~1.1 kWh/cycle'
    }
  },

  hot_shower: {
    id: 'hot_shower',
    name: 'Hot shower',
    category: 'home',
    icon: 'ShowerHead',
    co2_per_unit: 175,
    co2_range_per_unit: [120, 250],
    unit: 'minute',
    unit_plural: 'minutes',
    default_quantity: 8,
    min_quantity: 1,
    max_quantity: 30,
    step: 1,
    source: {
      title: 'EPA + OWID',
      year: 2023,
      note: 'Based on water heating energy + grid average'
    },
    gridDependent: true
  },

  bath: {
    id: 'bath',
    name: 'Bath',
    category: 'home',
    icon: 'Bath',
    co2_per_unit: 3700,
    co2_range_per_unit: [2500, 5000],
    unit: 'bath',
    unit_plural: 'baths',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 1,
    source: {
      title: 'Calculated',
      year: 2023,
      note: '~80L hot water, heating energy + grid average'
    },
    gridDependent: true
  },

  washing_machine: {
    id: 'washing_machine',
    name: 'Washing machine',
    category: 'home',
    icon: 'WashingMachine',
    co2_per_unit: 325,
    co2_range_per_unit: [200, 500],
    unit: 'cycle',
    unit_plural: 'cycles',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 10,
    step: 1,
    source: {
      title: 'Energy Star',
      year: 2023,
      note: 'Modern efficient model, warm wash'
    },
    gridDependent: true
  },

  tumble_dryer: {
    id: 'tumble_dryer',
    name: 'Tumble dryer',
    category: 'home',
    icon: 'Wind',
    co2_per_unit: 2500,
    co2_range_per_unit: [1800, 3500],
    unit: 'cycle',
    unit_plural: 'cycles',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 10,
    step: 1,
    source: {
      title: 'Energy Star',
      year: 2023,
      note: 'Electric dryer, ~5 kWh/cycle'
    },
    gridDependent: true
  },

  air_conditioning: {
    id: 'air_conditioning',
    name: 'Air conditioning',
    category: 'home',
    icon: 'Snowflake',
    co2_per_unit: 1500,
    co2_range_per_unit: [1000, 2000],
    unit: 'hour',
    unit_plural: 'hours',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 24,
    step: 1,
    source: {
      title: 'Energy Star',
      year: 2023,
      note: 'Central AC, ~3 kWh/hour'
    },
    gridDependent: true
  },

  electric_heater: {
    id: 'electric_heater',
    name: 'Electric heater',
    category: 'home',
    icon: 'Heater',
    co2_per_unit: 735,
    co2_range_per_unit: [500, 1000],
    unit: 'hour',
    unit_plural: 'hours',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 24,
    step: 1,
    source: {
      title: 'DOE',
      year: 2023,
      note: 'Portable electric heater, ~1.5 kWh'
    },
    gridDependent: true
  },

  electric_cooking: {
    id: 'electric_cooking',
    name: 'Electric cooking',
    category: 'home',
    icon: 'ChefHat',
    co2_per_unit: 980,
    co2_range_per_unit: [700, 1300],
    unit: 'hour',
    unit_plural: 'hours',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 5,
    step: 0.5,
    source: {
      title: 'DOE',
      year: 2023,
      note: 'Electric stovetop, ~2 kWh/hour'
    },
    gridDependent: true
  },

  microwave: {
    id: 'microwave',
    name: 'Microwave',
    category: 'home',
    icon: 'Microwave',
    co2_per_unit: 8,
    co2_range_per_unit: [5, 12],
    unit: 'minute',
    unit_plural: 'minutes',
    default_quantity: 3,
    min_quantity: 1,
    max_quantity: 30,
    step: 1,
    source: {
      title: 'DOE',
      year: 2023,
      note: '~1000W microwave, avg grid'
    },
    gridDependent: true
  },

  oven: {
    id: 'oven',
    name: 'Oven',
    category: 'home',
    icon: 'CookingPot',
    co2_per_unit: 1100,
    co2_range_per_unit: [800, 1500],
    unit: 'hour',
    unit_plural: 'hours',
    default_quantity: 1,
    min_quantity: 0.5,
    max_quantity: 5,
    step: 0.5,
    source: {
      title: 'DOE',
      year: 2023,
      note: 'Electric oven, ~2.2 kWh/hour'
    },
    gridDependent: true
  },

  refrigerator: {
    id: 'refrigerator',
    name: 'Refrigerator',
    category: 'home',
    icon: 'Refrigerator',
    co2_per_unit: 750,
    co2_range_per_unit: [500, 1000],
    unit: 'day',
    unit_plural: 'days',
    default_quantity: 1,
    min_quantity: 1,
    max_quantity: 30,
    step: 1,
    source: {
      title: 'Energy Star',
      year: 2023,
      note: 'Modern fridge, ~1.5 kWh/day'
    },
    gridDependent: true
  },

  // Digital
  streaming: {
    id: 'streaming',
    name: 'Video streaming',
    category: 'digital',
    icon: 'Play',
    co2_per_unit: 55,
    co2_range_per_unit: [36, 100],
    unit: 'hour',
    unit_plural: 'hours',
    default_quantity: 1,
    min_quantity: 0.5,
    max_quantity: 12,
    step: 0.5,
    source: {
      title: 'IEA / Carbon Trust',
      year: 2022,
      note: 'HD streaming, includes data centers'
    },
    gridDependent: true
  }
};

// Categories for organization
export const CATEGORIES = {
  transportation: {
    id: 'transportation',
    name: 'Transportation',
    icon: 'Car',
    color: 'blue'
  },
  food: {
    id: 'food',
    name: 'Food & Drink',
    icon: 'UtensilsCrossed',
    color: 'green'
  },
  home: {
    id: 'home',
    name: 'Home Energy',
    icon: 'Home',
    color: 'amber'
  },
  digital: {
    id: 'digital',
    name: 'Digital',
    icon: 'Wifi',
    color: 'purple'
  }
};

// Calculate CO2 for an activity with quantity
export const calculateCO2 = (activityId, quantity) => {
  const activity = ACTIVITIES[activityId];
  if (!activity) return 0;
  return activity.co2_per_unit * quantity;
};

// Get CO2 range for an activity with quantity
export const calculateCO2Range = (activityId, quantity) => {
  const activity = ACTIVITIES[activityId];
  if (!activity) return [0, 0];
  return [
    activity.co2_range_per_unit[0] * quantity,
    activity.co2_range_per_unit[1] * quantity
  ];
};

// Helper to get activities by category
export const getActivitiesByCategory = () => {
  const grouped = {};
  Object.values(ACTIVITIES).forEach(activity => {
    if (!grouped[activity.category]) {
      grouped[activity.category] = [];
    }
    grouped[activity.category].push(activity);
  });
  return grouped;
};

// Get all activities as array
export const getActivitiesArray = () => Object.values(ACTIVITIES);
