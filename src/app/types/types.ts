import { Template_Types, Template_Use } from "@/lib/TemplateRegistry";

export type QuoteProps = {
  to: {
    name: string;
    ship: string;
    address: string;
  };
  items: {
    name: string;
    qty: number;
    rate: number;
    amount: number;
    deno: string;
    desc: string;
    total: string;
  }[];
  total: number;
  gstRate: number;
  gstAmount: number;
  grandTotal: number;
  date: string;
};

export type BillProps = {
  to: {
    name: string;
    ship: string;
    address: string;
  };
  items: {
    name: string;
    qty: number;
    rate: number;
    amount: number;
    deno: string;
    desc: string;
    total: string;
  }[];
  total: number;
  gstRate: number;
  gstAmount: number;
  grandTotal: number;
  date: string;
  invoiceNo: string;
};

export type Company = {
  name: string;
  fis: string;
  address: string;
  phone: string;
};

export type CreateCompanyPayload = Company;

export type CreateCompanyResponse = {
  success: true;
  data: Company[];
};

export type PreviewPayload = {
  pdfType:Template_Types;
  url: string;
  isPrimary: boolean;
  companyName:string
};
