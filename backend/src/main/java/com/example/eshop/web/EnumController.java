package com.example.eshop.web;

import com.example.eshop.model.enums.GenderType;
import com.example.eshop.model.enums.ProductType;
import com.example.eshop.model.enums.Size;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/enums")
public class EnumController {

    @GetMapping("/gender")
    public GenderType[] getGenderTypes() {
        return GenderType.values();
    }

    @GetMapping("/product")
    public ProductType[] getProductTypes() {
        return ProductType.values();
    }
    @GetMapping("/size")
    public Size[] getSizes(){
        return Size.values();
    }
}