"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddClientForm } from "./add-client-form"
import React from "react"
import { useClientState } from "@/hooks/use-client-state"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { deleteClients } = useClientState();
  const numSelected = table.getFilteredSelectedRowModel().rows.length
  const [isAddClientOpen, setIsAddClientOpen] = React.useState(false);

  const handleDelete = () => {
    const selectedIds = table.getFilteredSelectedRowModel().rows.map(row => (row.original as { id: string }).id);
    deleteClients(selectedIds);
    table.resetRowSelection();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by client name..."
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
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete ({numSelected})</span>
          </Button>
        )}
      </div>
      <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-9 gap-1">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Add Client</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Enter the details of the new client. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <AddClientForm setOpen={setIsAddClientOpen} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
