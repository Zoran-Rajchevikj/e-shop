package com.example.eshop.service.application.Impl;

import com.example.eshop.dto.CreateUserDTO;
import com.example.eshop.dto.DisplayUserDTO;
import com.example.eshop.dto.LoginResponseDTO;
import com.example.eshop.dto.LoginUserDTO;
import com.example.eshop.model.domain.User;
import com.example.eshop.security.JWTHelper;
import com.example.eshop.service.application.UserApplicationService;
import com.example.eshop.service.domain.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserApplicationServiceImpl implements UserApplicationService {
    private final UserService userService;
    private final JWTHelper jwtHelper;
    public UserApplicationServiceImpl(UserService userService, JWTHelper jwtHelper) {
        this.userService = userService;
        this.jwtHelper = jwtHelper;
    }

    @Override
    public DisplayUserDTO register(CreateUserDTO createUserDto) {
        User user = userService.register(
                createUserDto.username(),
                createUserDto.password(),
                createUserDto.repeatPassword(),
                createUserDto.name(),
                createUserDto.surname());
        return DisplayUserDTO.from(user);
    }

    @Override
    public DisplayUserDTO findById(Long id) {
        return DisplayUserDTO.from(userService.findById(id));
    }

    @Override
    public DisplayUserDTO findByUsername(String username) {
        return DisplayUserDTO.from(userService.findByUsername(username));
    }

    @Override
    public LoginResponseDTO login(LoginUserDTO loginUserDTO) {
        User user = userService.login(loginUserDTO.username(),loginUserDTO.password());
        String token = jwtHelper.generateToken(user);

        return new LoginResponseDTO(token);
    }
}
