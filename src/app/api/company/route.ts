// app/api/company/route.ts
import { companySchema } from "@/lib/Schema/company"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"
import { z } from "zod"


export async function POST(req: Request) {
  const body = await req.json()

  const parsed = companySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("companies")
    .insert([parsed.data])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data }, { status: 200 })
}

export async function GET() {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false }) // optional: newest first

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data }, { status: 200 })
}
