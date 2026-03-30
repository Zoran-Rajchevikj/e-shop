package com.example.eshop.dto;

import com.example.eshop.model.domain.User;

public record DisplayUserDTO(
        String username,
        String name,
        String surname
) {
    public static DisplayUserDTO from(User user){
        return new DisplayUserDTO(
                user.getUsername(),
                user.getName(),
                user.getSurname()
        );
    }
}
