import TodosClient from "@/app/components/todos/TodosClient";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(129,107,82,0.22),transparent_35%),linear-gradient(180deg,#0b1113_0%,#090c0e_100%)] text-[#e6d8c0]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-[#f4ead4] sm:text-5xl">My Todo List</h1>
          <p className="max-w-2xl text-base leading-7 text-[#b8a986] sm:text-lg">
            Organize and manage your tasks efficiently.
          </p>
        </div>
        <TodosClient />
      </div>
    </main>
  );
}
