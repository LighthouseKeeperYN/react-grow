'use client';

import { db } from '@/app/api/db';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const createNote = async (e: React.FormEvent) => {
    e.preventDefault();

    await db.collection('notes').create({ title, content });

    setTitle('');
    setContent('');

    router.refresh();
  };

  return (
    <form className="flex flex-col items-center gap-2 p-2 w-fit mb-12" onSubmit={createNote}>
      <h3>Create new Note</h3>
      <input
        className="w-full p-2 rounded outline-none"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full h-40 p-2 rounded outline-none"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-blue-400 text-white rounded p-2 hover:bg-blue-500" type="submit">
        Create Note
      </button>
    </form>
  );
}

export default CreateNote;
