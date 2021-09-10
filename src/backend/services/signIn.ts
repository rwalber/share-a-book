import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/users';
import { Password } from './password';

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

        response.status(200).send(existingUser);
    }
)

export { router as signIn};