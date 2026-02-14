import { NextRequest, NextResponse } from 'next/server';
import { generateInsights } from '@/lib/insights';
import type {
  GenerateInsightsRequest,
  GenerateInsightsResponse,
} from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: GenerateInsightsRequest = await request.json();

    // Validate request body
    if (!body.simulationResults || !body.aiClone || !body.simulatedPersonality) {
      const response: GenerateInsightsResponse = {
        success: false,
        error: 'Missing required data',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const insights = await generateInsights(
      body.simulationResults,
      body.aiClone,
      body.simulatedPersonality
    );

    const response: GenerateInsightsResponse = {
      success: true,
      insights,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error generating insights:', error);

    const response: GenerateInsightsResponse = {
      success: false,
      error: error.message || 'Failed to generate insights',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
