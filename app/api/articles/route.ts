import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        user: true,
        quizzes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("GET /api/articles error:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, content, summary, clerkId, userId } = body;

    if (!title || !content || !clerkId || !userId) {
      return NextResponse.json(
        { error: "title, content, clerkId, userId required" },
        { status: 400 },
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        summary: summary ?? "",
        clerkId,
        userId,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("POST /api/articles error:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 },
    );
  }
}
