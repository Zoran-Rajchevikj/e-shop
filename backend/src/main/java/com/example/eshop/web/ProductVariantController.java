package com.example.eshop.web;

import com.example.eshop.dto.CreateProductVariantDTO;
import com.example.eshop.dto.DisplayProductVariantDTO;
import com.example.eshop.service.application.ProductApplicationVariantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/variants")
public class ProductVariantController {

    private final ProductApplicationVariantService productApplicationVariantService;

    public ProductVariantController(ProductApplicationVariantService productApplicationVariantService) {
        this.productApplicationVariantService = productApplicationVariantService;
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<DisplayProductVariantDTO>> getVariantsByProductId(@PathVariable Long productId) {
        List<DisplayProductVariantDTO> variants =
                productApplicationVariantService.getAllVariantsByProductId(productId);
        return ResponseEntity.ok(variants);
    }

    @PostMapping("/add")
    public ResponseEntity<DisplayProductVariantDTO> createVariant(@RequestBody CreateProductVariantDTO variant) {
        DisplayProductVariantDTO created = productApplicationVariantService.createVariant(variant);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/update/{id}/price")
    public ResponseEntity<DisplayProductVariantDTO> updatePrice(@PathVariable Long id,
                                                                @RequestParam BigDecimal newPrice) {
        DisplayProductVariantDTO updated = productApplicationVariantService.updatePrice(id, newPrice);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/update/{id}/stock")
    public ResponseEntity<DisplayProductVariantDTO> updateStock(@PathVariable Long id,
                                                                @RequestParam Integer newStock) {
        DisplayProductVariantDTO updated = productApplicationVariantService.updateStock(id, newStock);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/variant/{id}")
    public ResponseEntity<DisplayProductVariantDTO> getById(@PathVariable Long id) {
        DisplayProductVariantDTO variant = productApplicationVariantService.getVariantById(id);
        return ResponseEntity.ok(variant);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        productApplicationVariantService.deleteVariant(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/decreaseStock/{id}")
    public ResponseEntity<DisplayProductVariantDTO> decreaseStock(@PathVariable Long id,
                                                                  @RequestParam int quantity) {
        DisplayProductVariantDTO updated = productApplicationVariantService.decreaseStock(id, quantity);
        return ResponseEntity.ok(updated);
    }
}