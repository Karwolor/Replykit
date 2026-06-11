import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const submission = await request.json();

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("template_submissions").insert([
      {
        name: submission.name,
        email: submission.email,
        title: submission.title,
        category: submission.category,
        channel: submission.channel,
        industry: submission.industry,
        description: submission.description,
        body: submission.body,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Supabase client not configured." }, { status: 500 });
  }
}
