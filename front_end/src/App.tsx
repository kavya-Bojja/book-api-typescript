import { useEffect, useState } from 'react';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';

interface Book {
  id: number;
  title: string;
  author: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = () => {
    fetch('http://localhost:3000/books')
      .then(res => res.json())
      .then(data => setBooks(data));
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/books/${id}`, { method: 'DELETE' })
      .then(() => fetchBooks());
  };

  const handleUpdate = (updated: Book) => {
    setBooks(prev =>
      prev.map(book => (book.id === updated.id ? updated : book))
    );
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 Book Manager</h1>
      <AddBookForm onBookAdded={fetchBooks} />
      <BookList books={books} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
