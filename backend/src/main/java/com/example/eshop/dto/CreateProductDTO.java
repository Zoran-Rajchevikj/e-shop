package com.example.eshop.dto;

import com.example.eshop.model.domain.Product;
import com.example.eshop.model.enums.GenderType;
import com.example.eshop.model.enums.ProductType;

public record CreateProductDTO (
        String name,
        String description,
        GenderType genderType,
        ProductType productType
){
    public static CreateProductDTO from (Product product){
        return new CreateProductDTO(
                product.getName(),
                product.getDescription(),
                product.getGenderType(),
                product.getProductType()
        );
    }

}
