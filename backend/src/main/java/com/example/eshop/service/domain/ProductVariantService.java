package com.example.eshop.service.domain;

import com.example.eshop.model.domain.ProductVariant;

import java.math.BigDecimal;
import java.util.List;

public interface ProductVariantService {
        ProductVariant createVariant(ProductVariant variant);

        ProductVariant getVariantById(Long id);

        List<ProductVariant> getAllVariantsByProductId(Long productId);

        ProductVariant updatePrice(Long variantId, BigDecimal newPrice);

        ProductVariant updateStock(Long variantId, Integer newStock);

        void deleteVariant(Long variantId);

        ProductVariant decreaseStock(Long variantId, int quantity);
}