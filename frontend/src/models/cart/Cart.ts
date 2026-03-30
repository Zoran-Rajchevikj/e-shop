import type {CartItem} from "./CartItem";

export interface Cart {
    id: number;
    dateCreated: string; // можеш да го користиш string за ISO датум
    items: CartItem[];
    totalCartPrice: number;
}