import {GenderType, ProductType} from "../enums.ts";

export interface CreateProduct {
    name: string;
    description: string;
    genderType:GenderType
    productType: ProductType
}