import { connectToDatabase } from '@/app/helpers/server.helpers';
import { db } from '@/firebase/server';
import prisma from '@/prisma';
import { createClient } from '@/utils/supabase/server';
import { getAuth } from 'firebase-admin/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const id = req.nextUrl.pathname.split('/').pop();
  try {
    if (!id) {
      return new NextResponse('user not found is is required', { status: 400 });
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.log(`==>error loading user api ${error?.message}`);
      return new NextResponse(`==>error loading user api ${error?.message}`, {
        status: 500,
      });
    }
    console.log(`==>loaded user ${data}`);
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse(`'internal error loading user'${error}`, {
      status: 500,
    });
  }
}
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();
  try {
    if (!id) {
      return NextResponse.json('failed to delete id is required', {
        status: 400,
      });
    }
    await getAuth()
      .deleteUser(id)
      .then(async () => {
        await db?.collection('users').doc(id).delete();
      });
    return NextResponse.json('success', { status: 200 });
  } catch (error) {
    return NextResponse.json(`error deleting user${error}`, { status: 500 });
  }
}
