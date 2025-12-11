package com.smartcity.smartcityserver.entity;

import com.smartcity.smartcityserver.entity.enums.BillType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity(name = "bills")
@Data
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BillType billType;

    @Column(nullable = false, length = 50)
    private String consumerId;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean paid = false;

    private LocalDateTime paidAt;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
