import mongoose from 'mongoose';
import { userAttributes, userDocument, userModel } from '../interfaces/user';
import { Password } from '../services/password';

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
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
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

UserSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(
            this.get('password')
        );
        this.set('password', hashed);
    }
    done();
});

UserSchema.statics.build = (attrs: userAttributes) => {
    return new User(attrs);
}

const User = mongoose.model<userDocument, userModel>('User', UserSchema);

export { User };