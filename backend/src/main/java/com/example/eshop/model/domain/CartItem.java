package com.example.eshop.model.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne
    private ProductVariant productVariant;

    private Integer quantity;

    public CartItem() {

    }

    public BigDecimal getTotalPrice(){
        return productVariant.getPrice().multiply(BigDecimal.valueOf(quantity));
    }
    public CartItem(ProductVariant productVariant){
        this.productVariant= productVariant;
        this.quantity = 1;
    }
    public CartItem(ProductVariant productVariant,int quantity){
        this.productVariant = productVariant;
        this.quantity = quantity;
    }

}
