"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableBodyWithLastChildBorder,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableRowWithoutBottomBorder,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/AxiosInstance";
import { debounce } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { Company, Document } from "../types/types";
import NothingFound from "@/components/custom/NothingFound";
import { Separator } from "@/components/ui/separator";
import { Template_Types } from "@/lib/TemplateRegistry";
import { Button } from "@/components/ui/button";
import { Download } from "@/components/icons/Download";
import { DownloadIcon, Wand } from "lucide-react";
import { Bolt } from "@/components/icons/Bolt";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { handleDownload } from "@/lib/FileSaver";
import { Checkbox } from "@/components/ui/checkbox";
import { MotionIcon } from "@/components/custom/MotionIcon";
import { Cable } from "@/components/icons/Cable";
import { useTheme } from "next-themes";

const page = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [amountSearch, setAmountSearch] = useState("");
  const [shipSearch, setShipSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [groupingEnabled, setGroupingEnabled] = useState(false);
  const [animateGroupingBtn, setAnimateGroupingBtn] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const effectiveTheme = theme === "system" ? resolvedTheme : theme;

  const debouncedAmount = useMemo(() => amountSearch, [amountSearch]);
  const debouncedShip = useMemo(() => shipSearch, [shipSearch]);

  const { data: allCompanies = [], isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async (): Promise<Company[]> => {
      const res = await axiosInstance.get("/company");
      return res.data.data;
    },
  });

  const {
    data: documents,
    error,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        if (selectedCompany) params.append("companyName", selectedCompany);
        if (debouncedAmount) params.append("amount", debouncedAmount);
        if (debouncedShip) params.append("shipName", debouncedShip);
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        const response = await fetch(`/api/pdf?${params.toString()}`);

        const json: { data: Document[]; total: number; message?: string } =
          await response.json();

        if (!response.ok) {
          console.error("API error response:", json);
          throw new Error(json?.message || "Failed to fetch documents");
        }

        return json;
      } catch (err) {
        console.error("Error in useQuery:", err);
        throw err;
      }
    },
  });

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch();
    }, 300),
    [refetch]
  );

  const NothingFoundComponent = () => {
    return (
      <TableRow>
        <TableCell colSpan={5} className="">
          {" "}
          <div className="flex flex-col gap-1 justify-center items-center">
            <NothingFound />
            <Separator className="mb-5 mt-5" />
            <span>Try different search options</span>
            <span>OR</span>
            <button
              onClick={clearOptions}
              className="mt-2 border-1 bg-blue-400 inline-flex items-center px-4 py-1.5 text-sm font-mediu rounded-md transition hover:cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  function clearOptions() {
    setSelectedCompany("");
    setAmountSearch("");
    setShipSearch("");
  }

  useEffect(() => {
    debouncedRefetch();
    return () => debouncedRefetch.cancel();
  }, [
    selectedCompany,
    amountSearch,
    shipSearch,
    debouncedRefetch,
    limit,
    page,
  ]);

  return (
    <div className="p-3 flex flex-col gap-10 pl-6">
      <div>
        <h1 className="text-5xl font-extrabold">Dashboard</h1>
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="w-60">
          <label className="block text-sm mb-1">Company</label>
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="c">All</SelectItem>
              {allCompanies.map((company) => (
                <SelectItem key={company.fis} value={company.name}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-40">
          <label className="block text-sm mb-1">Search Amount</label>
          <Input
            type="text"
            placeholder="₹xxxxx"
            value={amountSearch}
            onChange={(e) => setAmountSearch(e.target.value)}
          />
        </div>

        <div className="w-40">
          <label className="block text-sm mb-1">Search Ship Name</label>
          <Input
            type="text"
            placeholder="Alpha Corp"
            value={shipSearch}
            onChange={(e) => setShipSearch(e.target.value)}
          />
        </div>

        <Label
          onMouseEnter={() => setAnimateGroupingBtn(true)}
          onMouseLeave={() => setAnimateGroupingBtn(false)}
          className="hover:cursor-pointer hover:bg-accent/50 text-xs flex items-start gap-3 rounded-lg border p-2 has-[[aria-checked=false]]:border-dashed  has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
        >
          <Checkbox
            id="toggle-2"
            checked={groupingEnabled}
            onCheckedChange={(checked) => setGroupingEnabled(!!checked)}
            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          />
          <div className="grid gap-1.5 font-xs">
            <div className="flex gap-2 items-center">
              <Cable
                animateState={animateGroupingBtn ? "animate" : "normal"}
                stroke={effectiveTheme !== "dark" ? "black" : "white"}
              />
              <p className="text-sm leading-none font-xs">Enable grouping</p>
            </div>
            <p className="text-muted-foreground text-xs">
              You can enable or disable grouping at any time.
            </p>
          </div>
        </Label>
        <button
          onClick={clearOptions}
          className="mt-2 border-1 bg-blue-400 inline-flex items-center px-4 py-1.5 text-sm font-mediu rounded-md transition  hover:cursor-pointer"
        >
          Clear Filters
        </button>
      </div>
      <DocumentTable
        isLoading={isPending}
        documents={documents}
        NothingFoundComponent={NothingFoundComponent}
        clearOptions={clearOptions}
        setPage={setPage}
        page={page}
        limit={limit}
        setLimit={setLimit}
        groupingEnabled={groupingEnabled}
      />
    </div>
  );
};

function DocumentTable({
  isLoading,
  documents,
  NothingFoundComponent,
  clearOptions,
  setPage,
  page,
  limit,
  setLimit,
  groupingEnabled,
}: {
  isLoading: boolean;
  documents: { data: Document[]; total: number; message?: string } | undefined;
  NothingFoundComponent: React.FC;
  clearOptions: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  groupingEnabled: boolean;
}) {
  const [downloading, setDownloading] = useState(false);
  const groupedDocuments = useMemo(() => {
    if (!documents?.data) return {};
    return documents.data.reduce<Record<string, Document[]>>((acc, doc) => {
      const groupKey = doc.generation_id ?? "unknown";
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(doc);
      return acc;
    }, {});
  }, [documents?.data]);
  if (isLoading) {
    return <DocumentTableSkeleton />;
  }

  const COLOR_CLASSES = [
    "border-rose-300",
    "border-sky-300",
    "border-lime-300",
    "border-amber-300",
    "border-violet-300",
    "border-fuchsia-300",
    "border-teal-300",
    "border-indigo-300",
    "border-orange-300",
    "border-cyan-300",
  ];

  return (
    <Table border={1}>
      <TableCaption>A list of your recent documents.</TableCaption>
      <TableHeader>
        <TableRow className="bg-white text-black">
          <TableHead className="w-[100px] text-black">File</TableHead>
          <TableHead className="text-black">ComanyName</TableHead>
          <TableHead className="text-black">BillType</TableHead>
          <TableHead className="text-black">isPrimary</TableHead>
          <TableHead className="text-black">Download</TableHead>
        </TableRow>
      </TableHeader>
      <TableBodyWithLastChildBorder className="">
        {!documents || documents?.data?.length === 0 ? (
          <NothingFoundComponent />
        ) : (
          Object.entries(
            documents.data.reduce<Record<string, Document[]>>((acc, doc) => {
              const key = doc.generation_id ?? "ungrouped";
              if (!acc[key]) acc[key] = [];
              acc[key].push(doc);
              return acc;
            }, {})
          ).map(([generationId, group], index) => {
            console.log(generationId, group);
            const colorClass = COLOR_CLASSES[index % COLOR_CLASSES.length];

            return (
              <React.Fragment key={generationId}>
                {group.map((doc, i) => {
                  console.log(doc, i);

                  return (
                    <TableRowWithoutBottomBorder
                      key={doc.file_name || i}
                      className={
                        groupingEnabled
                          ? `border-l-4 border-r-4 ${
                              i === 0 ? "border-t-4" : ""
                            } ${
                              i === group.length - 1 ? "border-b-4" : ""
                            } ${colorClass}`
                          : ""
                      }
                    >
                      <TableCell className="font-medium">
                        {doc.file_name}
                      </TableCell>
                      <TableCell>{doc.company_name}</TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          {doc.bill_type === Template_Types.Bill ? (
                            <span className="px-2 rounded-full text-[10px] font-thin shadow-md bg-[#1F1E41] text-[#C2B8FF] border-1 border-[#C2B8FF]">
                              {doc.bill_type}
                            </span>
                          ) : (
                            <span className="px-2 rounded-full text-[10px] font-thin shadow-md bg-[#2E4148] text-[#A3EEEF] border-1 border-[#A3EEEF]">
                              {doc.bill_type}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          {doc.is_primary && (
                            <span className="px-2 rounded-full text-[10px] font-thin bg-[#343726] text-[#E4E669] border-1 border-[#E4E669] shadow-md">
                              Primary
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <Button
                            onClick={() =>
                              handleDownload(doc, downloading, setDownloading)
                            }
                            className="cursor-pointer flex items-center border-1 max-w-fit"
                          >
                            <DownloadIcon size={10} />
                            <span className="text-xs">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRowWithoutBottomBorder>
                  );
                })}
              </React.Fragment>
            );
          })
        )}
      </TableBodyWithLastChildBorder>

      <TableFooter>
        <TableCell colSpan={5}>
          <div className="flex items-center justify-end">
            {documents && (
              <div className="flex justify-center gap-2 items-center">
                <Label>Page Limit : </Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={limit}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    console.log(value);
                    if (value >= 0 && value <= 100) {
                      setLimit(value);
                    } else {
                      if (value < 0) setLimit(5);
                      else if (value > 100) setLimit(100);
                      toast("Page limit should be between 0 and 100!");
                    }
                  }}
                />
                <Button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  Prev
                </Button>
                <span className="px-2">Page {page}</span>
                <Button
                  onClick={() =>
                    setPage((p) => (p * limit < documents.total ? p + 1 : p))
                  }
                  disabled={page * limit >= documents.total}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </TableCell>
      </TableFooter>
    </Table>
  );
}
function DocumentTableSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-1/3" />
      <div className="space-y-2 border rounded-md p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex justify-between gap-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[90px]" />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
