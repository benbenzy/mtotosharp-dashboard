import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
export async function GET() {
  const supabase = createClient();
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*');
    if (error) {
      console.log('error fetching categories api', error);
      return NextResponse.json([], { status: 500 });
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `failed to fetch categories ${error}` },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { name } = await req.json();
    const { data, error } = await supabase.from('categories').insert({ name });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `failed to create category ${error}` },
      { status: 500 }
    );
  }
}
