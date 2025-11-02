"use client"

import { useParams } from "next/navigation";
import { useClientState } from "@/hooks/use-client-state";
import { ClientTable } from "@/components/clients/client-table";
import { columns } from "@/components/clients/columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AgentDetailsPage() {
  const { agentId } = useParams();
  const { agents, clients } = useClientState();

  const agent = agents.find((a) => a.id === agentId);
  const assignedClients = agent?.assignedClients
    ? clients.filter((c) => agent.assignedClients?.includes(c.id))
    : [];

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Agent not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/agents">
                <ArrowLeft className="h-4 w-4" />
            </Link>
        </Button>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage data-ai-hint="person face" src={agent.avatar} alt={agent.name} />
            <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {agent.name}
            </h1>
            <p className="text-muted-foreground">{agent.email}</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Country
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.country}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Visa Specialization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.visaType}</div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.totalFiles}</div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Commission
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xl font-bold text-green-600">Paid: ${agent.paid.toLocaleString()}</div>
                <div className="text-lg font-bold text-red-600">Due: ${agent.due.toLocaleString()}</div>
            </CardContent>
          </Card>
      </div>

      <header className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">
          Assigned Clients
        </h2>
        <p className="text-muted-foreground">
          View and manage clients assigned to {agent.name}.
        </p>
      </header>
      <ClientTable columns={columns} data={assignedClients} />
    </div>
  );
}
