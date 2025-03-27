export interface Product {
    _id: string;
    name: string;           
    description?: string;   
    price: number;          
    images: string[];      
    avgRating?: number;     
    reviewCount?: number;   
    isAvailble?: boolean;   
}