import dynamic from "next/dynamic";
import React from "react";
import { BillOrQuoteFinalType } from "./BillAndQouteCalculator";
import { Quote_ZEN } from "@/app/templates/html/ZEN-TECH-502_quote";
import { Bill_ZEN } from "@/app/templates/html/ZEN-TECH-502_bill";
import NothingFound from "@/components/custom/NothingFound";
import { pdf } from "@react-pdf/renderer";
import { Bill_SRKA_PDF } from "@/app/templates/pdf/ZEN-TECH-502_bill";

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
//   const TemplateComponent = dynamic<TemplateComponentProps>(() => {
//     if (template_use === Template_Use.Pdf) {
//       return import(`@/app/templates/pdf/${fis}_${template_type}}`).catch(
//         () => import("@/app/templates/FallbackTemplate")
//       );
//     } else {
//       return import(`@/app/templates/html/${fis}_${template_type}}`).catch(
//         () => import("@/app/templates/FallbackTemplate")
//       );
//     }
//   });
console.log(fis)
if(template_use===Template_Use.Preview){
    console.log(fis+"sdsd")

    return <Bill_ZEN  bill = {data}/>
}



  return <NothingFound  />;
};

export async function generateBillPdfBlob(bill: BillOrQuoteFinalType) {
  const doc = <Bill_SRKA_PDF bill={bill} />;
  const asPdf = pdf();
  asPdf.updateContainer(doc);
  const blob = await asPdf.toBlob();
  
  return blob;
}

export default TemplateRegistry;
