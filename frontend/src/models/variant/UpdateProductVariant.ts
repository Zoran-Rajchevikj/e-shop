import type {Size} from "../enums.ts";

export interface UpdateProductVariant {
    color: string;
    size:Size;
    price: number;
    stock: number;
}