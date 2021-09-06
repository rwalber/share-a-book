import express, { Request, Response } from 'express';
import { User } from '../../models/users';

const router = express.Router();

router.put(
    '/user/:id',
    (request: Request, response: Response) => {
        User.findByIdAndUpdate(request.params.id, request.body, null, (error: any, bookDetail: any) => {
            response.status(201).send({message: 'Success update.'});
        });
    }
)

export { router as updateUser};