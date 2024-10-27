import React from 'react';
import { Plane } from 'lucide-react';
import { TravelForm } from './components/TravelForm';
import { TravelPlan } from './components/TravelPlan';
import { useTravelPlan } from './hooks/useTravelPlan';

function App() {
  const { generatePlan, loading, error, plan } = useTravelPlan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plane className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">AI Travel Planner</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tell us about your dream vacation, and our AI will create a personalized travel plan 
            tailored to your preferences, budget, and schedule.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <TravelForm onSubmit={generatePlan} loading={loading} />
              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                  {error}
                </div>
              )}
            </div>
            <div className="md:mt-0 mt-8">
              <TravelPlan plan={plan} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;