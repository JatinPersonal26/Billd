"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AddCompany } from "@/components/custom/AddCompany";
import { useQuery } from "@tanstack/react-query";
import { Company } from "../types/types";
import axiosInstance from "@/lib/AxiosInstance";
import { Skeleton } from "@/components/ui/skeleton";
import NothingFound from "@/components/custom/NothingFound";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const index = () => {
  const {
    data: companies,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: async (): Promise<Company[]> => {
      const res = await axiosInstance.get("/company");
      return res.data.data;
    },
  });

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight text-balance">
        Manage Companies
      </h1>
      <div className="flex justify-end">
        <AddCompany />
      </div>
      <div>
        <Table border={1} className="border-3">
          <TableCaption>A list of your companies.</TableCaption>
          <TableHeader className="bg-[#f5f5f5] ">
            <TableRow className="text-black">
              <TableHead className="text-black">Company Name</TableHead>
              <TableHead className="text-black">FIS</TableHead>
              <TableHead className="text-black">Phone No</TableHead>
              <TableHead className="text-black">Address</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isSuccess && companies.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <NothingFound />
                </TableCell>
              </TableRow>
            )}
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-60" />
                  </TableCell>
                </TableRow>
              ))}

            {isSuccess &&
              companies?.map((invoice) => (
                <TableRow key={invoice.name}>
                  <TableCell className="font-medium">{invoice.name}</TableCell>
                  <TableCell>{invoice.fis}</TableCell>
                  <TableCell>{invoice.phone}</TableCell>
                  <TableCell>{invoice.address}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default index;
