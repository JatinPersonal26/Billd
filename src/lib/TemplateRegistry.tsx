import dynamic from "next/dynamic";
import React from "react";
import { BillOrQuoteFinalType } from "./BillAndQouteCalculator";
import { Quote_ZEN } from "@/app/templates/html/ZEN-TECH-502_quote";
import { AshaEnterprisesQuotation } from "@/app/templates/pdf/AshaEnterprisesQuotation";
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


export function getTemplateForBill(fis:string,templateType:Template_Types):BillTemplateComponent{
  // TODO: fetch fis_templateType.tsx and return if not found throw error to contact admin and get template generated .
  return AshaEnterprisesQuotation
}
export default TemplateRegistry;
