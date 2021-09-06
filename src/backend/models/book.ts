import mongoose from 'mongoose';
import { BookAttributes, BookDocument, BookModel  } from '../interfaces/book';

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    publisher: {
        type: String,
        required: true
    },
    year: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
            versionKey: false
        }
    }
)

BookSchema.statics.build = (attrs: BookAttributes) => {
    return new Book(attrs);
}

const Book = mongoose.model<BookDocument, BookModel>('Book', BookSchema);

export { Book };