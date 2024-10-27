import { useState } from 'react';
import { generateTravelPlan } from '../lib/gemini';
import { supabase } from '../lib/supabase';
import { TravelFormData } from '../components/TravelForm';
import { differenceInDays, format } from 'date-fns';

export function useTravelPlan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState(null);

  const generatePlan = async (formData: TravelFormData) => {
    setLoading(true);
    setError(null);

    try {
      // Validate dates
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const duration = differenceInDays(endDate, startDate);

      if (duration < 1) {
        throw new Error('End date must be after start date');
      }

      const prompt = `
        As an expert travel planner, suggest the perfect destination and create a detailed ${duration}-day itinerary based on these preferences:
        
        Travel Dates: ${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}
        Total Budget: $${formData.budget} USD
        Traveler Interests: ${formData.interests}

        Important considerations:
        - Seasonal weather and activities for the specified dates
        - Complete budget breakdown (flights, accommodations, activities, meals)
        - Alignment with traveler's interests and preferences
        - Current travel conditions and destination accessibility
        - Local events or festivals during the travel period
      `;

      const generatedPlan = await generateTravelPlan(prompt);

      // Store the plan in Supabase
      const { error: dbError } = await supabase
        .from('travel_plans')
        .insert([
          {
            user_id: 'guest',
            destination: generatedPlan.destination,
            start_date: formData.startDate,
            end_date: formData.endDate,
            budget: formData.budget,
            interests: formData.interests,
            plan: generatedPlan
          }
        ]);

      if (dbError) {
        console.error('Supabase error:', dbError);
        throw new Error('Failed to save travel plan');
      }

      setPlan(generatedPlan);
    } catch (err) {
      console.error('Error generating travel plan:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to generate travel suggestions. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return { generatePlan, loading, error, plan };
}