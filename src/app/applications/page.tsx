"use client"

import { KanbanBoard } from "@/components/applications/kanban-board";
import { useClientState } from "@/hooks/use-client-state";
import { getApplications } from "@/lib/data";

export default function ApplicationsPage() {
  const { clients } = useClientState();
  const applications = getApplications(clients);

  return (
    <div className="space-y-4">
       <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Application Tracking
        </h1>
        <p className="text-muted-foreground">
          Manage and track all visa applications in one Kanban board.
        </p>
      </header>
      <KanbanBoard applications={applications} />
    </div>
  );
}
