import { create } from 'zustand';
import { Client, Agent } from '@/lib/types';
import { initialClients, initialAgents } from '@/lib/data';

interface AppState {
  clients: Client[];
  addClient: (client: Client) => void;
  deleteClients: (clientIds: string[]) => void;
  agents: Agent[];
}

export const useClientState = create<AppState>((set) => ({
  clients: initialClients,
  addClient: (client) =>
    set((state) => ({ clients: [client, ...state.clients] })),
  deleteClients: (clientIds) =>
    set((state) => ({
      clients: state.clients.filter((client) => !clientIds.includes(client.id)),
    })),
  agents: initialAgents,
}));
