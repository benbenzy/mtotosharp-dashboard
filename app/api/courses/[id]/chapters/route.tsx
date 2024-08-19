import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const getCourseIdPath = request.nextUrl.pathname.split('/');
  const courseId = getCourseIdPath[getCourseIdPath?.length - 2];
  // console.log('this is course id', courseId);
  try {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('course_id', courseId);
    if (error) {
      //console.log('failed to fetch chapters', error);
      return NextResponse.json('failed to fetch chapters', { status: 500 });
    }
    // console.log('all chapters', data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    //console.log('failed to fetch chapters', error);
    return NextResponse.json('failed to fetch chapters', { status: 200 });
  }
}
export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { courseId, title } = await request.json();
  try {
    const { data, error } = await supabase.from('chapters').insert({
      title,

      course_id: courseId,
    });
    if (error) {
      console.log('error submitting chapter', error);
      return NextResponse.json('error submittig chapter', { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    //console.log('error submitting chapter', error);
    return NextResponse.json('error submittig chapter', { status: 500 });
  }
}
