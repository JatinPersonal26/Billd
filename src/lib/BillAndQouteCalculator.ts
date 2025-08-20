import { lowerCase, trim } from "lodash";
import { billAndQuote } from "./Schema/generator";
import { Template_Types } from "./TemplateRegistry";
import { supabase } from "./supabase";

export type BillItem = {
  desc: string;
  deno: string;
  qty: number;
  hsn?: string;
  rate: number;
  total: number;
};

export type BillOrQuoteFinalType = {
  companyName: string;
  companyPhoneNo: string;
  companyAddress: string;
  isCompanyRegular: boolean;
  gst: number;
  fis: string;
  items: BillItem[];
  total: number;
  gstCharges: number;
  totalWithGst: number;
  isPrimary: boolean;
  invoiceNo?: string;
  quotationNo: string;
  date: string;
  to: {
    name: string;
    ship: string;
    address: string;
    OrderNo?: string;
    Dated?: string;
  };
  type: Template_Types;
};

export async function CalculateBillOrQuote(
  bill: billAndQuote,
  isPreview: boolean
): Promise<BillOrQuoteFinalType[]> {
  const perCompanyBill: BillOrQuoteFinalType[] = [];

  let primaryAmount = 0;
  let minAmount = Infinity;

  for (let i = 0; i < bill.companyCount; i++) {
    const company = bill.companies[i];
    console.log("inv coming" , bill.to.InvoiceNo)
    const finalBill: BillOrQuoteFinalType = {
      companyName: company.name,
      companyPhoneNo: company.phone,
      companyAddress: company.address,
      isCompanyRegular: false,
      gst: bill.gst,
      fis: company.fis,
      items: [],
      total: 0,
      totalWithGst: 0,
      gstCharges: 0,
      isPrimary: bill.primary === company.fis,
      invoiceNo: bill.to.InvoiceNo || await generateInvoiceNo(company.abr,isPreview),
      quotationNo: "",
      date: new Date().toISOString().split("T")[0],
      to: bill.to,
      type: Template_Types.Quote,
    };

    let variation =
      bill.primary === company.fis
        ? 0
        : Math.floor(
            Math.random() * (bill.variationMax - bill.variationMin + 1)
          ) + bill.variationMin;

    if (!company.isRegular) {
      variation += bill.gst;
    }

    let totalAmountOnBill = 0;
    const finalBillItems: BillItem[] = bill.items.map((item) => {
      const adjustedRate = Math.ceil(item.rate * (1 + variation / 100));
      const total = item.qty * adjustedRate;
      totalAmountOnBill += total;

      return {
        desc: item.desc,
        deno: item.deno,
        qty: item.qty,
        hsn: item.hsn,
        rate: adjustedRate,
        total,
      };
    });

    finalBill.items = finalBillItems;
    finalBill.total = totalAmountOnBill;
    finalBill.isCompanyRegular = company.isRegular;
    finalBill.gstCharges = company.isRegular
      ? Math.ceil((totalAmountOnBill * bill.gst) / 100)
      : 0; // this is for composite company i.e gstCharges = 0 explicitly;
    finalBill.totalWithGst = finalBill.total + finalBill.gstCharges;
    finalBill.quotationNo = generateQuotationNo(company.abr);
    if (finalBill.isPrimary) {
      const clonedBill = { ...finalBill };
      clonedBill.type = Template_Types.Bill;
      clonedBill.invoiceNo =
        bill.to.InvoiceNo ||
        (await generateInvoiceNo(company.abr, isPreview));

      perCompanyBill.unshift(clonedBill);
      perCompanyBill.unshift(finalBill);

      primaryAmount = finalBill.totalWithGst;
    } else {
      perCompanyBill.push(finalBill);
    }

    minAmount = Math.min(minAmount, finalBill.totalWithGst);
    console.log(finalBill)
  }

  if (minAmount !== primaryAmount) {
    // DEV NOTE:
    // The primary bill is expected to have the **minimum amount**
    // among all bills. This check ensures that calculations (especially
    // rate variation) are correct — the entire purpose of the variation logic
    // is to make primary the lowest.
    // If this fails, the bill generation logic is likely broken.
    throw new Error(
      "Invalid state: Primary bill does not have the minimum amount. " +
        "Please contact the developer team to inspect variation logic."
    );
  }

  return perCompanyBill;
}

export async function generateInvoiceNo(
  prefix: string = "INV",
  isPreview: boolean
) {
  const now = new Date();
  const timestamp = now.getTime();
  const invNo = await fetchInvoiceNoFromDB(prefix, isPreview);
  return `${prefix}-${timestamp}-${invNo}`;
}
export function generateQuotationNo(prefix: string = "INV"): string {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randomPart}-${currentYear}-${nextYear}`;
}

export const isHsnPresent = (bill: BillOrQuoteFinalType) => {
  return bill.items.length > 0 && bill.items[0].hsn !== undefined; // assuming now that either hsn is entered for all items or for none.
};

export const fetchInvoiceNoFromDB = async (
  abr: string,
  isPreview: boolean
) => {
  const sequenceName = `company_${lowerCase(trim(abr))}_seq`;
  let invNo;
  if (isPreview) {
    invNo = fetchCurrentInvoiceNoFromDB(sequenceName);
  } else {
    invNo = fetchNextInvoiceNoFromDB(sequenceName);
  }

  return invNo;
};

export const fetchNextInvoiceNoFromDB = async (sequenceName: string) => {
  const { data: invNo, error } = await supabase.rpc(
    "get_company_seq_next_value",
    {
      seq: sequenceName,
    }
  );
  return invNo;
};

export const fetchCurrentInvoiceNoFromDB = async (sequenceName: string) => {
  const { data: invNo, error } = await supabase.rpc(
    "get_company_seq_last_value",
    {
      seq: sequenceName,
    }
  );

  if(invNo == null) return 1;
  return invNo + 1; // this will give idea of what will be the final inv no.
};
