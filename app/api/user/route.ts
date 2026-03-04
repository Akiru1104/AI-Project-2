import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await prisma.user.create({
      data: { email: "test@test.com", id: "2" },
    });
    return NextResponse.json(
      { message: `User created succssesfully` },
      { status: 201 },
    );
  } catch (error) {
    return new Response(`Error creating user`, { status: 500 });
  }
}
