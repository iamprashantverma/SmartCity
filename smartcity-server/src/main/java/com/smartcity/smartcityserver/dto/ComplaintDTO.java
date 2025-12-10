package com.smartcity.smartcityserver.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintDTO {
    private String complaintType;   // e.g., Garbage, Electricity, Water
    private String description;

    private String citizenName;
    private String citizenEmail;
    private String citizenPhone;
}
