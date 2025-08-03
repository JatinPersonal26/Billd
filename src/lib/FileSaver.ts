"use client";
import { Document } from "@/app/types/types";
import { saveAs } from "file-saver";
import { toast } from "sonner"; // or 'react-hot-toast'
import { useState } from "react";

export const handleDownload = async (
  doc: Document,
  downloading: boolean,
  setDownloading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (downloading) return;

  setDownloading(true);

  try {
    const response = await fetch(doc.url);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }

    const blob = await response.blob();
    saveAs(blob, doc.file_name);

    toast.success("Download started");
  } catch (err: any) {
    console.error("Download failed:", err);
    toast.error("Download failed. Please try again.");
  } finally {
    setTimeout(() => setDownloading(false), 1500);
  }
};
