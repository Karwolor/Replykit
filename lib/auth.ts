import { getSupabaseClient } from "@/lib/supabase";

export async function signUp(email: string, password: string) {
  const supabase = getSupabaseClient();
  return await supabase.auth.signUp({ email, password });
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabaseClient();
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  const supabase = getSupabaseClient();
  return await supabase.auth.signOut();
}

export async function getUser() {
  const supabase = getSupabaseClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function isProUser(userId: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("pro_users")
    .select("subscription_status")
    .eq("user_id", userId)
    .eq("subscription_status", "active")
    .single();

  if (error) {
    console.error(error);
    return false;
  }

  return !!data;
}
