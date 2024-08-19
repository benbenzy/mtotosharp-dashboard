import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const supabase = createClient();
  const { title, content, id } = await request.json();

  try {
    const { data, error } = await supabase
      .from('sub_topics')
      .update({ title, content })
      .eq('id', id);
    if (error) {
      console.log('failed to update sub-topic', error.message);
      return NextResponse.json(`failed to upadte ${error.message}`, {
        status: 500,
      });
    }
    return NextResponse.json(`success updated ${data}`, { status: 200 });
  } catch (error) {
    console.log('failed to update sub-topic', error);
    return NextResponse.json(`failed to upadte ${error}`, {
      status: 500,
    });
  }
}
export async function DELETE(request: NextRequest) {
  const supabase = createClient();
  const id = await request.nextUrl.pathname.split('/').pop();
  //console.log('deleted', id);
  const { data, error } = await supabase
    .from('sub_topics')
    .delete()
    .eq('id', id);
  if (error) {
    console.log('failed to update sub-topic', error.message);
    return NextResponse.json(`failed to upadte ${error.message}`, {
      status: 500,
    });
  }
  return NextResponse.json(`deleted ${data}`, { status: 200 });
}
