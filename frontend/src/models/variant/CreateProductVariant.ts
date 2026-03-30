import type {Size} from "../enums.ts";

export interface CreateProductVariant {
    productId: number;
    color: string;
    size:Size
    price: number;
    stock: number;
}