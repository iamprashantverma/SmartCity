package com.smartcity.smartcityserver.service;

import com.smartcity.smartcityserver.dto.LoginRequestDTO;
import com.smartcity.smartcityserver.dto.LoginResponseDTO;
import com.smartcity.smartcityserver.dto.UserCreateDTO;
import com.smartcity.smartcityserver.dto.UserResponseDTO;
import jakarta.validation.Valid;


public interface AuthService {

    /**
     * Authenticates a user using the provided login credentials.
     *
     * @param loginDTO a validated DTO containing the user's email and password
     * @return LoginResponseDTO containing the JWT token and basic user information
     */
    LoginResponseDTO login(@Valid LoginRequestDTO loginDTO);

    /**
     * Registers a new user in the system.
     *
     * @param studentCreateDTO a validated DTO containing user registration details
     * @return UserResponseDTO containing the created user's information
     */
    UserResponseDTO signUp(@Valid UserCreateDTO studentCreateDTO);
}
