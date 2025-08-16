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
import { Check, Cross, X } from "lucide-react";

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
              <TableHead className="text-black">Abbreviation</TableHead>
              <TableHead className="text-black">Phone No</TableHead>
              <TableHead className="text-black">Company Type</TableHead>
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
                  <TableCell>
                    <Skeleton className="h-4 w-60" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-60" />
                  </TableCell>
                </TableRow>
              ))}

            {isSuccess &&
              companies?.map((company) => (
                <TableRow key={company.name}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.fis}</TableCell>
                  <TableCell>{company.abr}</TableCell>
                  <TableCell>{company.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {company.isRegular ? (
                        <span className="px-2 rounded-full text-xs font-medium bg-[#343726] text-[#9ff0ba] border border-[#69e688] shadow-sm flex items-center">
                          Regular
                        </span>
                      ) : (
                        <span className="px-2 txext-xs rounded-full text-xs font-medium bg-[#343726] text-[#E4E669] border border-[#E4E669] shadow-sm flex items-center">
                          Composite
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{company.address}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default index;
