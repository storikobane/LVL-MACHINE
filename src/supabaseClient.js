import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://nuvlkvedpsebawqofllu.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dmxrdmVkcHNlYmF3cW9mbGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzNjE2MTEsImV4cCI6MjA1MDkzNzYxMX0.B_G4x5Mrs9XpQyhSzBVddPG4tn1_0UgiJEXD0ZanK6U';

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
