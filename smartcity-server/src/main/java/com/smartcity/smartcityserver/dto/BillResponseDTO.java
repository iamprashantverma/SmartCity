package com.smartcity.smartcityserver.dto;

import com.smartcity.smartcityserver.entity.enums.BillType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BillResponseDTO {

    private Long billId;
    private BillType billType;
    private String consumerId;
    private Double amount;

    private Boolean paid;
    private LocalDateTime paidAt;
    private LocalDateTime createdAt;
}
