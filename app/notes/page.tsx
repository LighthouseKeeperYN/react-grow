import Link from 'next/link';
import { NotesResponse } from '@/pocketbase-types';
import { db } from '@/app/api/db';
import CreateNote from './[id]/CreateNote';

export const dynamic = 'auto';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'auto';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

async function getNotes() {
  const data = await db.collection<NotesResponse>('notes').getList();
  return data.items;
}

async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <CreateNote />

      <div className="flex flex-wrap gap-2 p-2">
        {notes.map((note) => (<Note key={note.id} note={note} />))}
      </div>
    </div>
  );
}

function Note({ note }: { note: NotesResponse}) {
  const { id, title, content, created } = note || {};

  return (
    <Link
      href={`/notes/${id}`}
      className="p-2 bg-yellow-100 rounded border-4 border-white hover:bg-yellow-200 min-h-40"
    >
      <div>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}

export default NotesPage;
