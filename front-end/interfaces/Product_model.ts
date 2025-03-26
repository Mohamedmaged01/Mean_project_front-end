export interface Product {
  _id: string;
  seller_id: string;
  category: string;
  isfavourite: boolean;
  name: string;
  description: string;
  price: number;
  images: string[];
  avgRating: number;
  reviewCount: number;
  isAvailble: boolean;
}
