import { NextRequest, NextResponse } from 'next/server';
import { generateAIClone } from '@/lib/aiClone';
import type { CreateCloneRequest, CreateCloneResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreateCloneRequest = await request.json();

    // Validate request body
    if (
      !body.name ||
      !body.personalityType ||
      !body.interests ||
      body.interests.length === 0 ||
      !body.communicationStyle ||
      !body.socialGoals
    ) {
      const response: CreateCloneResponse = {
        success: false,
        error: 'All fields are required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const clone = await generateAIClone(body);

    const response: CreateCloneResponse = {
      success: true,
      clone,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error creating AI clone:', error);

    const response: CreateCloneResponse = {
      success: false,
      error: error.message || 'Failed to create AI clone',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
