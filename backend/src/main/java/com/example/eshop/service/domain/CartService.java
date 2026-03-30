package com.example.eshop.service.domain;

import com.example.eshop.model.domain.Cart;
import com.example.eshop.model.domain.CartItem;


import java.util.List;

public interface CartService {
    List<CartItem> listAllItemsInCart(String username);
    Cart addItemToCart(String username,Long variantId,int quantity);
    Cart getCart(String username);
    Cart increaseQuantity(String username,Long variantId);
    Cart decreaseQuantity (String username,Long variantId);
    void removeItemFromCart(String username,Long itemId);
    void removeAllItemsFromCart(String username);
}
