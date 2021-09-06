import express, { Request, Response } from 'express';
import { Book } from '../../models/book';

const router = express.Router();

router.get(
    '/book/:id',
    (request: Request, response: Response) => {
        Book.findById(request.params.id, (error: any, bookDetail: any) => {
            response.status(201).send(bookDetail);
        });
    }
)

export { router as getBookById};