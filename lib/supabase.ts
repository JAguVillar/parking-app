import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mpdddbygrblebsxhvkti.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wZGRkYnlncmJsZWJzeGh2a3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4ODcxNTEsImV4cCI6MjA0MTQ2MzE1MX0.koLtDq1q58ZROAfwbjHor2o09m0xO57p8wK16KIZSsM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
