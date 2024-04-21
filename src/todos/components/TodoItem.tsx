"use client";

import { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOpt, setTodoOpt] = useOptimistic(
    todo,
    (state, newCompeletedValue: boolean) => ({
      ...state,
      complete: newCompeletedValue,
    })
  );

  const onToogleTodo = async () => {
    try {
      startTransition(() => {
        setTodoOpt(!todoOpt.complete);
      });
      await toggleTodo(todoOpt.id, !todoOpt?.complete);
    } catch (error) {
      setTodoOpt(!todoOpt.complete);
    }
  };

  return (
    <div className={todoOpt?.complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-row sm:flex-row justify-start items-center gap-4">
        <div
          onClick={() => onToogleTodo()}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100 ${
            todoOpt?.complete ? "bg-blue-100" : "bg-red-100"
          }`}
        >
          {todoOpt?.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">{todoOpt?.description}</div>
      </div>
    </div>
  );
};
