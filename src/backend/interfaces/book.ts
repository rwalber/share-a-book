import mongoose from 'mongoose';

interface BookAttributes {
    title: string,
    subtitle?: string,
    publisher: string,
    year: number,
    thumbnail: string,
    description: string,
    status: boolean,
    id?: string
}

interface BookDocument extends mongoose.Document {
    title: string,
    subtitle?: string,
    publisher: string,
    year: number,
    thumbnail: string,
    description: string,
    status: boolean
}

interface BookModel extends mongoose.Model<BookDocument> {
    build(attrs: BookAttributes): BookDocument;
}

export { BookAttributes, BookDocument, BookModel }