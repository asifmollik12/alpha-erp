"use client"

import { useClientState } from "@/hooks/use-client-state";
import { AgentTable } from "@/components/agents/agent-table";
import { columns } from "@/components/agents/columns";

export default function AgentsPage() {
  const { agents } = useClientState();

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Agent Management
        </h1>
        <p className="text-muted-foreground">
          View, search, and manage all your agents in one place.
        </p>
      </header>
      <AgentTable columns={columns} data={agents} />
    </div>
  );
}
