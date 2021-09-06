import express, { Request, Response } from 'express';
import { User } from '../../models/users';

const router = express.Router();

router.delete(
    '/user/:id',
    (request: Request, response: Response) => {
        User.findByIdAndDelete(request.params.id, null, (error: any, userDetail: any) => {
            response.status(201).send(userDetail);
        });
    }
)

export { router as deleteUser};