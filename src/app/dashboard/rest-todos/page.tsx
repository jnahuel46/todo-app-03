import prisma from "@/lib/prisma";
import { TodosGrids } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";

export const metadata = {
  title: "TODO list",
  description: "SEO title",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div className="">
      <div className="px-3 mx-7 mb-5">
        <NewTodo />
      </div>
      <TodosGrids todos={todos} />
    </div>
  );
}
