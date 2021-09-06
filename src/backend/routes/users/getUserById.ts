import express, { Request, Response } from 'express';
import { User } from '../../models/users';

const router = express.Router();

router.get(
    '/user/:id',
    (request: Request, response: Response) => {
        User.findById(request.params.id, (error: any, userDetail: any) => {
            response.status(201).send(userDetail);
        });
    }
)

export { router as getUserById};