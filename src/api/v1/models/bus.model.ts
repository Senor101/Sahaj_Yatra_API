import { Document, Schema, model } from 'mongoose';

export interface IBus extends Document {
  busNumber: string;
  busType: string;
  busRoute?: string;
  busSeats?: number;
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IBusOwner extends Document {
  username: string;
  email: string;
  phoneNumber: string;
  password?: string;
  buses?: [IBus];
  createdAt: Date;
  updatedAt: Date;
}

export interface IdailyEarning extends Document {
  busNumber: string;
  date: Date;
  earning: number;
  createdAt: Date;
  updatedAt: Date;
}

const busSchema = new Schema(
  {
    busNumber: {
      type: String,
      required: [true, 'Bus Number is required'],
      trim: true,
    },
    busType: {
      type: String,
      required: [true, 'Bus Type is required'],
      trim: true,
    },
    busRoute: {
      type: String,
      required: false,
      trim: true,
    },
    busSeats: {
      type: Number,
      required: false,
    },
    currentLocation: {
      latitude: {
        type: Number,
        required: [true, 'Latitude is required'],
        default: 0,
      },
      longitude: {
        type: Number,
        required: [true, 'Longitude is required'],
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const Bus = model<IBus>('Bus', busSchema);

const dailyEarningSchema = new Schema(
  {
    busNumber: {
      type: String,
      required: [true, 'Bus Number is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    earning: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const DailyEarning = model<IdailyEarning>('DailyEarning', dailyEarningSchema);

const busOwnerSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone Number is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
    },
    buses: [
      {
        type: Schema.ObjectId,
        ref: 'Bus',
      },
    ],
    // sales: [DailyEarning],
  },
  { timestamps: true }
);

const BusOwner = model<IBusOwner>('BusOwner', busOwnerSchema);
export { BusOwner, Bus, DailyEarning };
