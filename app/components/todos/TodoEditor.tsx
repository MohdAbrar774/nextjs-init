"use client";

import type { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  description: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  busy: boolean;
  onSave: () => Promise<void>;
  taskCount: number;
};

export default function TodoEditor({
  title,
  description,
  setTitle,
  setDescription,
  busy,
  onSave,
  taskCount,
}: Props) {
  return (
    <div className="grid gap-4 rounded-4xl border border-[#5d4b36] bg-[#12181f]/90 p-6 shadow-[inset_0_0_0_1px_rgba(175,144,105,0.12)] sm:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#a68f6a]">Task builder</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#f4ead4]">Create a richer todo.</h2>
        </div>
        <p className="text-sm leading-6 text-[#b7ab91]">
          Add a title and full description so every todo includes enough context to stay actionable.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3">
          <label className="sr-only" htmlFor="todo-title">
            Todo title
          </label>
          <input
            id="todo-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Task title"
            className="h-12 rounded-2xl border border-[#37312a] bg-[#11181b] px-4 text-sm text-[#f2e8d1] placeholder:text-[#7f6f54] focus:border-[#8e6f46] focus:outline-none"
          />
          <label className="sr-only" htmlFor="todo-description">
            Todo description
          </label>
          <textarea
            id="todo-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description: what does this task really mean?"
            rows={4}
            className="resize-none rounded-2xl border border-[#37312a] bg-[#11181b] px-4 py-3 text-sm text-[#f2e8d1] placeholder:text-[#7f6f54] focus:border-[#8e6f46] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#b8a986]">{taskCount} tasks tracked</p>
          <button
            type="button"
            onClick={onSave}
            disabled={busy}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-linear-to-r from-[#8e6f46] to-[#72553e] px-5 text-sm font-semibold text-[#f7ecdb] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Add todo
          </button>
        </div>
      </div>
    </div>
  );
}
