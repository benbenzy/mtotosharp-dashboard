import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const page = 1;
  const itemsperpage = 2;

  try {
    const { data: plans, error } = await supabase.from('courses').select('*');

    if (error) {
      console.log('faied to load courses', error.message);
      return NextResponse.json([], { status: 500 });
    }

    return NextResponse.json(plans, { status: 200 });
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { title, description, audience, price, category_id, course_duration } =
    await req.json();
  try {
    const plan = await supabase.from('courses').insert({
      title,
      description,
      audience,
      price,
      category_id,
      duration: course_duration,
    });
    if (plan.error) {
      console.log('error creating course', plan.error);
      return NextResponse.json(plan.error, {
        status: 500,
      });
    }
    return NextResponse.json(plan?.data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
