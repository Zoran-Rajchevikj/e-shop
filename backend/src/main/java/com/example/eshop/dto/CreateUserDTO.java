package com.example.eshop.dto;

public record CreateUserDTO(
        String username,
        String password,
        String repeatPassword,
        String name,
        String surname
) {

}
