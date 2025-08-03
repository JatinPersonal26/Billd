"use client";

import { PreviewPayload } from "@/app/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export function DownloadDialog({
  isOpen,
  onClose,
  documents,
}: {
  isOpen: boolean;
  onClose: () => void;
  documents: PreviewPayload[];
}) 
    {
    console.log(documents)
  const handleDownload = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const downloadAll = () => {
    documents.forEach((doc) => {
      const fileName = `${doc.companyName}_${doc.pdfType}.pdf`.replace(/\s+/g, "_");
      handleDownload(doc.url, fileName);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[60vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Download PDFs</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {documents.map((doc, idx) => {
            const isBill = doc.pdfType === "Bill";

            const badgeStyles = isBill
              ? "bg-[#1F1E41] text-[#C2B8FF] border border-[#C2B8FF]"
              : "bg-[#2E4148] text-[#A3EEEF] border border-[#A3EEEF]";

            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-md p-4 flex justify-between items-start"
              >
                <div>
                  <p className="text-sm font-semibold">{doc.companyName}</p> 
                  <div className="flex gap-2 mt-1">
                    {/* Bill Type */}
                    <span
                      className={`px-2 rounded-full ${badgeStyles}`}
                    >
                      {doc.pdfType}
                    </span>

                    {/* Primary Badge */}
                    {doc.isPrimary && (
                      <span className="px-2 rounded-full text-xs font-medium bg-[#343726] text-[#E4E669] border border-[#E4E669] shadow-sm">
                        Primary
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() =>
                    handleDownload(
                      doc.url,
                      `${doc.companyName}_${doc.pdfType}.pdf`.replace(/\s+/g, "_")
                    )
                  }
                  className="shrink-0"
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            );
          })}
        </div>

        <DialogFooter className="mt-6">
          <Button onClick={downloadAll}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download All
          </Button>
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}