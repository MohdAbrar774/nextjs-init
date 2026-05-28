"use client";

import { useEffect, useState } from "react";
import TodoEditor from "./TodoEditor";
import TodoItem from "./TodoItem";
import type { Todo } from "./types";

export default function TodosClient() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [feedback, setFeedback] = useState<string>("");
  const [busy, setBusy] = useState(false);

  const fetchTodos = async () => {
    setBusy(true);
    try {
      const response = await fetch("/api/todos", { cache: "no-store" });
      const payload = await response.json();
      if (payload.success && Array.isArray(payload.data)) {
        setTodos(payload.data);
        setFeedback("");
      } else {
        setFeedback("Unable to load todos.");
      }
    } catch {
      setFeedback("Network error while loading todos.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    void fetchTodos();
  }, []);

  const createTodo = async () => {
    if (!newTitle.trim()) {
      setFeedback("Give the new task a name first.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim(), description: newDescription.trim() }),
      });
      const payload = await response.json();
      if (payload.success && payload.data) {
        setTodos((current) => [payload.data, ...current]);
        setNewTitle("");
        setNewDescription("");
        setFeedback("New todo added.");
      } else {
        setFeedback(payload.error || "Failed to add todo.");
      }
    } catch {
      setFeedback("Unable to reach the server.");
    } finally {
      setBusy(false);
    }
  };

  const removeTodo = async (id: string) => {
    setBusy(true);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      const payload = await response.json();
      if (payload.success) {
        setTodos((current) => current.filter((todo) => todo.id !== id));
        setFeedback("Todo removed.");
      } else {
        setFeedback(payload.error || "Failed to remove todo.");
      }
    } catch {
      setFeedback("Unable to reach the server.");
    } finally {
      setBusy(false);
    }
  };

  const completeTodo = async (id: string) => {
    setBusy(true);
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      const payload = await response.json();
      if (payload.success && payload.data) {
        setTodos((current) => current.map((todo) => (todo.id === id ? payload.data : todo)));
        setFeedback("Todo marked complete.");
      } else {
        setFeedback(payload.error || "Failed to complete todo.");
      }
    } catch {
      setFeedback("Unable to reach the server.");
    } finally {
      setBusy(false);
    }
  };

  const saveEdit = async () => {
    if (!editTitle.trim() || !editId) {
      setFeedback("Enter a title to save the edit.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(`/api/todos/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle.trim(), description: editDescription.trim() }),
      });
      const payload = await response.json();
      if (payload.success && payload.data) {
        setTodos((current) => current.map((todo) => (todo.id === editId ? payload.data : todo)));
        setEditId(null);
        setEditTitle("");
        setEditDescription("");
        setFeedback("Todo updated.");
      } else {
        setFeedback(payload.error || "Failed to update todo.");
      }
    } catch {
      setFeedback("Unable to reach the server.");
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setFeedback("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
    setFeedback("");
  };

  return (
    <section className="w-full max-w-6xl rounded-3xl border border-[#5a482f] bg-[#101617]/95 p-6 shadow-[0_32px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
      <div className="mb-6 space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#9a7b55]">Product</p>
            <h1 className="text-3xl font-semibold text-[#f5eedf] sm:text-4xl">Todo Product Panel</h1>
          </div>
          <p className="max-w-xl text-sm text-[#b9aa91] sm:text-base">
            Use the API to add, complete, and delete todos from a clean dark product interface.
          </p>
        </div>

        <TodoEditor
          title={newTitle}
          description={newDescription}
          setTitle={setNewTitle}
          setDescription={setNewDescription}
          busy={busy}
          onSave={createTodo}
          taskCount={todos.length}
        />
      </div>

      {feedback ? (
        <div className="rounded-3xl border border-[#5c4b33] bg-[#12181b] px-5 py-4 text-sm text-[#d7c2a5] shadow-sm shadow-[#00000022]">
          {feedback}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {todos.length === 0 ? (
          <div className="col-span-full rounded-4xl border border-dashed border-[#5c4b33] bg-[#11181a] p-10 text-center text-[#bbb096] shadow-inner shadow-[#00000022]">
            <p className="text-lg font-semibold text-[#e5d8c5]">Your board is clean.</p>
            <p className="mt-3 text-sm leading-6">Add a task to see it appear in a product-ready workspace.</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editId === todo.id}
              editTitle={editTitle}
              editDescription={editDescription}
              busy={busy}
              setEditTitle={setEditTitle}
              setEditDescription={setEditDescription}
              onEdit={() => startEdit(todo)}
              onCancel={cancelEdit}
              onSave={saveEdit}
              onRemove={() => removeTodo(todo.id)}
              onComplete={() => completeTodo(todo.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
