"use server";

import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  console.log(id, complete);

  const body = {
    complete,
  };
  const todo = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
  return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = {
    description,
  };

  const todo = await fetch(`http://localhost:3000/api/todos`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
  return todo;
};

export const deleteTodos = async (): Promise<void> => {
  await fetch(`http://localhost:3000/api/todos`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};
