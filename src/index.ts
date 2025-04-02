import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(cors())

app.use(express.json());

interface Book {
  id: number;
  title: string;
  author: string;
}

let books: Book[] = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho' }
];

// Route: GET all books
app.get('/books', (req: Request, res: Response) => {
  res.json(books);
});

// Route: GET book by ID
app.get('/books/:id', (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  res.json(book);
});

// Route: POST a new book
app.post('/books', (req: Request, res: Response) => {
  const { title, author } = req.body;
  const newBook: Book = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
app.put('/books/:id', (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;
    const index = books.findIndex(b => b.id === bookId);
  
    if (index === -1) return res.status(404).send('Book not found');
  
    books[index] = { id: bookId, title, author };
    res.json(books[index]);
  });
  
  // Delete a book
  app.delete('/books/:id', (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === bookId);
  
    if (index === -1) return res.status(404).send('Book not found');
  
    const removed = books.splice(index, 1);
    res.json(removed[0]);
  });
  
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
