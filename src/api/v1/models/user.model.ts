import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    phoneNumber: string | number;
    citizenshipNumber: string;
    rfidNumber?: string;
    isVerified?: boolean;
    onBoard: boolean;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    location: {
        lastLatitude:number,
        lastLongitude:number,
        currentLatitude: number,
        currentLongitude:number
    }
}

const userLocationSchema = new Schema({
    lastLatitude: {
        type: Number,
        default: 0
    },
    lastLongitude: {
        type: Number,
        default: 0
    },
    currentLatitude: {
        type: Number,
        default: 0
    },
    currentLongitude: {
        type: Number,
        default: 0
    }
});

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
            type: String,
            unique: true
        },
        amount: {
            type:Number,
            default: 0,
        },
        onBoard: {
            type: Boolean,
            default: false,
        },
        location: userLocationSchema,
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
