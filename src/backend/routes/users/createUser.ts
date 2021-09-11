import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../../models/users';

const router = express.Router();

router.post(
    '/user', 
    [
        body('name')
            .trim()
            .isLength({ min: 4, max: 40 }),
        body('address')
            .trim()
            .isLength({ min: 4, max: 40 }),
        body('addressNumber')
            .trim()
            .isLength({ min: 2, max: 10 }),
        body('CEP')
            .trim()
            .isLength({ min: 8, max: 8 }),
        body('email')
            .isEmail()
            .trim(),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 }),
        body('college')
            .trim()
            .isLength({ min: 2, max: 20 }),
        body('educationCenter')
            .trim()
            .isLength({ min: 4, max: 20 }),
        body('course')
            .trim()
            .isLength({ min: 2, max: 20 })
    ],
    (request: Request, response: Response) => {
        const user = User.build(request.body);
        user.save();
        response.status(201).send({success: true});
    }
)

export { router as createUser};