package com.example.eshop.dto;

import com.example.eshop.model.domain.ProductVariant;
import com.example.eshop.model.enums.Size;

import java.math.BigDecimal;

public record CreateProductVariantDTO(Long productId,
                                      String color,
                                      Size size,
                                      BigDecimal price,
                                      Integer stock
)
{
    public static CreateProductVariantDTO from (ProductVariant productVariant){
        return new CreateProductVariantDTO(
                productVariant.getProduct().getId(),
                productVariant.getColor(),
                productVariant.getSize(),
                productVariant.getPrice(),
                productVariant.getStock()
        );
    }

}
