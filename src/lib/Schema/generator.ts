import { z } from "zod";
import { companySchema } from "./company";

const optionalString = z
  .string()
  .transform(val => val.trim() === "" ? undefined : val)
  .optional();
export const billAndQuoteSchema = z.object({
  companyCount: z.number().min(1).max(10),
  companies: z.array(companySchema).min(1),
  primary: z.string().min(1, "Choose a primary company"),
  to: z.object({
    name: z.string().min(1),
    ship: z.string().min(1),
    address: z.string().min(1),
    OrderNo: optionalString,
    Dated: z.string().min(1),
    InvoiceNo: optionalString,
  }),
  gst: z.number().min(0).max(100),
  variationMin: z.number(),
  variationMax: z.number(),
  items: z.array(
    z.object({
      desc: z.string(),
      deno: z.string(),
      qty: z.number(),
      hsn: z.string().optional(),
      rate: z.number(),
      total: z.number(),
    })
  ),
});


export type billAndQuote = z.infer<typeof billAndQuoteSchema>;
