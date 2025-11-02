import { create } from 'zustand';
import { Client, Agent } from '@/lib/types';
import { initialClients, initialAgents } from '@/lib/data';

interface AppState {
  clients: Client[];
  addClient: (client: Client) => void;
  deleteClients: (clientIds: string[]) => void;
  agents: Agent[];
  addAgent: (agent: Agent) => void;
  assignClientToAgent: (agentId: string, clientId: string) => void;
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
  addAgent: (agent) =>
    set((state) => ({ agents: [agent, ...state.agents] })),
  assignClientToAgent: (agentId, clientId) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              assignedClients: [...(agent.assignedClients || []), clientId],
              totalFiles: (agent.assignedClients?.length || 0) + 1,
            }
          : agent
      ),
      clients: state.clients.map((client) =>
        client.id === clientId ? { ...client, agentId } : client
      ),
    })),
}));
