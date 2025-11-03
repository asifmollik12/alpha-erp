export default function ExpensePage() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Expense Management
        </h1>
        <p className="text-muted-foreground">
          Track and manage all your expenses.
        </p>
      </header>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-96">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no expenses
          </h3>
          <p className="text-sm text-muted-foreground">
            Start by adding a new expense record.
          </p>
        </div>
      </div>
    </div>
  );
}
