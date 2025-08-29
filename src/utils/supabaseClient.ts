import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rzuvrygomdkgmqblhayu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6dXZyeWdvbWRrZ21xYmxoYXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MDUyMzMsImV4cCI6MjA3MTk4MTIzM30.sTYyp4JFvrKCaJ2HXVMBgln-RCuiefpSBJnAa1e_wWE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);