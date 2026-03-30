import type {Size} from "../enums.ts";

export interface DisplayProductVariant {
    id: number;
    productId: number;
    color: string;
    size: Size
    price: number;
    stock: number;
}