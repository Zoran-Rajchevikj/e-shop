package com.example.eshop.dto;

import com.example.eshop.model.domain.ProductVariant;
import com.example.eshop.model.enums.Size;

import java.math.BigDecimal;
import java.util.List;

public record DisplayProductVariantDTO(
        Long id,
        Long productId,
        String color,
        Size size,
        BigDecimal price,
        Integer stock
) {
    public static DisplayProductVariantDTO from (ProductVariant productVariant){
        return new DisplayProductVariantDTO(
                productVariant.getId(),
                productVariant.getProduct().getId(),
                productVariant.getColor(),
                productVariant.getSize(),
                productVariant.getPrice(),
                productVariant.getStock()
        );
    }
    public static List<DisplayProductVariantDTO> from(List<ProductVariant> variants){
        return variants.stream().map(DisplayProductVariantDTO::from).toList();
    }
}
