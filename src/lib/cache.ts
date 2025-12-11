import { cache } from "react";
import { supabase } from "./supabase";

// cache() bawaan React untuk App Router - TIDAK PERLU .cache()
export const getCachedStudents = cache(async () => {
    console.log('fetch data dari supabase');
    const { data, error } = await supabase
        .from('students')
        .select('*');
    
    if (error) {
        console.error('Error fetching students:', error);
        throw error;
    }

    return data; // Akan di-cache otomatis oleh React
});