package com.example.eshop.service.application;

import com.example.eshop.dto.CreateProductDTO;
import com.example.eshop.dto.DisplayProductDTO;
import com.example.eshop.model.enums.GenderType;
import com.example.eshop.model.enums.ProductType;
import com.example.eshop.model.enums.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface ProductApplicationService {
    DisplayProductDTO saveProduct(CreateProductDTO product);

    DisplayProductDTO getProductById(Long id);

    List<DisplayProductDTO> getAllProducts();

    Page<DisplayProductDTO> getAllProducts(Pageable pageable);

    Page<DisplayProductDTO> filterProducts(
            GenderType genderType,
            ProductType productType,
            String searchName,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String color,
            Size size,
            Pageable pageable);

    void deleteProductById(Long id);
}