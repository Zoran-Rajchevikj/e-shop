package com.example.eshop.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class NotEnoughStockAvailable extends RuntimeException {

    public NotEnoughStockAvailable() {
        super("Not enough stock available");
    }
}
