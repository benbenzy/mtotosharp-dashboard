import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const role = await prisma.team.findMany();
    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    return NextResponse.json("failed", { status: 500 });
  }
}
export async function POST(req: Request) {
  const { name, role, adminID } = await req.json();
  try {
    const res = await prisma.team.create({ data: { name, adminID, role } });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json("failed", { status: 500 });
  }
}
export async function PATCH(req: Request) {
  const { name, role, adminID, id } = await req.json();
  try {
    const res = await prisma.team.update({
      data: { name, adminID, role },
      where: { id },
    });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json("failed", { status: 500 });
  }
}
