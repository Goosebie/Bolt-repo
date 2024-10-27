import React from 'react';
import { Calendar, DollarSign, Heart } from 'lucide-react';

export interface TravelFormData {
  startDate: string;
  endDate: string;
  budget: string;
  interests: string;
}

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  loading: boolean;
}

export function TravelForm({ onSubmit, loading }: TravelFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      budget: formData.get('budget') as string,
      interests: formData.get('interests') as string,
    });
  };

  // Get today's date for min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            required
            min={today}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            required
            min={today}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Budget (USD)
        </label>
        <input
          type="number"
          name="budget"
          required
          min="100"
          step="100"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your total budget"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Interests & Preferences
        </label>
        <textarea
          name="interests"
          required
          rows={4}
          minLength={20}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your interests and preferences (e.g., beach lover, history buff, foodie, adventure seeker, cultural experiences, etc.)"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Finding Perfect Destinations...' : 'Discover Travel Destinations'}
      </button>
    </form>
  );
}