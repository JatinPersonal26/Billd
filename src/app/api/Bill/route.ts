import { CalculateBillOrQuote } from "@/lib/BillAndQouteCalculator"
import { billAndQuoteSchema } from "@/lib/Schema/generator"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const parsed = billAndQuoteSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  }

  let finalBillOrQuote = CalculateBillOrQuote(parsed.data)
  
}