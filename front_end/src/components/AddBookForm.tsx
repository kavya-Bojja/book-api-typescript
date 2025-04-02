import { useState, FormEvent } from 'react';

interface Props {
  onBookAdded: () => void;
}

export default function AddBookForm({ onBookAdded }: Props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author })
    })
      .then(res => res.json())
      .then(() => {
        setTitle('');
        setAuthor('');
        onBookAdded();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
      <button type="submit">Add</button>
    </form>
  );
}
