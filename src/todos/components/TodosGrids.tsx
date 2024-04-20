'use client'

import { Todo } from "@prisma/client";
import React from "react";
import { TodoItem } from "..";
import { updateTodo } from "../helpers/todo";
import { useRouter } from "next/navigation";

interface Props {
  todos?: Todo[];
}

export const TodosGrids = ({ todos = [] }: Props) => {
  const router = useRouter();

  const toggleTodo = async (id: string, complete: boolean) => {
    const updatedTodo = await updateTodo(id, complete);
    router.refresh();
    return updatedTodo
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />;
      })}
    </div>
  );
};
