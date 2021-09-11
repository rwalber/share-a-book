import cors from 'cors';
import express from 'express';
import { json } from 'body-parser';

// book routes
import { createBook } from './routes/book/createBook';
import { updateBook } from './routes/book/updateBook';
import { deleteBook } from './routes/book/deleteBook';
import { getBookById } from './routes/book/getBookById';
import { getBookList } from './routes/book/getBookList';

// users routes
import { createUser } from './routes/users/createUser';
import { updateUser } from './routes/users/updateUser';
import { deleteUser } from './routes/users/deteleUser';
import { getUserById } from './routes/users/getUserById';
import { getUserList } from './routes/users/getUserList';
import { signIn } from './services/signIn';
import { lendBook } from './routes/book/lendBook';
import { giveBackBook } from './routes/book/giveBackBooks';

const app = express();

app.use(cors());

app.use(json());

// book routes
app.use(
    createBook, 
    deleteBook,
    updateBook,
    getBookById,
    getBookList
)

// users routes
app.use(
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    getUserList,
    signIn,
    lendBook,
    giveBackBook,
)

export { app }