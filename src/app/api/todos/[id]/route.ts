import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import { object, string, boolean } from "yup";

interface Args {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  return todo;
};

export async function GET(request: Request, args: Args) {
  const { params } = args;

  const todo = getTodo(params.id);

  if (!todo) {
    return NextResponse.json(
      { message: "Todo id doesnt found" },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

const putSchema = object({
  description: string().optional(),
  complete: boolean().optional(),
});

export async function PUT(request: Request, args: Args) {
  const { params } = args;

  const todo = await prisma.todo.findUnique({
    where: {
      id: params.id,
    },
  });
  try {
    if (!todo) {
      return NextResponse.json(
        { message: "Todo id doesnt found" },
        { status: 404 }
      );
    }
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
