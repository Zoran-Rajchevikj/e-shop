package com.example.eshop.service.application.Impl;

import com.example.eshop.dto.CartDTO;
import com.example.eshop.dto.CartItemDTO;
import com.example.eshop.service.application.CartApplicationService;
import com.example.eshop.service.domain.CartService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartApplicationServiceImpl implements CartApplicationService {
    private final CartService cartService;

    public CartApplicationServiceImpl(CartService cartService) {
        this.cartService = cartService;

    }
    @Override
    public List<CartItemDTO> listAllItemsInCart(String username) {
        return CartItemDTO.from(cartService.listAllItemsInCart(username));
    }

    @Override
    public CartDTO addItemToCart(String username, Long variantId,int quantity) {
        return CartDTO.from(cartService.addItemToCart(username,variantId,quantity));
    }

    @Override
    public CartDTO getCart(String username) {
        return CartDTO.from(cartService.getCart(username));
    }

    @Override
    public CartDTO increaseQuantity(String username, Long variantId) {
        return CartDTO.from(cartService.increaseQuantity(username, variantId));
    }

    @Override
    public CartDTO decreaseQuantity(String username, Long variantId) {
        return CartDTO.from(cartService.decreaseQuantity(username, variantId));
    }

    @Override
    public void removeItemFromCart(String username, Long itemId) {
        cartService.removeItemFromCart(username, itemId);
    }

    @Override
    public void removeAllItemsFromCart(String username) {
        cartService.removeAllItemsFromCart(username);
    }
}
