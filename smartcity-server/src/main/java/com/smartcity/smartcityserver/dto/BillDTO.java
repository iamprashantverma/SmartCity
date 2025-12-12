package com.smartcity.smartcityserver.dto;

import com.smartcity.smartcityserver.entity.enums.BillType;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BillDTO {

    private Long billId;

    @NotNull(message = "Bill type is required")
    private BillType billType;


    @NotNull(message = "Please Enter User Id")
    private Long userId;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private Double amount;

    private Boolean paid;

    private LocalDateTime paidAt;

    private LocalDateTime createdAt;
}
