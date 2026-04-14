package com.example.eshop.service.domain.Impl;

import com.example.eshop.model.domain.Product;
import com.example.eshop.model.domain.ProductVariant;
import com.example.eshop.model.enums.Size;
import com.example.eshop.model.exception.NotEnoughStockAvailable;
import com.example.eshop.model.exception.VariantNotFoundException;
import com.example.eshop.repository.ProductVariantRepository;
import com.example.eshop.service.domain.ProductService;
import com.example.eshop.service.domain.ProductVariantService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductVariantServiceImpl implements ProductVariantService {
    private final ProductVariantRepository productVariantRepository;
    private final ProductService productService;

    public ProductVariantServiceImpl(ProductVariantRepository productVariantRepository, ProductService productService) {
        this.productVariantRepository = productVariantRepository;
        this.productService = productService;

    }

    @Override
    public ProductVariant createVariant(ProductVariant variant) {
        Product product = productService.getProductById(variant.getProduct().getId());
        product.addVariant(variant);
        return productVariantRepository.save(variant);
    }

    @Override
    public ProductVariant getVariantById(Long id) {
        return productVariantRepository.findById(id)
                .orElseThrow(() -> new VariantNotFoundException(id));
    }

    @Override
    public List<ProductVariant> getAllVariantsByProductId(Long productId) {
       productService.getProductById(productId);
        return productVariantRepository.findByProductId(productId);
    }

    @Override
    public ProductVariant updatePrice(Long variantId, BigDecimal newPrice) {
        ProductVariant productVariant = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new VariantNotFoundException(variantId));
        productVariant.setPrice(newPrice);
        return productVariantRepository.save(productVariant);
    }

    @Override
    public ProductVariant updateStock(Long variantId, Integer newStock) {
        ProductVariant productVariant = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new VariantNotFoundException(variantId));
        productVariant.setStock(newStock);
        return productVariantRepository.save(productVariant);
    }

    @Override
    public ProductVariant updateVariant(Long variantId, String color, Integer stock, Size size, BigDecimal price) {
        ProductVariant existing = productVariantRepository.findById(variantId).orElseThrow(() -> new VariantNotFoundException(variantId));

        if(stock < 0){
            throw new IllegalArgumentException ();
        }
        if(price.compareTo(BigDecimal.ZERO)<=0) {
            throw new IllegalArgumentException();
        }

        existing.setColor(color);
        existing.setStock(stock);
        existing.setPrice(price);
        existing.setSize(size);

        return productVariantRepository.save(existing);
    }

    @Override
    public void deleteVariant(Long variantId) {
        ProductVariant variant = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new VariantNotFoundException(variantId));
        productVariantRepository.delete(variant);
    }

    @Override
    public ProductVariant decreaseStock(Long variantId, int quantity) {
        ProductVariant variant = productVariantRepository.findById(variantId)
                .orElseThrow(() -> new VariantNotFoundException(variantId));

        if (variant.getStock() < quantity) {
            throw new NotEnoughStockAvailable();
        }

        variant.setStock(variant.getStock() - quantity);
        return productVariantRepository.save(variant);
    }
}