import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://pawlbvodwribspkshkse.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhd2xidm9kd3JpYnNwa3Noa3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTE0MzksImV4cCI6MjA2ODE4NzQzOX0.eB3ebhFh_DiCYKoyaQF_BcjBxLr-aGdo8h12z1i1cA4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
