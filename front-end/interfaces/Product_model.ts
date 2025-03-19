export interface Product {
    _id: string;
    seller_id: string;
    category: string;       // Add this
    isfavourite: boolean;
    name: string;
    description: string;
    price: number;
    images: string[];
    avgRating: number;
    reviewCount: number;
    isAvailble: boolean;    // Note: Typo in API response (should be isAvailable), but we'll match it

  }
