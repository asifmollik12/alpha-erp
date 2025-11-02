"use client"

import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"
import { getApplicationStatusCounts } from "@/lib/data"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { useClientState } from "@/hooks/use-client-state"

const chartConfig = {
  count: {
    label: "Applications",
  },
  New: {
    label: "New",
    color: "hsl(var(--chart-1))",
  },
  "In Progress": {
    label: "In Progress",
    color: "hsl(var(--chart-5))",
  },
  Submitted: {
    label: "Submitted",
    color: "hsl(var(--chart-4))",
  },
  Approved: {
    label: "Approved",
    color: "hsl(var(--chart-2))",
  },
  Rejected: {
    label: "Rejected",
    color: "hsl(var(--destructive))",
  },
};

const colorMapping: Record<string, string> = {
    'New': 'hsl(var(--chart-1))',
    'In Progress': 'hsl(var(--chart-5))',
    'Submitted': 'hsl(var(--chart-4))',
    'Approved': 'hsl(var(--chart-2))',
    'Rejected': 'hsl(var(--destructive))',
}

export function ApplicationStatusChart() {
  const { clients } = useClientState();
  const chartData = getApplicationStatusCounts(clients);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[300px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="status"
          innerRadius={60}
          strokeWidth={5}
        >
          {chartData.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={colorMapping[entry.status]} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="status" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
