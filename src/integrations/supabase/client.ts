import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { brokeredPreviewStorage } from './previewAuthStorage';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "https://khzrlovbtthmdifagrvo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoenJsb3ZidHRobWRpZmFncnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzg5MjEsImV4cCI6MjA2OTgxNDkyMX0.50Vzw60D5c5yn7Nd_6ZNrT28CC_WK46ypkhH1QOAU_A";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: brokeredPreviewStorage(),
    persistSession: true,
    autoRefreshToken: true,
  },
});
