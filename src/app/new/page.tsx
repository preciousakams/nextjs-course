import Link from "next/link";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

// server action
async function createTodo(data: FormData) {
  "use server"
  const title = data.get("title")?.valueOf();
  if(typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  } 
  await prisma.todo.create({ 
    data: { 
      title,
      complete: false }
   })
   redirect("/")
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between item-center mb-4">
        <h1 className="text-2xl">New</h1>
    </header>
    <form action={createTodo} className="flex flex-col gap-2">
      <input 
      type="text" 
      name="title"
      placeholder="Title"
      className="border border-slate-300 bg-transparent px-2 py-1 rounded focus-within:border-slate-100 outline-none" 
      />
      <div className="flex justify-end gap-1">
        <Link href=".." className="borderborder-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>
        <button type="submit" className="borderborder-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Create</button>
      </div>
    </form>
    </>
  );
}