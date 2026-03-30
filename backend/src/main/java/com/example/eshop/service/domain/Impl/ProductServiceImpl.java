package com.example.eshop.service.domain.Impl;

import com.example.eshop.model.domain.Product;
import com.example.eshop.model.enums.GenderType;
import com.example.eshop.model.enums.ProductType;
import com.example.eshop.model.enums.Size;
import com.example.eshop.model.exception.ProductNotFoundException;
import com.example.eshop.repository.ProductRepository;
import com.example.eshop.repository.specification.ProductSpecifications;
import com.example.eshop.service.domain.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Page<Product> filterProducts(GenderType genderType, ProductType productType, String searchName, BigDecimal minPrice, BigDecimal maxPrice, String color, Size size, Pageable pageable) {
        var specification = ProductSpecifications.withFilters(
                genderType,
                productType,
                searchName,
                minPrice,
                maxPrice,
                color,
                size
        );
        return productRepository.findAll(specification, pageable);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
        productRepository.delete(product);
    }
}
