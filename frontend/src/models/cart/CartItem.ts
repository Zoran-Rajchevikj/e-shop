import {ProductType, type Size} from "../enums.ts";

export interface CartItem {
    id: number;
    productVariantId: number;
    productName: string;
    productType:ProductType;
    color:string;
    quantity: number;
    price: number;
    size:Size
}