export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    dietaryTags: string[];
    customizable: boolean;
    inStock: boolean;
    rating: number;
}