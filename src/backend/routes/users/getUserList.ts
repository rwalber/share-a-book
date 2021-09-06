import express, { Request, Response } from 'express';
import { User } from '../../models/users';

const router = express.Router();

router.get(
    '/users',
    (request: Request, response: Response) => {
        User.find({}, (error, userList) => {
            response.status(201).send(userList);
        });
    }
)

export { router as getUserList};