import { NextRequest, NextResponse } from 'next/server';
import { mimoClient } from '@/lib/ai/mimo-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, message, systemPrompt, capabilities, history } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Execute agent through MiMo API
    const result = await mimoClient.executeAgent(
      {
        id: agentId || 'demo',
        name: 'Agent',
        systemPrompt: systemPrompt || 'You are a helpful AI assistant.',
        capabilities: capabilities || ['reasoning'],
        maxTokens: 4096,
        temperature: 0.7,
      },
      message,
      history || []
    );

    return NextResponse.json({
      response: result.response,
      tokensUsed: result.tokensUsed,
      model: result.model,
      agentId,
    });
  } catch (error: unknown) {
    console.error('Agent execution error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
