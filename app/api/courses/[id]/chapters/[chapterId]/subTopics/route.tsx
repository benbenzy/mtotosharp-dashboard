import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const body = await request.json();
  console.log('the body ', body);
  try {
    const { data, error } = await supabase.from('sub_topics').insert({
      title: body?.title,
      content: body?.content,
      chapter_id: body?.chapterId,
    });
    if (error) {
      console.log(`failed to create subtopic ${error.message}`);
      return NextResponse.json(`failed to create subtopic ${error.message}`, {
        status: 500,
      });
    }
    console.log('topic created', data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(`failed to create subtopic ${error}`);
    return NextResponse.json(`failed to create subtopic ${error}`, {
      status: 500,
    });
  }
}
