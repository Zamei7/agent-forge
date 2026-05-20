/**
 * Xiaomi MiMo V2.5 API Client for AgentForge
 * Supports: Reasoning, Multimodal, and Voice synthesis models
 */

export interface MiMoConfig {
  apiKey: string;
  baseUrl: string;
  reasoningModel: string;
  multimodalModel: string;
  voiceModel: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | ContentPart[];
}

export interface ContentPart {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: { url: string };
}

export interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: { role: string; content: string };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface VoiceSynthesisRequest {
  text: string;
  voice?: string;
  speed?: number;
  format?: 'mp3' | 'wav' | 'ogg';
}

export interface AgentConfig {
  id: string;
  name: string;
  systemPrompt: string;
  capabilities: ('reasoning' | 'multimodal' | 'voice')[];
  maxTokens: number;
  temperature: number;
  tools?: AgentTool[];
}

export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

const DEFAULT_CONFIG: MiMoConfig = {
  apiKey: process.env.MIMO_API_KEY || '',
  baseUrl: process.env.MIMO_BASE_URL || 'https://api.xiaomimimo.com/v1',
  reasoningModel: process.env.MIMO_REASONING_MODEL || 'mimo-v2.5-pro',
  multimodalModel: process.env.MIMO_MULTIMODAL_MODEL || 'mimo-v2.5-vision',
  voiceModel: process.env.MIMO_VOICE_MODEL || 'mimo-v2.5-tts',
};

export class MiMoClient {
  private config: MiMoConfig;

  constructor(config: Partial<MiMoConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Reasoning model — complex multi-step tasks, code analysis, planning
   */
  async reasoning(
    messages: ChatMessage[],
    options: {
      maxTokens?: number;
      temperature?: number;
      stream?: boolean;
    } = {}
  ): Promise<ChatCompletion> {
    return this.chat(this.config.reasoningModel, messages, options);
  }

  /**
   * Multimodal model — image understanding, visual analysis
   */
  async multimodal(
    messages: ChatMessage[],
    options: {
      maxTokens?: number;
      temperature?: number;
    } = {}
  ): Promise<ChatCompletion> {
    return this.chat(this.config.multimodalModel, messages, options);
  }

  /**
   * Voice synthesis — text-to-speech
   */
  async synthesizeVoice(request: VoiceSynthesisRequest): Promise<ArrayBuffer> {
    const response = await fetch(`${this.config.baseUrl}/audio/speech`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.voiceModel,
        input: request.text,
        voice: request.voice || 'alloy',
        speed: request.speed || 1.0,
        response_format: request.format || 'mp3',
      }),
    });

    if (!response.ok) {
      throw new Error(`Voice synthesis failed: ${response.statusText}`);
    }

    return response.arrayBuffer();
  }

  /**
   * Generic chat completion
   */
  async chat(
    model: string,
    messages: ChatMessage[],
    options: {
      maxTokens?: number;
      temperature?: number;
      stream?: boolean;
    } = {}
  ): Promise<ChatCompletion> {
    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: options.maxTokens || 4096,
        temperature: options.temperature ?? 0.7,
        stream: options.stream ?? false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`MiMo API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Execute an agent with a specific configuration
   */
  async executeAgent(
    agentConfig: AgentConfig,
    userMessage: string,
    context: ChatMessage[] = []
  ): Promise<{
    response: string;
    tokensUsed: number;
    model: string;
  }> {
    const messages: ChatMessage[] = [
      { role: 'system', content: agentConfig.systemPrompt },
      ...context,
      { role: 'user', content: userMessage },
    ];

    // Route to appropriate model based on capabilities
    let result: ChatCompletion;
    if (agentConfig.capabilities.includes('reasoning')) {
      result = await this.reasoning(messages, {
        maxTokens: agentConfig.maxTokens,
        temperature: agentConfig.temperature,
      });
    } else {
      result = await this.chat(this.config.reasoningModel, messages, {
        maxTokens: agentConfig.maxTokens,
        temperature: agentConfig.temperature,
      });
    }

    return {
      response: result.choices[0].message.content,
      tokensUsed: result.usage.total_tokens,
      model: result.model,
    };
  }
}

// Singleton instance
export const mimoClient = new MiMoClient();
