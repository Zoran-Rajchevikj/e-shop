package com.example.eshop.service.application.Impl;

import com.example.eshop.dto.CreateProductDTO;
import com.example.eshop.dto.DisplayProductDTO;
import com.example.eshop.model.domain.Product;
import com.example.eshop.model.enums.GenderType;
import com.example.eshop.model.enums.ProductType;
import com.example.eshop.model.enums.Size;
import com.example.eshop.service.application.ProductApplicationService;
import com.example.eshop.service.domain.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductApplicationServiceImpl implements ProductApplicationService {
    private final ProductService productService;

    public ProductApplicationServiceImpl(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public DisplayProductDTO saveProduct(CreateProductDTO productDto) {
        Product product = new Product();
        product.setName(productDto.name());
        product.setDescription(productDto.description());
        product.setGenderType(productDto.genderType());
        product.setProductType(productDto.productType());

        Product saved = productService.saveProduct(product);
        return DisplayProductDTO.from(saved);
    }

    @Override
    public DisplayProductDTO getProductById(Long id) {
        // Domain слојот ќе фрли ProductNotFoundException ако не постои
        Product product = productService.getProductById(id);
        return DisplayProductDTO.from(product);
    }

    @Override
    public List<DisplayProductDTO> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return DisplayProductDTO.from(products);
    }

    @Override
    public Page<DisplayProductDTO> getAllProducts(Pageable pageable) {

        return productService.getAllProducts(pageable).map(DisplayProductDTO ::from);
    }

    @Override
    public Page<DisplayProductDTO> filterProducts(GenderType genderType,
            ProductType productType,
            String searchName,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String color,
            Size size,
            Pageable pageable) {
        return productService.filterProducts(genderType, productType, searchName, minPrice, maxPrice, color, size, pageable)
                .map(DisplayProductDTO::from);
    }

    @Override
    public void deleteProductById(Long id) {
        // Domain слојот ќе фрли ProductNotFoundException ако не постои
        productService.deleteProduct(id);
    }
}