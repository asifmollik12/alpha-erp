"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SuccessRateChart } from "@/components/reports/success-rate-chart";
import { ProcessingTimeChart } from "@/components/reports/processing-time-chart";
import { ClientDemographicsChart } from "@/components/reports/client-demographics-chart";

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Reporting & Analytics
        </h1>
        <p className="text-muted-foreground">
          Gain insights into your visa consultancy's performance.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application Success Rate</CardTitle>
            <CardDescription>A breakdown of application outcomes.</CardDescription>
          </CardHeader>
          <CardContent>
            <SuccessRateChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Processing Time</CardTitle>
            <CardDescription>Average time in days per visa type.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProcessingTimeChart />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Client Demographics</CardTitle>
            <CardDescription>Distribution of clients by country.</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientDemographicsChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
