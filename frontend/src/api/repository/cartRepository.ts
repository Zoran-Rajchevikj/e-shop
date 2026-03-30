import type {Cart} from "../../models/cart/Cart.ts";
import axiosInstance from "../axios.ts";
import type {CartItem} from "../../models/cart/CartItem.ts";

const cartRepository = {
    listAllItemsInCart:async():Promise<CartItem[]> =>{
        const res = await axiosInstance.get("/cart/items")
        return res.data
},
    addItemToCart:async (variantId:number,quantity:number):Promise<Cart>=>{
        const res = await axiosInstance.post(`/cart/add/${variantId}?quantity=${quantity}`);
        return res.data;
    },
    increaseQuantity: async (variantId: number): Promise<Cart> => {
        const res = await axiosInstance.post(`/cart/increase/${variantId}`);
        return res.data;
    },

    decreaseQuantity: async (variantId: number): Promise<Cart> => {
        const res = await axiosInstance.post(`/cart/decrease/${variantId}`);
        return res.data;
    },
    getCart:async () :Promise<Cart> => {
        const res = await axiosInstance.get("/cart");
        return res.data
    },
    removeItemFromCart:async (variantId:number):Promise<void> => {
        const res = await axiosInstance.delete(`/cart/delete/${variantId}`);
        return res.data;
    },
    removeAllFromCart:async():Promise<void> => {
      const res = await axiosInstance.delete(`/cart/deleteAll`);
      return res.data;
    }
}
export default cartRepository;