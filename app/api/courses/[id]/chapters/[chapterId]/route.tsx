import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const chapter_id = request.nextUrl.pathname.split('/').pop();
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', chapter_id);
    if (error) {
      console.log('failed to get chapter', error);
      return NextResponse.json('failed to get chapter', { status: 500 });
    }
    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    console.log('failed to get chapter', error);
    return NextResponse.json('failed to get chapter', { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const chapter_id = request.nextUrl.pathname.split('/').pop();
  const body = await request.json();

  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('chapters')
      .update({ ...body })
      .eq('id', chapter_id)
      .select();
    if (error) {
      console.log('failed to update chapter', error);
      return NextResponse.json('failed to update chapter', { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log('failed to update chapter', error);
    return NextResponse.json('failed to update chapter', { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  const chapter_id = request.nextUrl.pathname.split('/').pop();
  const supabase = createClient();
  try {
    const { error, data } = await supabase
      .from('chapters')
      .delete()
      .eq('id', chapter_id);
    if (error) {
      console.log('failed to delete chapter', error);
      return NextResponse.json('failed to delete chapter', { status: 500 });
    }
    console.log('this is the response', data);
    return NextResponse.json(`"deletd"${data}`, { status: 200 });
  } catch (error) {
    console.log('failed to delete chapter', error);
    return NextResponse.json('failed to delete chapter', { status: 500 });
  }
}
