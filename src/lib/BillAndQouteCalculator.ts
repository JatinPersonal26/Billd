import { billAndQuote } from "./Schema/generator";
import { Template_Types } from "./TemplateRegistry";

export type BillItem = {
  desc: string;
  deno: string;
  qty: number;
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
  invoiceNo: string;
  date: string;
  to: {
    name: string;
    ship: string;
    address: string;
  };
  type: Template_Types;
};

export function CalculateBillOrQuote(
  bill: billAndQuote
): BillOrQuoteFinalType[] {
  const perCompanyBill: BillOrQuoteFinalType[] = [];

  let primaryAmount = 0;
  let minAmount = Infinity;

  for (let i = 0; i < bill.companyCount; i++) {
    const company = bill.companies[i];

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
      invoiceNo: "",
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

    if (finalBill.isPrimary) {
      const clonedBill = { ...finalBill };
      clonedBill.type = Template_Types.Bill;
      clonedBill.invoiceNo = generateInvoiceNo();

      perCompanyBill.unshift(clonedBill);
      perCompanyBill.unshift(finalBill);

      primaryAmount = finalBill.totalWithGst;
    } else {
      perCompanyBill.push(finalBill);
    }

    minAmount = Math.min(minAmount, finalBill.totalWithGst);
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

export function generateInvoiceNo(prefix: string = "INV"): string {
  const now = new Date();
  const timestamp = now.getTime(); // milliseconds since epoch
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random

  return `${prefix}-${timestamp}-${randomPart}`;
}
