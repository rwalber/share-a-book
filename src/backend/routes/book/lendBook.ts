import express, { Request, Response } from 'express';
import { Book } from '../../models/book';
import { User } from '../../models/users';

const router = express.Router();

router.put(
    '/book/lend/:idUser/:idBook',
    (request: Request, response: Response) => {
        Book.findByIdAndUpdate(request.params.idBook, { status: false }, null, (error: any, bookDetail: any) => {
            // response.status(201).send({message: 'Success update.'});
        });
        let arrayBooks: any[] = [];
        User.findById(request.params.idUser, (error: any, user: any) => {
            arrayBooks = user.borrowedBooks;
            arrayBooks.push(request.params.idBook);
            User.findByIdAndUpdate(request.params.idUser, {borrowedBooks: arrayBooks}, null, (error: any, userDetail: any) => {
                response.status(201).send({message: 'Success update.'});
            });
        });
    }
)

export { router as lendBook};