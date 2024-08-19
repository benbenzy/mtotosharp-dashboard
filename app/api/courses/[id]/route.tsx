import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const id = request.nextUrl.pathname.split('/').pop();

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*,chapters(*)')
      .eq('id', id)
      .single();
    if (error) {
      console.log('error fetching course', error);
      return NextResponse.json('failed to fetch course', { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log('error fetching course', error);
    return NextResponse.json({ message: 'failed ' }, { status: 500 });
  }
}
export async function PATCH(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop();
  const supabase = createClient();
  const course = await request.json();

  try {
    const { data, error } = await supabase
      .from('courses')
      .update({
        title: course.title,
        description: course.description,
        price: course.price,
        audience: course.audience,
        duration: course.duration,
      })
      .eq('id', course.id);
    if (error) {
      console.log('failed to update course', error);
      return NextResponse.json('failed to update', { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log('failed to update course', error);
    return NextResponse.json('failed to update', { status: 500 });
  }
}
