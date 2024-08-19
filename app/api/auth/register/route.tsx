import { connectToDatabase } from "@/app/helpers/server.helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, password, phone } = await req.json();
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: "invalid details" }, { status: 422 });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashPassword,
        phone,
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log("failed to create user", error);
    return NextResponse.json(
      { message: "failed to create user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
