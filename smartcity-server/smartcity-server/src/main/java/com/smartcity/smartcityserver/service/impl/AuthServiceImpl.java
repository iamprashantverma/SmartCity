package com.smartcity.smartcityserver.service.impl;


import com.smartcity.smartcityserver.dto.LoginRequestDTO;
import com.smartcity.smartcityserver.dto.LoginResponseDTO;
import com.smartcity.smartcityserver.dto.UserCreateDTO;
import com.smartcity.smartcityserver.dto.UserResponseDTO;
import com.smartcity.smartcityserver.entity.User;
import com.smartcity.smartcityserver.exception.InvalidCredentialsException;
import com.smartcity.smartcityserver.exception.UserAlreadyExistsException;
import com.smartcity.smartcityserver.exception.UserNotFoundException;
import com.smartcity.smartcityserver.repositoriy.UserRepository;
import com.smartcity.smartcityserver.service.AuthService;
import com.smartcity.smartcityserver.service.JWTService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    @Override
    @Transactional
    public UserResponseDTO signUp(UserCreateDTO studentCreateDTO) {
        // Check if user already exists
        userRepository.findByEmail(studentCreateDTO.getEmail())
                .ifPresent(u -> {
                    log.warn("Signup failed: email {} already exists", studentCreateDTO.getEmail());
                    throw new UserAlreadyExistsException("Email already registered: " + studentCreateDTO.getEmail());
                });
        User toBeCreated = convertToEntity(studentCreateDTO);

        // hash the plain text and store in the DB
        String hashPassword =  passwordEncoder.encode(toBeCreated.getPassword());
        toBeCreated.setPassword(hashPassword);

        User savedUser = userRepository.save(toBeCreated);

        return convertToUserDTO(savedUser);
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {

        User user = userRepository.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() -> new UserNotFoundException(
                        "User not registered with email: " + loginRequestDTO.getEmail()
                ));
        String password = loginRequestDTO.getPassword();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException("Invalid password");
        }
        // generate the tokens to fulfill next requests
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return  LoginResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

    }

    private User convertToEntity(UserCreateDTO studentCreateDTO) {
        return  modelMapper.map(studentCreateDTO,User.class);
    }

    private UserResponseDTO convertToUserDTO(User user) {
        return modelMapper.map(user, UserResponseDTO.class);
    }

}
