package com.example.eshop.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class CartNotFoundException extends RuntimeException {
    public CartNotFoundException(Long cartId) {
        super(String.format("Cart with id %d not found",cartId));
    }
    public CartNotFoundException() {
        super(String.format("Cart not found"));
    }
}
