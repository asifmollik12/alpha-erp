"use client"

import { Application, ApplicationStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";

const statuses: ApplicationStatus[] = ['New', 'In Progress', 'Submitted', 'Approved', 'Rejected'];

const statusConfig = {
    'New': { title: 'New', color: 'bg-blue-500' },
    'In Progress': { title: 'In Progress', color: 'bg-yellow-500' },
    'Submitted': { title: 'Submitted', color: 'bg-purple-500' },
    'Approved': { title: 'Approved', color: 'bg-accent' },
    'Rejected': { title: 'Rejected', color: 'bg-destructive' },
}

interface KanbanBoardProps {
    applications: Application[];
}

export function KanbanBoard({ applications }: KanbanBoardProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
            {statuses.map(status => (
                <div key={status} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 px-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${statusConfig[status].color}`} />
                        <h2 className="font-semibold text-lg">{statusConfig[status].title}</h2>
                        <span className="text-sm text-muted-foreground">({applications.filter(app => app.status === status).length})</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        {applications
                            .filter(app => app.status === status)
                            .map(app => (
                                <Card key={app.id} className="w-full">
                                    <CardHeader className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage data-ai-hint="person face" src={app.avatar} alt={app.clientName} />
                                                <AvatarFallback>{app.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className="text-base">{app.clientName}</CardTitle>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 space-y-2">
                                        <p className="text-sm font-medium">{app.visaType} - {app.destination}</p>
                                        <p className="text-xs text-muted-foreground">Last Update: {app.lastUpdate}</p>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}
