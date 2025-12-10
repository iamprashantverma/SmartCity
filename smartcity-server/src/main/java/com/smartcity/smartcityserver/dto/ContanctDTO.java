package com.smartcity.smartcityserver.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContanctDTO {
    private String fullName;
    private String email;
    private String phone;
    private String message;
}
