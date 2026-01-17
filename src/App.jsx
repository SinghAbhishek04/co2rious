import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import ResultsPanel from './components/ResultsPanel';
import ComparePanel from './components/ComparePanel';
import QuickCompare from './components/QuickCompare';
import Footer from './components/Footer';
import { ACTIVITIES } from './data/activities';
import { PreferencesProvider } from './context/PreferencesContext';

function AppContent() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [compareMode, setCompareMode] = useState(false);
  const [compareActivity, setCompareActivity] = useState(null);
  const [compareQuantity, setCompareQuantity] = useState(1);

  const handleActivitySelect = (activityId) => {
    setSelectedActivity(activityId);
    const activity = ACTIVITIES[activityId];
    setQuantity(activity.default_quantity);
  };

  const handleCompareActivitySelect = (activityId) => {
    setCompareActivity(activityId);
    const activity = ACTIVITIES[activityId];
    setCompareQuantity(activity.default_quantity);
  };

  const handleReset = () => {
    setSelectedActivity(null);
    setQuantity(1);
    setCompareMode(false);
    setCompareActivity(null);
    setCompareQuantity(1);
  };

  const toggleCompareMode = () => {
    if (compareMode) {
      setCompareActivity(null);
      setCompareQuantity(1);
    }
    setCompareMode(!compareMode);
  };

  const handleQuickCompare = (preset) => {
    setSelectedActivity(preset.activity1.id);
    setQuantity(preset.activity1.quantity);
    setCompareActivity(preset.activity2.id);
    setCompareQuantity(preset.activity2.quantity);
    setCompareMode(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />

        {/* Calculator Section */}
        <section id="calculator" className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {!compareMode ? (
              // Single Calculator Mode
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                <div className="lg:col-span-2">
                  <Calculator
                    selectedActivity={selectedActivity}
                    quantity={quantity}
                    onActivitySelect={handleActivitySelect}
                    onQuantityChange={setQuantity}
                    onReset={handleReset}
                  />

                  {selectedActivity && (
                    <button
                      onClick={toggleCompareMode}
                      className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors duration-200"
                    >
                      Compare with another activity
                    </button>
                  )}

                  {/* Quick Compare Presets */}
                  {!selectedActivity && (
                    <QuickCompare onSelectComparison={handleQuickCompare} />
                  )}
                </div>

                <div className="lg:col-span-3">
                  <ResultsPanel
                    selectedActivity={selectedActivity}
                    quantity={quantity}
                  />
                </div>
              </div>
            ) : (
              // Compare Mode
              <ComparePanel
                activity1={selectedActivity}
                quantity1={quantity}
                activity2={compareActivity}
                quantity2={compareQuantity}
                onActivity1Select={handleActivitySelect}
                onQuantity1Change={setQuantity}
                onActivity2Select={handleCompareActivitySelect}
                onQuantity2Change={setCompareQuantity}
                onExitCompare={toggleCompareMode}
                onReset={handleReset}
              />
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 sm:py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-8">
              Why carbon equivalencies matter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🌡️</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Make it tangible</h3>
                <p className="text-sm text-slate-600">
                  Abstract numbers become real when compared to everyday activities you actually do.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Compare choices</h3>
                <p className="text-sm text-slate-600">
                  See how different options stack up against each other to make informed decisions.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Build awareness</h3>
                <p className="text-sm text-slate-600">
                  Small actions add up. Understanding impact helps prioritize what matters most.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <PreferencesProvider>
      <AppContent />
    </PreferencesProvider>
  );
}

export default App;
