package com.example.eshop.dto;

import com.example.eshop.model.domain.CartItem;

import java.math.BigDecimal;
import java.util.List;



public record CartItemDTO(
        Long id,
         Long productVariantId,
         String productName,
         String productType,
         String color,
         Integer quantity,
         BigDecimal price,
         String size

) {
    public static CartItemDTO from(CartItem cartItem){
        return new CartItemDTO(
                cartItem.getId(),
                cartItem.getProductVariant().getId(),
                cartItem.getProductVariant().getProduct().getName(),
                cartItem.getProductVariant().getProduct().getProductType().name(),
                cartItem.getProductVariant().getColor(),
                cartItem.getQuantity(),
                cartItem.getProductVariant().getPrice(),
                cartItem.getProductVariant().getSize().name()

        );}
    public static List<CartItemDTO> from (List<CartItem> cartItemList){
        return cartItemList.stream().map(CartItemDTO::from).toList();
    }
}
