"use client"

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  getRecentApplications,
  getStats
} from "@/lib/data";
import { ApplicationStatusChart } from "@/components/reports/application-status-chart";
import { useClientState } from "@/hooks/use-client-state"

export default function Dashboard() {
  const { clients } = useClientState();
  const stats = getStats(clients);
  const recentApplications = getRecentApplications(clients);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Clients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
              <p className="text-xs text-muted-foreground">
                {stats.newClientsThisMonth > 0 ? `+${stats.newClientsThisMonth}` : stats.newClientsThisMonth} from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Applications in Progress
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgressApplications}</div>
              <p className="text-xs text-muted-foreground">
                Currently active applications
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                Based on all completed applications
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgProcessingTimeDays} days</div>
              <p className="text-xs text-muted-foreground">
                For all completed applications
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  An overview of the most recent visa applications.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>
                      Visa Type
                    </TableHead>
                    <TableHead>
                      Status
                    </TableHead>
                    <TableHead>
                      Last Update
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                           <Avatar className="hidden h-9 w-9 sm:flex">
                              <AvatarImage data-ai-hint="person face" src={app.avatar} alt="Avatar" />
                              <AvatarFallback>{app.clientName.charAt(0)}</AvatarFallback>
                            </Avatar>
                          <div className="font-medium">{app.clientName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {app.visaType}
                      </TableCell>
                       <TableCell>
                        <Badge variant={
                          app.status === 'Approved' ? 'default' : 
                          app.status === 'Rejected' ? 'destructive' : 'secondary'
                        } className={app.status === 'Approved' ? `bg-accent text-accent-foreground` : ''}>
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {app.lastUpdate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Application Statuses</CardTitle>
              <CardDescription>Breakdown of all current application statuses.</CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicationStatusChart />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
