package com.example.eshop.dto;

import com.example.eshop.model.domain.ProductVariant;
import com.example.eshop.model.enums.Size;

import java.math.BigDecimal;

public record UpdateProductVariantDTO(
        String color,
        Size size,
        BigDecimal price,
        Integer stock
) {
    public static UpdateProductVariantDTO from (ProductVariant productVariant){
        return new UpdateProductVariantDTO(
                productVariant.getColor(),
                productVariant.getSize(),
                productVariant.getPrice(),
                productVariant.getStock()
        );
    }
}
