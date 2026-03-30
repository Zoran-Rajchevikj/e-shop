package com.example.eshop.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class VariantNotFoundException extends RuntimeException {
    public VariantNotFoundException(Long id) {
        super(String.format("Variant with id %d not found",id));
    }
}
