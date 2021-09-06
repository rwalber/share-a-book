import cors from 'cors';
import express from 'express';
import { json } from 'body-parser';

// book routs
import { createBook } from './routes/book/createBook';
import { deleteBook } from './routes/book/deleteBook';
import { updateBook } from './routes/book/updateBook';
import { getBookById } from './routes/book/getBookById';
import { getBookList } from './routes/book/getBookList';

const app = express();

app.use(cors());

app.use(json());

// book routs
app.use(
    createBook, 
    deleteBook,
    updateBook,
    getBookById,
    getBookList
)

export { app }