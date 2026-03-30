package com.example.eshop.service.application;

import com.example.eshop.dto.CartDTO;
import com.example.eshop.dto.CartItemDTO;
import com.example.eshop.model.domain.Cart;
import com.example.eshop.model.domain.CartItem;

import java.util.List;

public interface CartApplicationService {
    List<CartItemDTO> listAllItemsInCart(String username);
    CartDTO addItemToCart(String username, Long variantId,int quantity);
    CartDTO getCart(String username);
    CartDTO increaseQuantity(String username, Long variantId);
    CartDTO decreaseQuantity(String username, Long variantId);
    void removeItemFromCart(String username, Long itemId);
    void removeAllItemsFromCart(String username);
}
