package com.example.eshop.service.domain;

import com.example.eshop.model.domain.Product;
import com.example.eshop.model.enums.GenderType;
import com.example.eshop.model.enums.ProductType;
import com.example.eshop.model.enums.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    Product saveProduct(Product product);

    Product getProductById(Long id);

    List<Product> getAllProducts();

    Page<Product> getAllProducts(Pageable pageable);

    Page<Product> filterProducts(GenderType genderType,
            ProductType productType,
            String searchName,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String color,
            Size size,
            Pageable pageable);

    void deleteProduct(Long id);
}
