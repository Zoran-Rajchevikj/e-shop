package com.example.eshop.web;

import com.example.eshop.dto.CreateProductDTO;
import com.example.eshop.dto.DisplayProductDTO;
import com.example.eshop.model.enums.GenderType;
import com.example.eshop.model.enums.ProductType;
import com.example.eshop.model.enums.Size;
import com.example.eshop.service.application.ProductApplicationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductApplicationService productApplicationService;

    public ProductController(ProductApplicationService productApplicationService) {
        this.productApplicationService = productApplicationService;
    }

    @GetMapping()
    public ResponseEntity<List<DisplayProductDTO>> getAllProducts() {
        List<DisplayProductDTO> products = productApplicationService.getAllProducts();
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }
    @GetMapping("/paginated")
    public ResponseEntity<Page<DisplayProductDTO>> getAllProducts(
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(productApplicationService.getAllProducts(pageable));
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<DisplayProductDTO>> filterProducts(
            @RequestParam(required = false) GenderType genderType,
            @RequestParam(required = false) ProductType productType,
            @RequestParam(required = false) String searchName,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String color,
            @RequestParam(required = false ) Size productSize,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(
                productApplicationService
                        .filterProducts(genderType, productType, searchName, minPrice, maxPrice, color, productSize, pageable)
        );
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayProductDTO> saveProduct(@RequestBody CreateProductDTO product) {
        DisplayProductDTO created = productApplicationService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DisplayProductDTO> getProductById(@PathVariable Long id) {

        DisplayProductDTO product = productApplicationService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {

        productApplicationService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }
}