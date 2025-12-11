package com.smartcity.smartcityserver.controller;

import com.smartcity.smartcityserver.dto.LoginRequestDTO;
import com.smartcity.smartcityserver.dto.LoginResponseDTO;
import com.smartcity.smartcityserver.dto.UserDTO;
import com.smartcity.smartcityserver.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginDTO){
        LoginResponseDTO loginResponseDTO = authService.login(loginDTO);

        return ResponseEntity.ok(loginResponseDTO);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> singUp(@Valid @RequestBody UserDTO studentCreateDTO) {
        UserDTO userCreated = authService.signUp(studentCreateDTO);

        return new ResponseEntity<>(userCreated, HttpStatus.CREATED);
    }


}
