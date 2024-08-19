import prisma from "@/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const EMAIL_TOKEN_EXPIRATION_IN_MINUTES = 3;
const JWT_SECRET = process.env.AUTH_SECRET!;
function generateEmailToken(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
const emailToken = generateEmailToken();
const expiration = new Date(
  new Date().getTime() + EMAIL_TOKEN_EXPIRATION_IN_MINUTES * 60 * 1000
);

function generateAuthToken(tokenId: number): string {
  const jwtPayload = { tokenId };
  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: "HS256",
    noTimestamp: true,
  });
}

export async function POST(req: Request) {
  const { email, phone } = await req.json();
  await prisma.$connect();

  try {
    const usedEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (!usedEmail) {
      return NextResponse.json(
        {
          message: "email no registered kindly signup or check email for error",
        },
        { status: 403 }
      );
    }

    const usedPhone = await prisma.user.findUnique({
      where: { phone },
    });
    if (!usedPhone) {
      return NextResponse.json(
        {
          message:
            "phone not registered kindly signup or check phone for errors",
        },
        { status: 403 }
      );
    }

    const result = await prisma.token.create({
      data: {
        type: "EMAIL",
        emailToken,
        expiration,
        user: {
          connect: {
            email,
          },
        },
      },
    });

    //to do send code to phone or email
    return NextResponse.json(
      {
        message: "success confirm a six digit code was sent to your email",
        data: result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    NextResponse.json(
      { message: "failed to login", error: error.message },
      { status: 500 }
    );
  }
}
