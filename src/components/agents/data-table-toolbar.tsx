"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import React from "react"
import { AddAgentForm } from "./add-agent-form"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const numSelected = table.getFilteredSelectedRowModel().rows.length
  const [isAddAgentOpen, setIsAddAgentOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by agent name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-9 w-[150px] lg:w-[250px]"
        />
        {numSelected > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="h-9 gap-1"
            onClick={() => {}}
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete ({numSelected})</span>
          </Button>
        )}
      </div>
      <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
        <DialogTrigger asChild>
           <Button size="sm" className="h-9 gap-1">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Add Agent</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Agent</DialogTitle>
            <DialogDescription>
              Enter the details of the new agent and assign clients.
            </DialogDescription>
          </DialogHeader>
          <AddAgentForm setOpen={setIsAddAgentOpen} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
