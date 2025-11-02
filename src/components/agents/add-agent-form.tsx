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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useClientState } from "@/hooks/use-client-state"
import { Agent } from "@/lib/types"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  country: z.string().min(1, { message: "Please select a country." }),
  visaType: z.string().min(1, { message: "Please select a visa type." }),
  assignedClients: z.array(z.string()).optional(),
})

const countries = ["USA", "UK", "Canada", "Australia", "Germany"]
const visaTypes = ["Work Permit", "Student Visa", "Tourist Visa", "Permanent Resident"]

interface AddAgentFormProps {
  setOpen: (open: boolean) => void;
}

export function AddAgentForm({ setOpen }: AddAgentFormProps) {
  const { toast } = useToast()
  const { clients, addAgent, assignClientToAgent } = useClientState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      visaType: "",
      assignedClients: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newAgentId = new Date().getTime().toString();
    const assignedClientIds = values.assignedClients || [];
    
    const newAgent: Agent = {
      id: newAgentId,
      name: values.name,
      email: values.email,
      country: values.country,
      visaType: values.visaType,
      assignedClients: assignedClientIds,
      due: 0, 
      paid: 0,
      totalFiles: assignedClientIds.length,
      avatar: `https://picsum.photos/seed/${newAgentId}/40/40`
    };
    addAgent(newAgent);

    assignedClientIds.forEach(clientId => {
        assignClientToAgent(newAgentId, clientId);
    });

    toast({
      title: "Agent Added",
      description: `${values.name} has been successfully added.`,
    })
    setOpen(false);
    form.reset();
  }

  const selectedClients = form.watch("assignedClients") || [];
  const clientOptions = clients.map(c => ({ value: c.id, label: c.name }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visa Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a visa type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {visaTypes.map(visaType => (
                      <SelectItem key={visaType} value={visaType}>{visaType}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="assignedClients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign Clients</FormLabel>
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
                            "Select clients"
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
            <Button type="submit">Save Agent</Button>
        </div>
      </form>
    </Form>
  )
}
