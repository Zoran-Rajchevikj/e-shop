import type {DisplayProductVariant} from "../variant/DisplayProductVariant.ts";
import {type GenderType, ProductType} from "../enums.ts";

export interface Product {
    id: number;
    name: string;
    description: string;
    genderType: GenderType
    productType: ProductType
    variants: DisplayProductVariant[];
}
