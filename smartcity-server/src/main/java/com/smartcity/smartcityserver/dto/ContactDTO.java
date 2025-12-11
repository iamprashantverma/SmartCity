package com.smartcity.smartcityserver.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ContactDTO {

    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    private String email;

    @Size(max = 15, message = "Phone number must not exceed 15 digits")
    private String phoneNumber;

    @NotBlank(message = "Message cannot be empty")
    @Size(max = 2000, message = "Message must not exceed 2000 characters")
    private String message;

    private LocalDateTime submittedAt;
}
