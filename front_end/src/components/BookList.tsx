import { useState } from 'react';
import EditBookForm from './EditBookForm';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface Props {
  books: Book[];
  onDelete: (id: number) => void;
  onUpdate: (updatedBook: Book) => void;
}

export default function BookList({ books, onDelete, onUpdate }: Props) {
  const [editBookId, setEditBookId] = useState<number | null>(null);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          fontWeight: 'bold',
          padding: '0.5rem 0',
          borderBottom: '1px solid #ccc',
        }}
      >
        <div style={{ flex: 3 }}>Title</div>
        <div style={{ flex: 2 }}>Author</div>
        <div style={{ flex: 2 }}>Actions</div>
      </div>

      {books.map(book => (
        <div
          key={book.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0',
            borderBottom: '1px solid #eee',
          }}
        >
          {editBookId === book.id ? (
            <EditBookForm
              book={book}
              onCancel={() => setEditBookId(null)}
              onSave={(updated) => {
                onUpdate(updated);
                setEditBookId(null);
              }}
            />
          ) : (
            <>
              <div style={{ flex: 3 }}>
                <strong>{book.title}</strong>
              </div>
              <div style={{ flex: 2 }}>{book.author}</div>
              <div style={{ flex: 2, display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setEditBookId(book.id)}>✏️ Edit</button>
                <button onClick={() => onDelete(book.id)}>🗑️ Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
