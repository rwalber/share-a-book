import express, { Request, Response } from 'express';
import { Book } from '../../models/book';

const router = express.Router();

router.get(
    '/books',
    (request: Request, response: Response) => {
        Book.find({}, (error, listBooks) => {
            response.status(201).send(listBooks);
        });
    }
)

export { router as getBookList};