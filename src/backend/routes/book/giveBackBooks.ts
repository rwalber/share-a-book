import express, { Request, Response } from 'express';
import { Book } from '../../models/book';
import { User } from '../../models/users';

const router = express.Router();

router.put('/book/back/:idUser/:idBook',
    (request: Request, response: Response) => {
        User.findById(request.params.idUser, (error: any, user: any) => {
            let existInArray = user.borrowedBooks.find((id: any) => id === request.params.idBook);
            if(existInArray) {
                let newBorrowedBooks = user.borrowedBooks.filter((el: any) => el.toLowerCase().indexOf(existInArray.toLowerCase()) < -1)
                User.findByIdAndUpdate(request.params.idUser, { borrowedBooks: newBorrowedBooks }, null, (error: any, user: any) => {
                    // response.status(201).send({message: 'Success update.'});
                });
            }
        });
        Book.findByIdAndUpdate(request.params.idBook, { status: true }, null, (error: any, bookDetail: any) => {
            response.status(201).send({message: 'Success update.'});
        });
    }
)

export { router as giveBackBook};