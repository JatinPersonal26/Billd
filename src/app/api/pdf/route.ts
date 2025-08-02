import { PreviewPayload } from "@/app/types/types";
import { CalculateBillOrQuote } from "@/lib/BillAndQouteCalculator";
import { billAndQuoteSchema } from "@/lib/Schema/generator";
import { supabase } from "@/lib/supabase";
import { generateBillPdfBlob } from "@/lib/TemplateRegistry";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = billAndQuoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const finalBillOrQuote = CalculateBillOrQuote(parsed.data);
    const generationId = uuidv4();

    const uploadedPdfs = await Promise.all(
      finalBillOrQuote.map(async (bill) => {
        const blob = await generateBillPdfBlob(bill, bill.type);
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileName = `${bill.companyName.replace(/\s+/g, "_")}_${
          bill.type
        }_${Date.now()}_${uuidv4()}.pdf`;

        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: fileName,
          Body: buffer,
          ContentType: "application/pdf",
          // ACL: ObjectCannedACL.public_read, // Leave commented if ACLs disabled
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        return {
          pdfType: bill.type,
          isPrimary: bill.isPrimary,
          url,
          companyName: bill.companyName,
          fileName,
        };
      })
    );

    const documentsToInsert = uploadedPdfs.map((doc) => ({
      generation_id: generationId,
      company_name: doc.companyName,
      bill_type: doc.pdfType,
      is_primary: doc.isPrimary,
      file_name: doc.fileName,
      url: doc.url,
    }));

    const { error: insertError, data: insertedDocuments } = await supabase
      .from("documents")
      .insert(documentsToInsert)
      .select();

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save document metadata." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      generationId,
      documents: uploadedPdfs,
    });
  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
