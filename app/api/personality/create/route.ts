import { NextRequest, NextResponse } from 'next/server';
import { generatePersonality } from '@/lib/personality';
import type {
  CreatePersonalityRequest,
  CreatePersonalityResponse,
} from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreatePersonalityRequest = await request.json();

    // Validate request body
    if (!body.inputType || !body.content || body.content.trim().length < 10) {
      const response: CreatePersonalityResponse = {
        success: false,
        error: 'Invalid input: content must be at least 10 characters',
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!['chat', 'bio', 'description'].includes(body.inputType)) {
      const response: CreatePersonalityResponse = {
        success: false,
        error: 'Invalid input type',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const personality = await generatePersonality(body);

    const response: CreatePersonalityResponse = {
      success: true,
      personality,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error creating personality:', error);

    const response: CreatePersonalityResponse = {
      success: false,
      error: error.message || 'Failed to create personality',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
