import Link from "next/link";
import { prisma } from "@/db";
import TodoItem from "@/components/TodoItem";

// function getTodos() {
//   return prisma.todo.findMany();
// }

async function toggleTodo(id: string, complete: boolean) {
  "use server"   // this line is used to create a server function
  await prisma.todo.update({ where: {id}, data:{complete} })
} 

export default async function Home() {
  // await prisma.todo.create({
  //   data: {
  //     title: "Buy milk",
  //     complete: false,
  //   },
  // });
  const todos = await prisma.todo.findMany();
  // const todos  await getTodos();  // another way of fetching all the todos by calling a function 
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-4xl"> Todos</h1>
        <Link className="borderborder-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
         href="/new">New</Link>
      </header>
      <ul className="pl-4">
          {todos.map((todo) => (
          //  <li key={todo.id}>{todo.title}</li>
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
            )) }
  
      </ul>
    </>
  );
}