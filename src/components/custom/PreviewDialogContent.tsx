import { PreviewPayload } from "@/app/types/types";
import { Template_Types } from "@/lib/TemplateRegistry";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { Separator } from "../ui/separator";

export function PreviewDialogContent({
  previewData,
}: {
  previewData: PreviewPayload[];
}) {
  const [activePreview, setActivePreview] = useState<
    PreviewPayload | undefined
  >(previewData?.length > 0 ? previewData[0] : undefined);

  return (
    <div className="flex gap-4 overflow-y-scroll min-w-[60vw] min-h-full">
      <div className="flex flex-col gap-1 min-w-fit">
         
         {previewData.map((data) => {
           if(data.pdfType !== Template_Types.Bill) return 
          return (
            <SideBarElementInPreviewDialog
              elementData={data}
              setActive={setActivePreview}
              activePreview={activePreview}
            />
          );
        })}

        <Separator orientation="horizontal" className="mb-3 mt-3 border-1 h-[10px]" />

        {previewData.map((data) => {
           if(data.pdfType === Template_Types.Bill) return 
          return (
            <SideBarElementInPreviewDialog
              elementData={data}
              setActive={setActivePreview}
              activePreview={activePreview}
            />
          );
        })}
      </div>
      <Separator orientation="vertical" />
      <div className="w-full">
        <object
          data={activePreview?.url}
          type="application/pdf"
          width="100%"
          height="100%"
          className="mt-4 border"
        >
          <p>
            This browser doesn't support PDF preview.{" "}
            <a href={activePreview?.url} target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
            .
          </p>
        </object>
      </div>
    </div>
  );
}

function SideBarElementInPreviewDialog({
  elementData,
  setActive,
  activePreview,
}: {
  elementData: PreviewPayload;
  setActive: Dispatch<SetStateAction<PreviewPayload | undefined>>;
  activePreview: PreviewPayload | undefined;
}) {
  const isBill = elementData.pdfType === Template_Types.Bill;

  const badgeStyles = isBill
    ? "bg-[#1F1E41] text-[#C2B8FF] border-1 border-[#C2B8FF]"
    : "bg-[#2E4148] text-[#A3EEEF] border-1 border-[#A3EEEF]";

  const handleSelect = () => {
    if (activePreview === undefined || elementData.url !== activePreview.url)
      setActive(elementData);
  };

  return (
    <div
      onClick={handleSelect}
      className={`${activePreview !== undefined && elementData.url === activePreview.url ? 'border-green-400' : ''}   border p-2 border-gray-50 hover:border-sky-500 hover:cursor-pointer`}
    >
      <span className="text-xs">{elementData.companyName}</span>
      <div className="flex items-center gap-2 flex-wrap ">
        <span
          className={`px-2  rounded-full text-[10px] font-thin shadow-md ${badgeStyles}`}
        >
          {elementData.pdfType}
        </span>

        {elementData.isPrimary && (
          <span className="px-2 rounded-full text-[10px] font-thin  bg-[#343726] text-[#E4E669]  border-1 border-[#E4E669] shadow-md">
            Primary
          </span>
        )}
      </div>
    </div>
  );
}
