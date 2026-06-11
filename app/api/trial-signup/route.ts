import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const { email, type } = await request.json();

    if (!email || !type) {
      return Response.json(
        { error: "Email and type are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Try to save to Supabase if available
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      const { error } = await supabase.from("trial_signups").insert([
        {
          email,
          type,
          created_at: new Date().toISOString(),
          status: "pending",
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        // Don't fail the request if DB insert fails
      }
    }

    // TODO: Send email via email service (SendGrid, Loops, etc.)
    console.log(
      `Trial extension requested: ${email} for ${type}. TODO: Send email.`
    );

    return Response.json(
      { message: "Trial extension requested. Check your email!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Trial signup error:", error);
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
