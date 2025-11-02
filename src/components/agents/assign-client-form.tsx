"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { useClientState } from "@/hooks/use-client-state"
import { Agent, Client } from "@/lib/types"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"

const formSchema = z.object({
  clientsToAssign: z.array(z.string()).min(1, { message: "Please select at least one client." }),
})

interface AssignClientFormProps {
  setOpen: (open: boolean) => void;
  agent: Agent;
}

export function AssignClientForm({ setOpen, agent }: AssignClientFormProps) {
  const { toast } = useToast()
  const { clients, assignClientToAgent } = useClientState();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientsToAssign: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.clientsToAssign.forEach(clientId => {
        assignClientToAgent(agent.id, clientId);
    });

    toast({
      title: "Clients Assigned",
      description: `${values.clientsToAssign.length} client(s) have been assigned to ${agent.name}.`,
    })
    setOpen(false);
    form.reset();
  }
  
  const unassignedClients = clients.filter(c => c.agentId !== agent.id);
  const clientOptions = unassignedClients.map(c => ({ value: c.id, label: c.name }));
  const selectedClients = form.watch("clientsToAssign") || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="clientsToAssign"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Clients</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between h-auto",
                          !field.value?.length && "text-muted-foreground"
                        )}
                      >
                        <div className="flex gap-1 flex-wrap">
                          {selectedClients.length > 0 ? (
                            clients
                              .filter(c => selectedClients.includes(c.id))
                              .map(client => (
                                <Badge
                                  variant="secondary"
                                  key={client.id}
                                  className="mr-1 mb-1"
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      const newValue = selectedClients.filter(id => id !== client.id);
                                      field.onChange(newValue);
                                  }}
                                >
                                  {client.name}
                                  <X className="h-3 w-3 ml-1" />
                                </Badge>
                              ))
                          ) : (
                            "Select clients to assign..."
                          )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput placeholder="Search client..." />
                      <CommandEmpty>No client found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {clientOptions.map((option) => (
                            <CommandItem
                              value={option.label}
                              key={option.value}
                              onSelect={() => {
                                const currentValue = field.value || [];
                                const newValue = currentValue.includes(option.value)
                                  ? currentValue.filter(v => v !== option.value)
                                  : [...currentValue, option.value];
                                field.onChange(newValue);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedClients.includes(option.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {option.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
            <Button type="submit">Assign Selected Clients</Button>
        </div>
      </form>
    </Form>
  )
}
