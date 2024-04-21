"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Error from "next/error";

export const toogleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id: id } });
  if (!todo) {
    throw "todo not found";
  }
  const udpatedTodo = await prisma.todo.update({
    where: { id: id },
    data: { complete: complete },
  });
  revalidatePath("/dashboard/server-actions");
  return udpatedTodo;
};

export const addTodo = async (
  description: string
): Promise<Todo | { message: string }> => {
  try {
    const todo: Todo = await prisma.todo.create({
      data: { description },
    });
    revalidatePath("/dashboard/server-actions");
    return todo;
  } catch (error) {
    return {
      message: "failed creation",
    };
  }
};

export const deleteCompleted = async () => {
  try {
    await prisma.todo.deleteMany({
      where: { complete: true },
    });
    revalidatePath("/dashboard/server-actions");
  } catch (error) {
    return {
      message: "failed creation",
    };
  }
};