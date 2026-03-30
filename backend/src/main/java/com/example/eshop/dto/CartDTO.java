package com.example.eshop.dto;



import com.example.eshop.model.domain.Cart;
import com.example.eshop.model.domain.CartItem;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public record CartDTO(
         Long id,
         LocalDateTime dateCreated,
         List<CartItemDTO> items,
         BigDecimal totalCartPrice
) {
    public static CartDTO from(Cart cart){
        BigDecimal totalCartPrice = cart.getItems().stream().map(CartItem::getTotalPrice).reduce(BigDecimal.ZERO,BigDecimal::add);
        List<CartItem> sortedItems = cart.getItems().stream()
                .sorted(Comparator.comparingLong(CartItem::getId))
                .toList();
        return new CartDTO(
                cart.getId(),
                cart.getDateCreated(),
                CartItemDTO.from(sortedItems),
                totalCartPrice
        );
    }
}
