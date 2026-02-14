import { NextRequest, NextResponse } from 'next/server';
import type { VerifyUnlockRequest, VerifyUnlockResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: VerifyUnlockRequest = await request.json();

    // Validate request body
    if (!body.txHash || !body.walletAddress) {
      const response: VerifyUnlockResponse = {
        success: false,
        verified: false,
        error: 'Transaction hash and wallet address are required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // For demo purposes, we'll mock the verification
    // In production, this would verify the transaction on SKALE testnet
    const isValid = body.txHash.startsWith('0x') && body.txHash.length >= 10;

    if (!isValid) {
      const response: VerifyUnlockResponse = {
        success: false,
        verified: false,
        error: 'Invalid transaction hash',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response: VerifyUnlockResponse = {
      success: true,
      verified: true,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error verifying unlock:', error);

    const response: VerifyUnlockResponse = {
      success: false,
      verified: false,
      error: error.message || 'Failed to verify unlock',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
