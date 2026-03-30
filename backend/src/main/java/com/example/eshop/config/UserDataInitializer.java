package com.example.eshop.config;

import com.example.eshop.model.domain.Cart;
import com.example.eshop.model.domain.User;
import com.example.eshop.model.enums.Role;
import com.example.eshop.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserDataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void initUsers() {
        // Admin
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User(
                    "admin", // исто како и за проверка
                    passwordEncoder.encode("admin"),
                    "ad",
                    "adi",
                    Role.ROLE_ADMIN
            );
            Cart adminCart = new Cart();
            adminCart.setUser(admin);
            admin.setCart(adminCart); // важно: поврзување Cart со User
            userRepository.save(admin);
        }

// Regular user
        if (userRepository.findByUsername("user").isEmpty()) {
            User user = new User(
                    "user", // исто како и за проверка
                    passwordEncoder.encode("user"),
                    "us",
                    "us",
                    Role.ROLE_USER
            );
            Cart userCart = new Cart();
            userCart.setUser(user);
            user.setCart(userCart); // важно: поврзување Cart со User
            userRepository.save(user);
        }
    }
}