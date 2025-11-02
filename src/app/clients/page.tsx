import { getClients } from "@/lib/data";
import { ClientTable } from "@/components/clients/client-table";
import { columns } from "@/components/clients/columns";

export default function ClientsPage() {
  const clients = getClients();

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Client Management
        </h1>
        <p className="text-muted-foreground">
          View, search, and manage all your clients in one place.
        </p>
      </header>
      <ClientTable columns={columns} data={clients} />
    </div>
  );
}
