import express, { Request, Response } from 'express';
import { Book } from '../../models/book';

const router = express.Router();

router.delete(
    '/book/:id',
    (request: Request, response: Response) => {
        Book.findByIdAndDelete(request.params.id, null, (error: any, bookDetail: any) => {
            response.status(201).send(bookDetail);
        });
    }
)

export { router as deleteBook};