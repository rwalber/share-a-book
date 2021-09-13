import express, { Request, Response } from 'express';
import { User } from '../../models/users';
import { Book } from '../../models/book';

const router = express.Router();

router.get(
    '/user/:id/lendBooks',
    (request: Request, response: Response) => {
        User.findById(request.params.id, async (error: any, userDetail: any) => {
            const books = await Promise.all(userDetail.borrowedBooks.map( async (id: any) => {
                let foo = await Book.findById(id)
                return foo
            }));
            response.status(201).send(books);
        })
    }
)

export { router as getUserLendBooks};