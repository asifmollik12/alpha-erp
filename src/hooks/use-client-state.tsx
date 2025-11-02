import { create } from 'zustand';
import { Client } from '@/lib/types';
import { initialClients } from '@/lib/data';

interface ClientState {
  clients: Client[];
  addClient: (client: Client) => void;
  deleteClients: (clientIds: string[]) => void;
}

export const useClientState = create<ClientState>((set) => ({
  clients: initialClients,
  addClient: (client) =>
    set((state) => ({ clients: [...state.clients, client] })),
  deleteClients: (clientIds) =>
    set((state) => ({
      clients: state.clients.filter((client) => !clientIds.includes(client.id)),
    })),
}));
