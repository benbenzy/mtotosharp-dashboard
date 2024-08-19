import { supabase } from '..';

export const fetchCourses = async () => {
  try {
    if (!supabase) {
      console.log('error loading supabase client');
    }
    const { data, error } = await supabase?.from('courses').select();
    if (error) {
      console.log('failed to fetch courses', error);
    }
    console.log('loaded courses in fetch courses', data?.length);
    return data;
  } catch (error) {}
};
