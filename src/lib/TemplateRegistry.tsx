import dynamic from "next/dynamic";
import React from "react";
import { BillOrQuoteFinalType } from "./BillAndQouteCalculator";
import { Quote_ZEN } from "@/app/templates/html/ZEN-TECH-502_quote";
import { AshaEnterprisesQuotation } from "@/app/templates/pdf/AshaEnterprisesQuotation";
import { AshaEnterprisesBill } from "@/app/templates/pdf/AshaEnterprisesQuotation";
import { Anjali_BillPDF } from "@/app/templates/pdf/Anjali_BillPDF";
import { Anjali_QuotationPDF } from "@/app/templates/pdf/Anjali_QuotationPDF";
import { Bill_CHAURASIA_MARINE_PDF } from "@/app/templates/pdf/Chaurasi-Marine-Bill";
import { Quote_CHAURASIA_MARINE_PDF } from "@/app/templates/pdf/Chaurasi-Marine-Bill";
import { DDEnterprises_BillPDF } from "@/app/templates/pdf/DD-Enterprise-bill";
import { DDEnterprises_PDF } from "@/app/templates/pdf/DD-Enterprises";
import { Bill_DEC_PDF } from "@/app/templates/pdf/Deccom-BillPDF";
import { Quotation_DEC_PDF } from "@/app/templates/pdf/Deccom-Quotation";
import { Bill_DEV_PDF } from "@/app/templates/pdf/Dev_BillPDF";
import { Quotation_DevEnterprises } from "@/app/templates/pdf/Dev_QuotationPDF";
import { ShankMarineQuotation } from "@/app/templates/pdf/Shank-Marine-Services";
import { ShankMarineBill } from "@/app/templates/pdf/Shank-Marine-Services";
import { SRKAQuotation } from "@/app/templates/pdf/Shree-Radha";
import { SRKABill } from "@/app/templates/pdf/Shree-Radha";
import { ValliantBill } from "@/app/templates/pdf/Valliant_Quotation";
import { ValliantQuotation } from "@/app/templates/pdf/Valliant_Quotation";
import { AvaniAssociatesQuotation } from "@/app/templates/pdf/Avani";

import NothingFound from "@/components/custom/NothingFound";
import { Font, pdf } from "@react-pdf/renderer";
Font.register({
  family: 'Roboto',
  src:
   'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf', // regular
});

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v29/KFOkCnqEu92Fr1Mu51xIIzc.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9vAw.ttf',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v29/KFOjCnqEu92Fr1Mu51TjASc6CsE.ttf',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  ],
});
Font.register({
  family: "Lato",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjxAwXiWtFCc.woff", // normal
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/lato/v23/S6u8w4BMUTPHjxsAXC-q.woff", // italic
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: "https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPHA.woff", // bold
      fontWeight: "bold",
      fontStyle: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/lato/v23/S6u_w4BMUTPHjxsI9w2PHA.woff", // bold italic
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});


export enum Template_Types {
  Bill = "Bill",
  Quote = "Quote",
}

export enum Template_Use {
  Preview = "Preview",
  Pdf = "Pdf",
}

type TemplateComponentProps = {
  bill: BillOrQuoteFinalType;
};
const TemplateRegistry = (
  fis: string,
  data: BillOrQuoteFinalType,
  template_type: Template_Types,
  template_use: Template_Use
) => {

if(true || template_use===Template_Use.Preview){
    console.log(fis+"sdsd")
   console.log("Rendering BoldFormal Template")
   return <AshaEnterprisesQuotation bill={data} />;
}



  return <NothingFound  />;
};



export async function generateBillPdfBlob(bill: BillOrQuoteFinalType,templateType:Template_Types) {
  const Template:BillTemplateComponent = getTemplateForBill(bill.fis,templateType);
  const doc = <Template bill={bill} />;
  const asPdf = pdf();
  asPdf.updateContainer(doc);
  const blob = await asPdf.toBlob();
  
  return blob;
}

type BillTemplateComponent = React.FC<{ bill: BillOrQuoteFinalType }>;

const TemplateMap: Record<
  string,
  Record<Template_Types, BillTemplateComponent>
> = {
  "6032139": {
    [Template_Types.Bill]: Bill_DEV_PDF,
    [Template_Types.Quote]: Quotation_DevEnterprises,
  },
  "236568": {
    [Template_Types.Bill]: AshaEnterprisesBill,
    [Template_Types.Quote]: AshaEnterprisesQuotation,
  },
  "530011": {
    [Template_Types.Bill]: Bill_CHAURASIA_MARINE_PDF,
    [Template_Types.Quote]: Quote_CHAURASIA_MARINE_PDF,
  },
  "239289": {
    [Template_Types.Bill]: ShankMarineBill,
    [Template_Types.Quote]: ShankMarineQuotation,
  },
  "239703": {
    [Template_Types.Bill]: ValliantBill,
    [Template_Types.Quote]: ValliantQuotation,
  },
  "10027": {
    [Template_Types.Bill]: Anjali_BillPDF,
    [Template_Types.Quote]: Anjali_QuotationPDF,
  },
  "231583": {
    [Template_Types.Bill]: SRKABill,
    [Template_Types.Quote]: SRKAQuotation,
  },
  "63373": {
    [Template_Types.Bill]: Bill_DEC_PDF,
    [Template_Types.Quote]: Quotation_DEC_PDF,
  },
  "633687": {
    [Template_Types.Bill]: DDEnterprises_BillPDF,
    [Template_Types.Quote]: DDEnterprises_PDF,
  },
   "456467": {
    [Template_Types.Bill]: AvaniAssociatesQuotation,
    [Template_Types.Quote]: AvaniAssociatesQuotation,
  },
  
};


export function getTemplateForBill(
  fis: string,
  templateType: Template_Types
): BillTemplateComponent {
  const templateSet = TemplateMap[fis];
  if (!templateSet || !templateSet[templateType]) {
    throw new Error(
      `No template found for FIS: ${fis} and type: ${templateType}. Please contact admin.`
    );
  }

  return templateSet[templateType];
}

export default TemplateRegistry;
