"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DownloadDialog } from "@/components/custom/DownloadDialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup } from "@/components/ui/radio-group";

import axiosInstance from "@/lib/AxiosInstance";
import { Company, Document, PreviewPayload } from "./types/types";
import { billAndQuote, billAndQuoteSchema } from "@/lib/Schema/generator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Cross,
  DeleteIcon,
  Layers,
  Loader2,
  Loader2Icon,
  LoaderCircle,
  Plus,
  Trash2,
} from "lucide-react";
import TemplateRegistry, {
  generateBillPdfBlob,
  Template_Types,
  Template_Use,
} from "@/lib/TemplateRegistry";
import { BillOrQuoteFinalType } from "@/lib/BillAndQouteCalculator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { PreviewDialogContent } from "@/components/custom/PreviewDialogContent";
import { toast } from "sonner";
import { MotionIcon } from "@/components/custom/MotionIcon";
import { Boxes } from "@/components/icons/Boxes";
import { WandSparkles } from "@/components/icons/WandSparkle";

export default function Home() {
  const [companyCount, setCompanyCount] = useState(3);
  const [primaryCompany, setPrimaryCompany] = useState("");
  const [isPreviewMode, setPreviewMode] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<PreviewPayload[]>([]);
  const [isPreviewDialogOpen, setPreviewDialogOpen] = useState<boolean>(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [downloadDocuments, setDownloadDocuments] = useState<Document[]>([]);
  const [perCompanyQuote, setPerCompanyQuote] =
    useState<BillOrQuoteFinalType>();

  const { data: allCompanies = [], isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async (): Promise<Company[]> => {
      const res = await axiosInstance.get("/company");
      return res.data.data;
    },
  });

  const form = useForm<billAndQuote>({
    resolver: zodResolver(billAndQuoteSchema),
    defaultValues: {
      companyCount: 3,
      companies: [],
      items: [{ desc: "", deno: "", qty: 0, rate: 0, total: 0 }],
      primary: "",
      gst: 23,
      variationMin: 3,
      variationMax: 7,
      to: {
        name: "The Commanding Officer",
        address: "",
        ship: "",
        OrderNo: "",
        InvoiceNo: "",
       Dated: undefined, 
      },
    },
  });

  const { control, watch, setValue } = form;
  const { fields, replace } = useFieldArray({
    control,
    name: "companies",
  });

  const handleCountSubmit = () => {
    replace(
      Array.from({ length: companyCount }, () => ({
        name: "",
        fis: "",
        address: "",
        phone: "",
        abr:"",
        isRegular: false,
      }))
    );
    setValue("primary", "");
  };

  const {
    fields: itemFields,
    append: itemAppend,
    remove: itemRemove,
  } = useFieldArray({
    control,
    name: "items",
  });

  const previewBillAndQuoteMutation = useMutation({
    mutationFn: async (data: billAndQuote) => {
      const response = await axiosInstance.post(
        isPreviewMode ? "/preview" : "/pdf",
        data
      );
      return response.data;
    },
    onSuccess: (response) => {
      if (isPreviewMode) {
        console.log(
          "Preview response final bill:",
          response.finalBillOrQuote[0]
        );
        setPerCompanyQuote(response.finalBillOrQuote[0]);
        showPreview(response.finalBillOrQuote);
      } else {
        console.log(response.documents);
        toast.success("Documents saved successfully");

        const transformed = response.documents.map((doc: any) => {
          const date = new Date();
          const formattedDate = date
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            .replace(/ /g, "_");

          const fileName = `${doc.companyName.replace(/\s+/g, "_")}_${
            doc.type
          }_${doc.totalWithGst}_${formattedDate}.pdf`;

          return {
            company_name: doc.companyName,
            bill_type: doc.pdfType,
            is_primary: doc.isPrimary,
            url: doc.url,
            file_name: doc.fileName,
          };
        });

        setDownloadDocuments(transformed);
        setDownloadDialogOpen(true);
      }
    },
    onError: (error) => {
      if (isPreviewMode) {
        console.error("Error generating preview:", error);
        toast.error("Error generating preview.");
      } else {
        console.error("Error generating pdfs:", error);
        toast.error("Error generating pdfs.");
      }
    },
  });

  const showPreview = async (bills: BillOrQuoteFinalType[]) => {
    const billsPreviewPayload = await Promise.all(
      bills.map(async (bill) => {
        const blob = await generateBillPdfBlob(bill, bill.type);
        const pdfUrl = URL.createObjectURL(blob);

        return {
          pdfType: bill.type,
          isPrimary: bill.isPrimary,
          url: pdfUrl,
          companyName: bill.companyName,
        } as PreviewPayload;
      })
    );

    toast.success("Preview Ready!");

    setPreviewData(billsPreviewPayload);
    setPreviewDialogOpen(true);
  };

  const onSubmit = (data: billAndQuote) => {
    const selected = allCompanies.find((c) => c.fis === data.primary);
    console.log("Submitted Data:", data);
    console.log("Primary Company:", selected?.name);
    previewBillAndQuoteMutation.mutate(data);
  };

  const handlePreview = () => {
    setPreviewMode(true);
  };

  const handleSubmit = () => {
    setPreviewMode(false);
  };

  return (
    <div className="font-sans min-h-screen p-6 ">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500 text-5xl font-black">
            BilLD
          </h1>
        </div>
        <div className="flex justify-end mb-6 gap-2">
          <Button
            asChild
            className="relative border-2 shadow-[0_0_10px_2px_rgba(59,130,246,0.6),_0_0_15px_4px_rgba(236,72,153,0.4)] hover:shadow-[0_0_15px_4px_rgba(59,130,246,0.8),_0_0_20px_6px_rgba(236,72,153,0.6)] transition-shadow"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/manage">Manage</Link>
          </Button>
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("form erros", errors);
        })}
        className="space-y-10 border-2 p-5"
      >
        <Form {...form}>
          {/* Company Count and Generate */}
          <div className="flex flex-below-800 divide-x-below-800">
            <div className="pr-3">
              <div className="flex items-end gap-4">
                <div>
                  <FormField
                    control={control}
                    name="companyCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter company count</FormLabel>
                        <Input
                          {...field}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (isNaN(val)) {
                              console.log("This is Not-a-Number (NaN) ");
                              return;
                            }
                            setCompanyCount(val); // update local state
                            field.onChange(val); // update react-hook-form value
                          }}
                        />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="button" onClick={handleCountSubmit}>
                  Generate
                </Button>
              </div>

              {/* Companies Dropdowns */}
              <div className="">
                {fields.length > 0 && (
                  <div className=" flex flex-col gap-1">
                    <Label className="text-lg font-semibold">
                      Select Companies
                    </Label>

                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="border rounded-lg p-2 flex items-center justify-between shadow-sm"
                      >
                        <Label className="text-sm text-gray-600">
                          Company #{index + 1}
                        </Label>
                        <Controller
                          control={control}
                          name={`companies.${index}.name`}
                          render={({ field }) => {
                            const selectedCompanies = watch("companies");
                            const currentFIS = selectedCompanies?.[index]?.fis;

                            const options = allCompanies.filter((company) => {
                              // Keep the current company in the list, and exclude others that are already selected
                              const isAlreadySelected =
                                selectedCompanies?.some(
                                  (c, i) => i !== index && c.fis === company.fis
                                ) ?? false;
                              return (
                                !isAlreadySelected || company.fis === currentFIS
                              );
                            });

                            return (
                              <Select
                                onValueChange={(val) => {
                                  const selectedCompany = allCompanies.find(
                                    (c) => c.fis === val
                                  );
                                  if (selectedCompany) {
                                    setValue(
                                      `companies.${index}`,
                                      selectedCompany
                                    );
                                  }
                                }}
                                value={currentFIS}
                              >
                                <SelectTrigger className="w-72">
                                  <SelectValue placeholder="Select company" />
                                </SelectTrigger>
                                <SelectContent>
                                  {options.map((company) => (
                                    <SelectItem
                                      key={company.fis}
                                      value={company.fis}
                                    >
                                      {company.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary Company Selector */}
              <div className="mt-8">
                <FormField
                  control={control}
                  name="primary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Primary Company
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-72">
                          <SelectValue placeholder="Select Primary Company" />
                        </SelectTrigger>
                        <SelectContent>
                          {watch("companies")
                            .filter((c) => c?.fis)
                            .map((company, idx) => (
                              <SelectItem key={idx} value={company.fis}>
                                {allCompanies.find((c) => c.fis === company.fis)
                                  ?.name || `Company #${idx + 1}`}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {form.formState.errors.primary && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.primary.message}
                  </p>
                )}
              </div>

              {/* TO Section */}
              <div className="mt-8 space-y-4">
                <Label className="font-semibold">Recipient (To)</Label>
                <div className=" rounded-lg border shadow-sm p-4 space-y-4 w-[300px]">
                  <FormField
                    control={control}
                    name="to.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="to.ship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ship</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="to.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <Input {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="to.OrderNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order No.</FormLabel>
                        <Input {...field} required={false}/>
                      </FormItem>
                    )}
                  />
                 <FormField
  control={control}
  name="to.Dated"
  rules={{ required: false }} // optional
  render={({ field }) => (
    <FormItem>
      <FormLabel>Dated</FormLabel>
      <Input
        type="date"
        // If no date, let it stay undefined so input shows blank
        value={field.value ?? ""}
        onChange={(e) =>
          field.onChange(e.target.value === "" ? undefined : e.target.value)
        }
      />
    </FormItem>
  )}
/>
                  <FormField
                    control={control}
                    name="to.InvoiceNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice No.</FormLabel>
                        <Input {...field} required={false}/>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                {/* GST Field */}
                <FormField
                  control={control}
                  name="gst"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST</FormLabel>
                      <FormControl>
                        <Input
                          className="w-60"
                          type="number"
                          min={0}
                          max={100}
                          {...field}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Variation Fields */}
                <div className="flex gap-5">
                  <FormField
                    control={control}
                    name="variationMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variation Min</FormLabel>
                        <FormControl>
                          <Input
                            className="w-30"
                            type="number"
                            value={field.value}
                            min={0}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="variationMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variation Max</FormLabel>
                        <FormControl>
                          <Input
                            className="w-30"
                            type="number"
                            min={0}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="w-full pl-3">
              <Button
                className="float-end flex items-center"
                type="button"
                onClick={() =>
                  itemAppend({ desc: "", deno: "", qty: 0, rate: 0, total: 0 })
                }
              >
                <span>Add Item</span> <Plus />
              </Button>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Deno</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>HSN</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {itemFields.map((item, index) => {
                    const qty = watch(`items.${index}.qty`) || 0;
                    const rate = watch(`items.${index}.rate`) || 0;
                    const total = qty * rate;

                    return (
                      <TableRow key={item.id} className="">
                        <TableCell>
                          <Controller
                            control={control}
                            name={`items.${index}.desc`}
                            render={({ field }) => (
                              <Input placeholder="Description" {...field} />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          {" "}
                          <Controller
                            control={control}
                            name={`items.${index}.deno`}
                            render={({ field }) => (
                              <Input placeholder="Denomination" {...field} />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Controller
                            control={control}
                            name={`items.${index}.qty`}
                            render={({ field }) => (
                              <Input
                                type="number"
                                placeholder="Qty"
                                {...field}
                                onChange={(e) => {
                                  const newQty = Number(e.target.value);
                                  setValue(`items.${index}.qty`, newQty);
                                  const rate =
                                    watch(`items.${index}.rate`) || 0;
                                  setValue(
                                    `items.${index}.total`,
                                    newQty * rate
                                  );
                                }}
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Controller
                            control={control}
                            name={`items.${index}.hsn`}
                            render={({ field }) => (
                              <Input type="text" placeholder="" {...field} />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Controller
                            control={control}
                            name={`items.${index}.rate`}
                            render={({ field }) => (
                              <Input
                                type="number"
                                placeholder="Rate"
                                {...field}
                                onChange={(e) => {
                                  const newRate = Number(e.target.value);
                                  setValue(`items.${index}.rate`, newRate);
                                  const qty = watch(`items.${index}.qty`) || 0;
                                  setValue(
                                    `items.${index}.total`,
                                    qty * newRate
                                  );
                                }}
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Controller
                            control={control}
                            name={`items.${index}.total`}
                            render={({ field }) => (
                              <Input
                                type="number"
                                disabled
                                placeholder="Total"
                                value={total}
                                onChange={(e) => {
                                  field.onChange(Number(e.target.value));
                                  setValue(`items.${index}.total`, total);
                                }}
                              />
                            )}
                          />
                        </TableCell>
                        <Button
                          type="button"
                          variant={"destructive"}
                          onClick={() => itemRemove(index)}
                          className="mt-2"
                        >
                          <Trash2 />
                        </Button>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          {/* Submit Button */}

          <div className="flex gap-2">
            <Button onClick={handlePreview} className="mt-6 min-w-30 p-0">
              {previewBillAndQuoteMutation.isPending && isPreviewMode ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <div className="h-full w-full  radius-10">
                  <MotionIcon value="Preview" Icon={WandSparkles} />
                </div>
              )}
            </Button>
            <Button
              onClick={handleSubmit}
              type="submit"
              className="mt-6 min-w-30 p-0"
            >
              {previewBillAndQuoteMutation.isPending && !isPreviewMode ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <div className="h-full w-full  radius-10">
                  <MotionIcon value="Submit" Icon={Boxes} />
                </div>
              )}
            </Button>
          </div>
          <Dialog
            onOpenChange={setPreviewDialogOpen}
            open={isPreviewDialogOpen}
          >
            <DialogContent className="h-[80vh] w-[100vw] !max-w-fit flex flex-col">
              <div className="overflow-y-auto flex-1">
                <PreviewDialogContent previewData={previewData} />
              </div>
              <DialogFooter className="shrink-0">
                <DialogClose asChild>
                  <Button variant="destructive" type="button">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Form>
      </form>
      <DownloadDialog
        isOpen={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
        documents={downloadDocuments}
      />
    </div>
  );
}
