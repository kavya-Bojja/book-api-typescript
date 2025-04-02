// Import express and types
import express, { Request, Response } from 'express';

// Create an express app
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// Define a TypeScript interface for Book
interface Book {
  id: number;
  title: string;
  author: string;
}

// Sample data
let books: Book[] = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho' }
];

// Route: GET all books
app.get('/books', (req: Request, res: Response) => {
  res.json(books);
});

// Route: GET a book by ID
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

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
