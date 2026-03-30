package com.example.eshop.service.domain;


import com.example.eshop.model.domain.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    User register(String username,String password,String repeatPassword,String name,String surname);
    User findById(Long id);
    User findByUsername(String username);
    User login(String username, String password);
}
