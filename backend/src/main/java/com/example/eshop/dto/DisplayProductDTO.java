package com.example.eshop.dto;

import com.example.eshop.model.domain.Product;
import com.example.eshop.model.enums.GenderType;
import com.example.eshop.model.enums.ProductType;
import org.springframework.data.domain.Page;

import java.util.List;

public record DisplayProductDTO(
        Long id,
        String name,
        String description,
        GenderType genderType,
        ProductType productType,
        List<DisplayProductVariantDTO> variants
) {
    public static DisplayProductDTO from(Product product){
        return new DisplayProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getGenderType(),
                product.getProductType(),
                product.getVariants().stream().map(variant ->
                    new DisplayProductVariantDTO(
                            variant.getId(),
                            variant.getProduct().getId(),
                            variant.getColor(),
                            variant.getSize(),
                            variant.getPrice(),
                            variant.getStock()
                    )).toList()
        );
    }
    public static List<DisplayProductDTO> from (List<Product> products){
        return products.stream().map(DisplayProductDTO::from).toList();
    }


}
