
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://ofbxpdifclkywoloaycg.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mYnhwZGlmY2xreXdvbG9heWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMDY3NjgsImV4cCI6MjA3MzY4Mjc2OH0.qH5tXYY8CNnwqEwLrNX2ltEoelET82dXy0DVBqmrxwI';

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
  