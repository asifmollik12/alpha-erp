export default function AgentsPage() {
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
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no agents yet
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start by adding a new agent.
          </p>
        </div>
      </div>
    </div>
  );
}
