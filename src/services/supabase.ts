import { createClient } from "@supabase/supabase-js";
import { FavoriteBody } from "../interfaces/pokemon";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.log("Error", error);
    return;
  }
  localStorage.setItem("login", "true");
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) console.log("Error", error);
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("Error", error);
    return;
  }

  return data;
}

export async function store(body: FavoriteBody) {
  const { data, error } = await supabase.from("favorites").insert([body]);

  if (error) {
    console.log("Error", error);
    return;
  }
  console.log("user", data);
  return data;
}
