"use client";

import type { Todo } from "./types";

type Props = {
  todo: Todo;
  isEditing: boolean;
  editTitle: string;
  editDescription: string;
  busy: boolean;
  setEditTitle: (value: string) => void;
  setEditDescription: (value: string) => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => Promise<void>;
  onRemove: () => Promise<void>;
  onComplete: () => Promise<void>;
};

export default function TodoItem({
  todo,
  isEditing,
  editTitle,
  editDescription,
  busy,
  setEditTitle,
  setEditDescription,
  onEdit,
  onCancel,
  onSave,
  onRemove,
  onComplete,
}: Props) {
  const isCompleted = todo.completed;

  return (
    <article className="group overflow-hidden rounded-4xl border border-[#3f3526] bg-[#11191d] p-6 shadow-[0_14px_50px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_80px_rgba(0,0,0,0.32)]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#9f8a67]">{isCompleted ? "Completed" : "Pending"}</p>
          <h3 className={`mt-3 text-2xl font-semibold ${isCompleted ? "text-[#9aa288]" : "text-[#f4ead4]"}`}>
            {todo.title}
          </h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${isCompleted ? "bg-[#334236] text-[#b0b89d]" : "bg-[#3a2f21] text-[#d7bb8d]"}`}>
          {new Date(todo.createdAt).toLocaleDateString()}
        </span>
      </div>

      {isEditing && !isCompleted ? (
        <div className="space-y-4">
          <input
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            className="w-full rounded-2xl border border-[#5f5039] bg-[#131c1f] px-4 py-3 text-sm text-[#f2e6cf] outline-none placeholder:text-[#85765c]"
            placeholder="Edit title"
          />
          <textarea
            value={editDescription}
            onChange={(event) => setEditDescription(event.target.value)}
            rows={4}
            className="w-full resize-none rounded-2xl border border-[#5f5039] bg-[#131c1f] px-4 py-3 text-sm text-[#f2e6cf] outline-none placeholder:text-[#85765c]"
            placeholder="Edit description"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onSave}
              disabled={busy}
              className="inline-flex items-center justify-center rounded-2xl bg-[#7a5d42] px-4 py-2 text-sm font-semibold text-[#f9f1dd] transition hover:brightness-110 disabled:opacity-60"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-2xl border border-[#5f5039] bg-transparent px-4 py-2 text-sm text-[#c4b191] transition hover:bg-[#2f271c]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className={`text-sm leading-7 ${isCompleted ? "text-[#b2b999]" : "text-[#b7a786]"}`}>
            {todo.description || "No description provided."}
          </p>
          <div className="flex flex-wrap gap-3">
            {!isCompleted && (
              <button
                type="button"
                onClick={onEdit}
                className="inline-flex items-center justify-center rounded-2xl border border-[#5b482f] bg-[#2a231b] px-4 py-2 text-sm text-[#e7d8be] transition hover:bg-[#3b2f24]"
              >
                Edit
              </button>
            )}
            {!isCompleted && (
              <button
                type="button"
                onClick={onComplete}
                disabled={busy}
                className="inline-flex items-center justify-center rounded-2xl bg-[#6b6043] px-4 py-2 text-sm font-semibold text-[#f5eed4] transition hover:brightness-110 disabled:opacity-60"
              >
                Complete
              </button>
            )}
            <button
              type="button"
              onClick={onRemove}
              disabled={busy}
              className="inline-flex items-center justify-center rounded-2xl bg-[#6b4a38] px-4 py-2 text-sm font-semibold text-[#f6e8d8] transition hover:brightness-110 disabled:opacity-60"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
