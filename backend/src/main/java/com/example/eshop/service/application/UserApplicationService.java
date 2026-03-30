package com.example.eshop.service.application;

import com.example.eshop.dto.CreateUserDTO;
import com.example.eshop.dto.DisplayUserDTO;
import com.example.eshop.dto.LoginResponseDTO;
import com.example.eshop.dto.LoginUserDTO;


public interface UserApplicationService {
    DisplayUserDTO register(CreateUserDTO createUserDto);
    DisplayUserDTO findById(Long id);
    DisplayUserDTO findByUsername(String username);
    LoginResponseDTO login(LoginUserDTO loginUserDto);
}
