package com.smartcity.smartcityserver.dto;

import com.smartcity.smartcityserver.entity.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;

    @NotBlank(message = "Please enter a valid name!")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    private Role role;

    @NotBlank(message = "Please enter email")
    @Email(message = "Please enter a valid email")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
    private String password;

    private Boolean active;

    @Size(max = 13, message = "Phone number can be maximum 13 characters")
    private String phoneNumber;

    @Size(max = 255, message = "Profile picture URL is too long")
    private String profilePictureUrl;

    private Boolean emailVerified;
}
