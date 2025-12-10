package com.smartcity.smartcityserver.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDTO {
    private String refreshToken;
    private String accessToken;
}
