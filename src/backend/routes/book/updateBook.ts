import express, { Request, Response } from 'express';
import { Book } from '../../models/book';

const router = express.Router();

router.put(
    '/book/:id',
    (request: Request, response: Response) => {
        Book.findByIdAndUpdate(request.params.id, request.body, null, (error: any, bookDetail: any) => {
            response.status(201).send({message: 'Success update.'});
        });
    }
)

export { router as updateBook};