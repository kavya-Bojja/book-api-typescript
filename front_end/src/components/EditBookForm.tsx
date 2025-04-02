import { useState, FormEvent } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

interface Props {
  book: Book;
  onCancel: () => void;
  onSave: (updated: Book) => void;
}

export default function EditBookForm({ book, onCancel, onSave }: Props) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author })
    })
      .then(res => res.json())
      .then((data) => {
        onSave(data);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
      <input value={title} onChange={e => setTitle(e.target.value)} required />
      <input value={author} onChange={e => setAuthor(e.target.value)} required />
      <button type="submit">💾</button>
      <button type="button" onClick={onCancel}>✖️</button>
    </form>
  );
}
