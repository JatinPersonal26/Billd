"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "@/lib/AxiosInstance";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CompanyForm, companySchema } from "@/lib/Schema/company";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCompanyPayload, CreateCompanyResponse } from "@/app/types/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
export function AddCompany() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CompanyForm>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      fis: "",
      address: "",
      phone: undefined,
      isRegular:false
    },
  });

  const createCompanyMutation = useMutation({
    mutationFn: async (data: CreateCompanyPayload) => {
      const res = await axios.post<CreateCompanyResponse>("/company", data);
      return res.data.data[0];
    },
    onSuccess: (company) => {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success(`${company.name} saved successfully`);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to save company");
    },
  });

  const onSubmit = async (data: CompanyForm) => {
    try {
      createCompanyMutation.mutate(data);
    } catch (error: any) {
      if (error.response) {
        console.error("❌ Supabase error:", error.response.data.error);
      } else {
        console.error("❌ Network error:", error.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Company</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>
                Enter the details to create a new company.
              </DialogDescription>
            </DialogHeader>

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FIS */}
            <FormField
              control={form.control}
              name="fis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FIS</FormLabel>
                  <FormControl>
                    <Input placeholder="FIS Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRegular"
              defaultValue={false}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                   <FormLabel className="text-sm font-normal">
                    Regular Company ?
                  </FormLabel>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 border rounded text-primary"
                    />
                  </FormControl>
                 
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+91 xxxxxxxxxx"
                      type="tel"
                      inputMode="numeric"
                      maxLength={15}
                      {...field}
                      onChange={(e) => {
                        let value = e.target.value;

                        value = value.replace(/[^\d+]/g, "");
                        if (value.startsWith("+")) {
                          value = "+" + value.slice(1).replace(/\D/g, "");
                        } else {
                          value = value.replace(/\D/g, "");
                        }

                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose onClick={() => form.reset()} asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="min-w-40">
                {" "}
                {createCompanyMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save Company"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
