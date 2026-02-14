import { NextRequest, NextResponse } from 'next/server';
import { runSimulation } from '@/lib/simulation';
import type { RunSimulationRequest, RunSimulationResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: RunSimulationRequest = await request.json();

    // Validate request body
    if (!body.aiClone || !body.simulatedPersonality) {
      const response: RunSimulationResponse = {
        success: false,
        error: 'Both AI clone and simulated personality are required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const results = await runSimulation(body.aiClone, body.simulatedPersonality);

    const response: RunSimulationResponse = {
      success: true,
      results,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error running simulation:', error);

    const response: RunSimulationResponse = {
      success: false,
      error: error.message || 'Failed to run simulation',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
