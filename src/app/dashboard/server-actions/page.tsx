//handle cache to revalidate always
export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { TodosGrids } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";

export const metadata = {
  title: "TODO list",
  description: "SEO title",
};

export default async function ServerActionsTodos() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div className="">
      <h2 className="text-3xl mb-5">ServerActions</h2>
      <div className="px-3 mx-7 mb-5">
        <NewTodo />
      </div>
      <TodosGrids todos={todos} />
    </div>
  );
}
