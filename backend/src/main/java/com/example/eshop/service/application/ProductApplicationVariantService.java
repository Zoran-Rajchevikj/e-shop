package com.example.eshop.service.application;

import com.example.eshop.dto.CreateProductVariantDTO;
import com.example.eshop.dto.DisplayProductVariantDTO;

import java.math.BigDecimal;
import java.util.List;

public interface ProductApplicationVariantService {

    DisplayProductVariantDTO createVariant(CreateProductVariantDTO variantDTO);

    DisplayProductVariantDTO getVariantById(Long id);

    List<DisplayProductVariantDTO> getAllVariantsByProductId(Long productId);

    DisplayProductVariantDTO updatePrice(Long variantId, BigDecimal newPrice);

    DisplayProductVariantDTO updateStock(Long variantId, Integer newStock);

    void deleteVariant(Long variantId);

    DisplayProductVariantDTO decreaseStock(Long variantId, int quantity);
}