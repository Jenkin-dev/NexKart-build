import "expo-sqlite/localStorage/install";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hzlprtnxyyuynqevrjgs.supabase.co";
const supabasePublishableKey = "sb_publishable_TFi-45phg1wsOPt9ThHOsA_g5kVRH1p";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
