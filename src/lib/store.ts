import { create } from 'zustand';

export interface Agent {
  id: number;
  name: string;
  description: string;
  category: string;
  creator: string;
  rating: number;
  invocations: number;
  pricePerCall: string;
  capabilities: string[];
  isActive: boolean;
  metadataURI: string;
}

export interface UserLicense {
  licenseId: number;
  agentId: number;
  licenseType: string;
  invocationsUsed: number;
  maxInvocations: number;
  validUntil: number;
  isActive: boolean;
}

interface AppState {
  // Marketplace
  agents: Agent[];
  selectedCategory: string | null;
  searchQuery: string;
  isLoading: boolean;

  // User
  userLicenses: UserLicense[];
  userAgents: Agent[];

  // Actions
  setAgents: (agents: Agent[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  setUserLicenses: (licenses: UserLicense[]) => void;
  setUserAgents: (agents: Agent[]) => void;
  addAgent: (agent: Agent) => void;
}

export const useAppStore = create<AppState>((set) => ({
  agents: [],
  selectedCategory: null,
  searchQuery: '',
  isLoading: false,
  userLicenses: [],
  userAgents: [],

  setAgents: (agents) => set({ agents }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setUserLicenses: (licenses) => set({ userLicenses: licenses }),
  setUserAgents: (agents) => set({ userAgents: agents }),
  addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
}));
