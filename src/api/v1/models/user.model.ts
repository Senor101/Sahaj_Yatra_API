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
    },
    token?: string;
}

const userLocationSchema = new Schema({
    lastLatitude: {
        type: Number,
    },
    lastLongitude: {
        type: Number,
    },
    currentLatitude: {
        type: Number,
    },
    currentLongitude: {
        type: Number,
    }
}, {_id:false});

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
        location: {
            type: userLocationSchema,
            default : {
                lastLatitude: 0,
                lastLongitude:0,
                currentLatitude: 0,
                currentLongitude: 0,
            }
        },
        isVerified: {
            type: Boolean,
            index: true,
            default: false
        },
        token:{
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const User = model<IUser>('User', userSchema);

export default User;
