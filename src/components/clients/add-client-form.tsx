"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { Client } from "@/lib/types"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  country: z.string().min(1, { message: "Please select a country." }),
  visaType: z.string().min(1, { message: "Please select a visa type." }),
})

const countries = ["USA", "UK", "Canada", "Australia", "Germany"]
const visaTypes = ["Work Permit", "Student Visa", "Tourist Visa", "Permanent Resident"]

interface AddClientFormProps {
  setOpen: (open: boolean) => void;
}

export function AddClientForm({ setOpen }: AddClientFormProps) {
  const { toast } = useToast()
  const addClient = useClientState((state) => state.addClient)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      visaType: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newClient: Client = {
      id: new Date().getTime().toString(),
      ...values,
      status: 'New',
      appliedDate: new Date().toISOString().split('T')[0],
      avatar: `https://picsum.photos/seed/${Math.random()}/40/40`
    };
    addClient(newClient);
    toast({
      title: "Client Added",
      description: `${values.name} has been successfully added.`,
    })
    setOpen(false);
    form.reset();
  }

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
        <div className="flex justify-end pt-4">
            <Button type="submit">Save Client</Button>
        </div>
      </form>
    </Form>
  )
}
