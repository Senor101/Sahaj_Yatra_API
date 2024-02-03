import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    phoneNumber: string | number;
    citizenshipNumber: string;
    rfidNumber?: string;
    isVerified?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        phoneNumber: {
            type: String || Number,
            required: [true, 'Phone Number is required'],
            unique: true
        },
        citizenshipNumber: {
            type: String,
            required: [true, 'Citizenship Number is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        rfidNumber: {
            type: String
        },
        isVerified: {
            type: Boolean,
            index: true,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const User = model<IUser>('User', userSchema);

export default User;
