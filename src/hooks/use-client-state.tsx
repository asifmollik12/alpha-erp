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
       // Also unassign from agents
      agents: state.agents.map(agent => ({
        ...agent,
        assignedClients: agent.assignedClients?.filter(id => !clientIds.includes(id)),
        totalFiles: agent.assignedClients?.filter(id => !clientIds.includes(id)).length || 0,
      }))
    })),
  agents: initialAgents,
  addAgent: (agent) =>
    set((state) => ({ agents: [agent, ...state.agents] })),
  assignClientToAgent: (agentId, clientId) =>
    set((state) => {
      // First, unassign the client from any previous agent
      const updatedAgents = state.agents.map((agent) => {
        if (agent.assignedClients?.includes(clientId)) {
          return {
            ...agent,
            assignedClients: agent.assignedClients.filter(id => id !== clientId),
            totalFiles: (agent.assignedClients.length - 1),
          }
        }
        return agent;
      });

      // Then, assign the client to the new agent
      const finalAgents = updatedAgents.map(agent => {
        if (agent.id === agentId) {
          const alreadyAssigned = agent.assignedClients?.includes(clientId);
          if (alreadyAssigned) return agent; // Do not add if already present

          const newAssignedClients = [...(agent.assignedClients || []), clientId];
          return {
            ...agent,
            assignedClients: newAssignedClients,
            totalFiles: newAssignedClients.length,
          }
        }
        return agent;
      });

      // Finally, update the agentId on the client record
      const updatedClients = state.clients.map((client) =>
        client.id === clientId ? { ...client, agentId: agentId } : client
      );
      
      return {
        agents: finalAgents,
        clients: updatedClients,
      }
    }),
}));
