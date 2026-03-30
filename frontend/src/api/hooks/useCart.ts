
import {useCallback, useEffect, useState} from "react";
import cartRepository from "../repository/cartRepository.ts";
import type {Cart} from "../../models/cart/Cart.ts";

interface CartState{
    cart:Cart|null,
    loading:boolean,
}
const initialState:CartState ={
  cart:null,
    loading:true,
}
const useCart= ()=>{
    const [cartState,setCartState] = useState<CartState>(initialState);

    const getCart = useCallback(() => {
        cartRepository
            .getCart()
            .then((response)=> {

                setCartState({
                    cart:response,
                    loading: false,
                })
            })
            .catch((error)=> console.log(error));
    },[])
    const addItemToCart = useCallback((itemId:number,quantity:number) => {
        cartRepository
            .addItemToCart(itemId,quantity)
            .then(() =>{
                console.log("Successfully added item to cart");
                getCart();
            })
            .catch((error)=> console.log(error));
    },[getCart])
    const increaseQuantity = useCallback((variantId: number) => {
        cartRepository
            .increaseQuantity(variantId)
            .then(() => {
                console.log("Quantity increased");
                getCart();
            })
            .catch((error) => console.log(error));
    }, [getCart]);

    const decreaseQuantity = useCallback((variantId: number) => {
        cartRepository
            .decreaseQuantity(variantId)
            .then(() => {
                console.log("Quantity decreased");
                getCart();
            })
            .catch((error) => console.log(error));
    }, [getCart]);
    const removeItemFromCart = useCallback((itemId:number) => {
        cartRepository
            .removeItemFromCart(itemId)
            .then(() => {
                console.log("Successfully removed item from cart");
                getCart();
            })
            .catch((error)=> console.log(error));
    },[getCart])
    const removeAllFromCart = useCallback(() => {
        cartRepository
            .removeAllFromCart()
            .then(() => {
                console.log("Successfully removed all items from cart");
                getCart();
            })
            .catch((error)=> console.log(error));
    },[getCart])
    useEffect(() => {
        getCart()
    }, [getCart]);
    return{
        ...cartState,getCart,addItemToCart,removeAllFromCart,removeItemFromCart,increaseQuantity,decreaseQuantity
    }
}
export default useCart;