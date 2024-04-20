import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { boolean, object, string } from "yup";

interface Todo {
  description: string;
  complete: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = searchParams.get("take") ?? "10";
  const skip = searchParams.get("skip") ?? "0";
  if (isNaN(+skip)) {
    return NextResponse.json(
      { message: "Skip query needs to be a number" },
      { status: 400 }
    );
  }
  if (isNaN(+take)) {
    return NextResponse.json(
      { message: "Take query needs to be a number" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take: +take,
    skip: +skip,
  });
  return NextResponse.json(todos);
}

const postSchema = object({
  description: string().required(),
  complete: boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo: Todo = await prisma.todo.create({
      data: { complete, description },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.todo.deleteMany({
      where: { complete: true },
    });

    return NextResponse.json('todos deleted');
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}