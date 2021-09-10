import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { User } from '../models/users';
import { Password } from './password';
import { userAttributes, userDocument } from '../interfaces/user';

const router = express.Router();

router.post(
    '/user/sign_in',
    [
        body('email')
            .isEmail(),
        body('password')
            .trim()
    ],
    async (request: Request, response: Response) => {
        const { email, password } = request.body;

        const existingUser: any = await User.findOne({ email });
        if (!existingUser) {
            response.status(400).send("Credenciais inválidas");
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);
        if (!passwordsMatch) {
            response.status(400).send("Credenciais inválidas");
        }
        let sendDataUser = {
            id: existingUser.id,
            name: existingUser.name,
            college: existingUser.college,
            educationCenter: existingUser.educationCenter,
            course: existingUser.course,
            profileThumbnail: existingUser.profileThumbnail
        }
        response.status(201).send(sendDataUser);
    }
)

export { router as signIn};