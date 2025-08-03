"use client";

import { Document, PreviewPayload } from "@/app/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { handleDownload } from "@/lib/FileSaver";
import { useState } from "react";
import { toast } from "sonner";

export function DownloadDialog({
  isOpen,
  onClose,
  documents,
}: {
  isOpen: boolean;
  onClose: () => void;
  documents: Document[];
}) {
  const [downloading, setDownloading] = useState(false);

  const downloadAll = async () => {
    try {
      for (const doc of documents) {
        await handleDownload(doc, downloading, setDownloading);
      }
      toast.success("All files downloaded successfully.");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("An error occurred while downloading files.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[60vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Download PDFs</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {documents.map((doc, idx) => {
            const isBill = doc.bill_type === "Bill";

            const badgeStyles = isBill
              ? "bg-[#1F1E41] text-[#C2B8FF] border border-[#C2B8FF]"
              : "bg-[#2E4148] text-[#A3EEEF] border border-[#A3EEEF]";

            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-md p-4 flex justify-between items-start"
              >
                <div>
                  <p className="text-l font-semibold">{doc.company_name}</p>
                  <div className="flex gap-2 mt-1">
                    {/* Bill Type */}
                    <span className={`px-2 rounded-full ${badgeStyles}`}>
                      {doc.bill_type}
                    </span>

                    {/* Primary Badge */}
                    {doc.is_primary && (
                      <span className="px-2 txext-xs rounded-full text-xs font-medium bg-[#343726] text-[#E4E669] border border-[#E4E669] shadow-sm flex items-center">
                        Primary
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() =>
                    handleDownload(doc, downloading, setDownloading)
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
