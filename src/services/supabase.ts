import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ysakuartyiuxlhdxbncb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzYWt1YXJ0eWl1eGxoZHhibmNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NzMzMzAsImV4cCI6MjA3MDE0OTMzMH0.ZCRndVA29lJUgGdscxdMvIPdHmb5hyYRrwNadM717lM";

// Ensure the Supabase key is defined and not undefined
if (!supabaseKey) {
  throw new Error(
    "Supabase key is not defined. Please set the SUPABASE_KEY environment variable."
  );
}
export const supabase = createClient(supabaseUrl, supabaseKey);
