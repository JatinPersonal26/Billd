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

  for (let i = 0; i < bill.companyCount; i++) {
    const company = bill.companies[i];

    const finalBill: BillOrQuoteFinalType = {
      companyName: company.name,
      companyPhoneNo: company.phone,
      companyAddress: company.address,
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

    const variation =
      bill.primary === company.fis
        ? 0
        : Math.floor(
            Math.random() * (bill.variationMax - bill.variationMin + 1)
          ) + bill.variationMin;

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
    finalBill.gstCharges = Math.ceil((totalAmountOnBill * bill.gst) / 100);
    finalBill.totalWithGst = finalBill.total + finalBill.gstCharges;
    perCompanyBill.push(finalBill);
    if (finalBill.isPrimary) {
      const clonedBill = { ...finalBill };
      clonedBill.type = Template_Types.Bill;
      clonedBill.invoiceNo = generateInvoiceNo();
      perCompanyBill.push(clonedBill);
    }
  }

  return perCompanyBill;
}

export function generateInvoiceNo(prefix: string = "INV"): string {
  const now = new Date();
  const timestamp = now.getTime(); // milliseconds since epoch
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random

  return `${prefix}-${timestamp}-${randomPart}`;
}
