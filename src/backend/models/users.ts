import mongoose from 'mongoose';
import { BookAttributes } from '../interfaces/book';
import { userAttributes, userDocument, userModel } from '../interfaces/user';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    addressNumber: {
        type: String,
        required:  true
    },
    CEP: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    educationCenter: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    profileThumbnail: {
        type: String,
        required: true
    },
    myBooks: {
        type: Array
    },
    borrowedBooks: {
        type: Array
    },
    iBorrowedBooks: {
        type: Array
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

UserSchema.statics.build = (attrs: userAttributes) => {
    return new User(attrs);
}

const User = mongoose.model<userDocument, userModel>('Book', UserSchema);

export { User };