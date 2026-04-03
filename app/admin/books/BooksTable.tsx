'use client';

import { useState } from 'react';
import BookActions from './BookActions';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Book = {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  genre: string | null;
  format: string | null;
  featured: boolean;
  published_date: string | null;
  author: { id: string; name: string } | null;
};

function SortableRow({ book }: { book: Book }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: book.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: isDragging ? '#eff6ff' : undefined,
    position: isDragging ? ('relative' as const) : undefined,
    zIndex: isDragging ? 1 : undefined,
  };

  const author = book.author as { name: string } | null;

  return (
    <tr ref={setNodeRef} style={style} className="hover:bg-gray-50 transition-colors">
      {/* Drag handle — hidden on mobile */}
      <td className="py-3 hidden md:table-cell w-8">
        <span
          {...attributes}
          {...listeners}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            color: '#999',
            fontSize: '18px',
            padding: '0 8px',
            display: 'inline-block',
            userSelect: 'none',
            lineHeight: 1,
            touchAction: 'none',
          }}
          title="Drag to reorder"
        >
          ⠿
        </span>
      </td>

      <td className="px-6 py-3">
        {book.cover_image ? (
          <img
            src={book.cover_image}
            alt={book.title}
            className="w-10 h-14 object-cover rounded shadow-sm"
          />
        ) : (
          <div className="w-10 h-14 rounded bg-gray-100 border border-gray-200 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
        )}
      </td>

      <td className="px-6 py-3 font-medium text-gray-900 max-w-xs">
        <div className="truncate">{book.title}</div>
      </td>
      <td className="px-6 py-3 text-gray-600">{author?.name ?? '—'}</td>
      <td className="px-6 py-3 text-gray-600">{book.genre}</td>
      <td className="px-6 py-3 text-gray-600">{book.format}</td>
      <td className="px-6 py-3">
        {book.featured ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            Featured
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
      <td className="px-6 py-3 text-right">
        <BookActions id={book.id} title={book.title} />
      </td>
    </tr>
  );
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function BooksTable({ initialBooks }: { initialBooks: Book[] }) {
  const [books, setBooks] = useState(initialBooks);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = books.findIndex((b) => b.id === active.id);
    const newIndex = books.findIndex((b) => b.id === over.id);
    const prevBooks = books;
    const newBooks = arrayMove(books, oldIndex, newIndex);

    setBooks(newBooks); // optimistic update
    setSaveStatus('saving');

    try {
      const res = await fetch('/api/admin/books/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: newBooks.map((b) => b.id) }),
      });
      if (!res.ok) throw new Error('Server error');
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setBooks(prevBooks); // revert
      setSaveStatus('error');
      alert('Failed to save order. Please try again.');
      setTimeout(() => setSaveStatus('idle'), 100);
    }
  }

  return (
    <>
      {/* Save status indicator */}
      <div
        style={{
          height: '24px',
          marginBottom: '8px',
          transition: 'opacity 0.4s',
          opacity: saveStatus === 'saved' ? 1 : 0,
        }}
      >
        <span className="text-sm font-medium text-green-600">Order saved ✓</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {/* Drag handle header — hidden on mobile */}
                <th className="w-8 hidden md:table-cell" aria-label="Drag handle" />
                <th className="text-left px-6 py-3 font-medium text-gray-600">Cover</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Title</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Author</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Genre</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Format</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Featured</th>
                <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <SortableContext
              items={books.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <tbody className="divide-y divide-gray-100">
                {books.map((book) => (
                  <SortableRow key={book.id} book={book} />
                ))}
              </tbody>
            </SortableContext>
          </table>
        </DndContext>
      </div>
    </>
  );
}
