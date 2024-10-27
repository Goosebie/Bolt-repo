import React from 'react';
import { Calendar, MapPin, DollarSign, List } from 'lucide-react';

interface TravelPlanProps {
  plan: {
    destination: string;
    duration: string;
    budget: string;
    itinerary: Array<{
      day: number;
      activities: string[];
    }>;
    recommendations: string[];
  } | null;
}

export function TravelPlan({ plan }: TravelPlanProps) {
  if (!plan) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 h-full flex items-center justify-center">
        <p className="text-gray-500 text-center">
          Fill out the form to generate your personalized travel plan
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">{plan.destination}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <p>{plan.duration}</p>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <p>{plan.budget}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <List className="w-5 h-5 text-blue-600" />
          Daily Itinerary
        </h3>
        <div className="space-y-4">
          {plan.itinerary.map((day) => (
            <div key={day.day} className="border-l-2 border-blue-200 pl-4">
              <h4 className="font-medium mb-2">Day {day.day}</h4>
              <ul className="list-disc list-inside space-y-1">
                {day.activities.map((activity, index) => (
                  <li key={index} className="text-gray-600">{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Recommendations</h3>
        <ul className="list-disc list-inside space-y-1">
          {plan.recommendations.map((recommendation, index) => (
            <li key={index} className="text-gray-600">{recommendation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}