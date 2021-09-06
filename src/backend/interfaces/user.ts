import mongoose from 'mongoose';
import { BookAttributes } from './book';

interface userAttributes {
    name: string,
    phone?: string,
    address: string,
    addressNumber: number,
    CEP: string,
    email: string,
    password: string,
    college: string,
    educationCenter: string,
    course: string,
    profileThumbnail: string,
    myBooks: BookAttributes[],
    borrowedBooks: BookAttributes[],
    iBorrowedBooks: BookAttributes[]
}

interface userDocument extends mongoose.Document {
    name: string,
    phone?: string,
    address: string,
    addressNumber: number,
    CEP: string,
    email: string,
    password: string,
    college: string,
    educationCenter: string,
    course: string,
    profileThumbnail: string,
    myBooks: BookAttributes[],
    borrowedBooks: BookAttributes[],
    iBorrowedBooks: BookAttributes[]
}

interface userModel extends mongoose.Model<userDocument> {
    build(attrs: userAttributes): userDocument;
}

export { userAttributes, userDocument, userModel }