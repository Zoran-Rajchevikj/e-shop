package com.example.eshop.model.domain;

import com.example.eshop.model.enums.GenderType;
import com.example.eshop.model.enums.ProductType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    @Enumerated(EnumType.STRING)
    private GenderType genderType;
     @Enumerated(EnumType.STRING)
    private ProductType productType;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ProductVariant> variants = new ArrayList<>();

    public void addVariant(ProductVariant variant) {
        if (variants == null) {
            variants = new ArrayList<>();
        }
        variants.add(variant);
        variant.setProduct(this); // setiraj go product vo variant
    }

    public void removeVariant(ProductVariant variant) {
        if (variants != null) {
            variants.remove(variant);
            variant.setProduct(null);
        }
    }
}
