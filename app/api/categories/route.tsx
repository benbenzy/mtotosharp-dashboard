import { connectToDatabase } from '@/app/helpers/server.helpers';
import prisma from '@/prisma';
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
    await connectToDatabase();
    const { name } = await req.json();
    const cat = await prisma.category.create({ data: { name } });
    return NextResponse.json(cat, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `failed to create category ${error}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
export async function DELETE(req: Request) {
  await connectToDatabase();
  try {
    const { id } = await req.json();
    await prisma.category.delete(id);
    return NextResponse.json({ message: 'success deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `failed to delete category ${error}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
