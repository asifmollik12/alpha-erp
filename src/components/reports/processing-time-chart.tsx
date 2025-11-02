"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getProcessingTimeData } from "@/lib/data"

const chartData = getProcessingTimeData()

const chartConfig = {
  days: {
    label: "Days",
    color: "hsl(var(--chart-1))",
  },
}

export function ProcessingTimeChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData} margin={{ top: 20, left: -20, right: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="visa"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
         <YAxis
          tickFormatter={(value) => `${value}d`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="days" fill="var(--color-days)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
