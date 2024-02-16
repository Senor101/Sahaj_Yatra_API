import { Schema, model } from "mongoose";

export interface ITransaction {
    amount: number;
    userId: Schema.Types.ObjectId;
    transactionType: string;
    transactionDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

const transactionSchema = new Schema(
    {
        amount: {
            type: Number,
            required: [true, "Amount is required"]
        },
        userId: {
            type: Schema.Types.ObjectId,
            reference: "User",
            required: [true, "User Id is required"]
        },
        transactionDate: {
            type: Date,
            required: [true, "Transaction Date is required"]
        },
        remarks: {
            type: String,
            required: false,
            default: ""
        }
    },
    { timestamps: true }
);

const Transaction = model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
