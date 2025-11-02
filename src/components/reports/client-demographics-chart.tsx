"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getClientDemographicsData } from "@/lib/data"

const chartData = getClientDemographicsData()

const chartConfig = {
  count: {
    label: "Clients",
    color: "hsl(var(--chart-2))",
  },
}

export function ClientDemographicsChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ top: 20, left: 10, right: 20 }}>
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="country"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <XAxis dataKey="count" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="count" layout="vertical" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
