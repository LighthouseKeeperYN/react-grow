import { db } from '@/app/api/db';
import { NotesResponse } from '@/pocketbase-types';

async function getNote(id: string) {
  const record = await db.collection<NotesResponse>('notes').getOne(id);
  return record;
}

export type NotePageProps = {
  params: {
    id: string
  }
}

async function NotePage({ params }: NotePageProps) {
  const { title, content, created, id } = await getNote(params.id);

  return (
    <div className="flex justify-center">
      <div className="bg-yellow-100 p-10 mt-10 min-h-80">
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </div>
  );
}

export default NotePage;
