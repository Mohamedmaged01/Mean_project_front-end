import { Types } from 'mongoose';

export interface usermodel{





  _id?: Types.ObjectId;
  isconfermed?: boolean;
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: 'customer' | 'seller' | 'admin';
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
  paymentMethods?: string;
  wishlist?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;


}