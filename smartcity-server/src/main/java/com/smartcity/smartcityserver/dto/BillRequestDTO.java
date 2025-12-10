package com.smartcity.smartcityserver.dto;

import com.smartcity.smartcityserver.entity.enums.BillType;
import lombok.Data;

@Data
public class BillRequestDTO {

    private BillType billType;
    private String consumerId;
    private Double amount;
}
