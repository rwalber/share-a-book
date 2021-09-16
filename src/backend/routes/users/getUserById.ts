import express, { Request, Response } from 'express';
import { User } from '../../models/users';

const router = express.Router();

router.get(
    '/user/:id',
    (request: Request, response: Response) => {
        User.findById(request.params.id, (error: any, userDetail: any) => {
            let sendDataUser = {
                id: userDetail.id,
                name: userDetail.name,
                college: userDetail.college,
                educationCenter: userDetail.educationCenter,
                course: userDetail.course,
                profileThumbnail: userDetail.profileThumbnail,
                borrowedBooks: userDetail.borrowedBooks
            }
            response.status(201).send(sendDataUser);
        });
    }
)

export { router as getUserById};