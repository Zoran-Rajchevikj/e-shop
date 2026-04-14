package com.example.eshop.service.application.Impl;

import com.example.eshop.dto.CreateProductVariantDTO;
import com.example.eshop.dto.DisplayProductVariantDTO;
import com.example.eshop.dto.UpdateProductVariantDTO;
import com.example.eshop.model.domain.Product;
import com.example.eshop.model.domain.ProductVariant;
import com.example.eshop.service.application.ProductApplicationVariantService;
import com.example.eshop.service.domain.ProductService;
import com.example.eshop.service.domain.ProductVariantService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductApplicationVariantServiceImpl implements ProductApplicationVariantService {
    private final ProductVariantService productVariantService;
    private final ProductService productService;

    public ProductApplicationVariantServiceImpl(ProductVariantService productVariantService,
                                                ProductService productService) {
        this.productVariantService = productVariantService;
        this.productService = productService;
    }

    @Override
    public DisplayProductVariantDTO createVariant(CreateProductVariantDTO variantDTO) {
        Product product = productService.getProductById(variantDTO.productId());

        ProductVariant productVariant = new ProductVariant();
        productVariant.setColor(variantDTO.color());
        productVariant.setSize(variantDTO.size());
        productVariant.setPrice(variantDTO.price());
        productVariant.setStock(variantDTO.stock());
        productVariant.setProduct(product);

        ProductVariant created = productVariantService.createVariant(productVariant);
        return DisplayProductVariantDTO.from(created);
    }

    @Override
    public DisplayProductVariantDTO getVariantById(Long id) {

        ProductVariant variant = productVariantService.getVariantById(id);
        return DisplayProductVariantDTO.from(variant);
    }

    @Override
    public List<DisplayProductVariantDTO> getAllVariantsByProductId(Long productId) {
        List<ProductVariant> variants = productVariantService.getAllVariantsByProductId(productId);
        return DisplayProductVariantDTO.from(variants);
    }

    @Override
    public DisplayProductVariantDTO updatePrice(Long variantId, BigDecimal newPrice) {
        ProductVariant updated = productVariantService.updatePrice(variantId, newPrice);
        return DisplayProductVariantDTO.from(updated);
    }

    @Override
    public DisplayProductVariantDTO updateStock(Long variantId, Integer newStock) {
        ProductVariant updated = productVariantService.updateStock(variantId, newStock);
        return DisplayProductVariantDTO.from(updated);
    }

    @Override
    public DisplayProductVariantDTO updateVariant(Long variantId, UpdateProductVariantDTO variantDTO) {
        ProductVariant updated = productVariantService.updateVariant(variantId,variantDTO.color(),variantDTO.stock(),variantDTO.size(),variantDTO.price());
        return DisplayProductVariantDTO.from(updated);
    }

    @Override
    public void deleteVariant(Long variantId) {
        productVariantService.deleteVariant(variantId);
    }

    @Override
    public DisplayProductVariantDTO decreaseStock(Long variantId, int quantity) {

        ProductVariant updated = productVariantService.decreaseStock(variantId, quantity);
        return DisplayProductVariantDTO.from(updated);
    }
}