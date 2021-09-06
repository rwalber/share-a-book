import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Book } from '../../models/book';

const router = express.Router();

router.post(
    '/book', 
    [
        body('title')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('O título do livro deve conter no mínimoe 4 caracteres')
    ]   ,
    (request: Request, response: Response) => {
        const book = Book.build(request.body);
        book.save();

        response.status(201).send(book);
    }
)

export { router as createBook};