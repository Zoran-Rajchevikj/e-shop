package com.example.eshop.model.domain;

import com.example.eshop.model.enums.Size;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    private Product product;
    private String color;
    @Enumerated(EnumType.STRING)
    private Size size;
    private BigDecimal price;
    private Integer stock;
}
