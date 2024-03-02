import { Document, Schema, model } from "mongoose";

export interface IBus extends Document {
    busNumber: string;
    busType: string;
    busRoute?: string;
    busSeats?: number;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
    busOwner?: IBusOwner;
    sale:[{
        amount: number,
        date: Date
    
    }];
    createdAt: Date;
    updatedAt: Date;
}

export interface IBusOwner extends Document {
    username: string;
    email: string;
    phoneNumber: string;
    password?: string;
    buses?: [IBus];
    token? : string;
    createdAt: Date;
    updatedAt: Date;
}
const saleSchema = new Schema({
    amount: {
        type: Number,
    },
    date: {
        type: Date,
    }
}, { _id: false });

const busSchema: Schema = new Schema(
    {
        busNumber: {
            type: String,
            required: [true, "Bus Number is required"],
            trim: true
        },
        busType: {
            type: String,
            required: [true, "Bus Type is required"],
            trim: true
        },
        busRoute: {
            type: String,
            required: false,
            trim: true
        },
        busSeats: {
            type: Number,
            required: false
        },
        currentLocation: {
            latitude: {
                type: Number,
                required: [true, "Latitude is required"],
                default: 0
            },
            longitude: {
                type: Number,
                required: [true, "Longitude is required"],
                default: 0
            }
        },
        busOwner: {
            type: Schema.ObjectId,
            ref: "BusOwner",
            required: [true, "Bus Owner is required"]
        },
        sale: {
            type: [saleSchema],
            default: [
                {
                    amount: 0,
                    date: new Date()
                }
            ]
        }
    },
    { timestamps: true }
);

const Bus = model<IBus>("Bus", busSchema);

const busOwnerSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true
        },
        email: {
            type: String,
            required: false,
            unique: true,
            trim: true
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone Number is required"],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            trim: true
        },
        buses: [
            {
                type: Schema.ObjectId,
                ref: "Bus"
            }
        ],
        token : {
            type: String,
            default: null
        }
    },
    { timestamps: true }
    );

const BusOwner = model<IBusOwner>("BusOwner", busOwnerSchema);
export { BusOwner, Bus };
