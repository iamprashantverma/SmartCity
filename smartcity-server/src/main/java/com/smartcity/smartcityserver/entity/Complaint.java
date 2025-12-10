package com.smartcity.smartcityserver.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String complaintType;   // e.g., Garbage, Water, Electricity, Roads, Crime

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String citizenName;

    @Column(nullable = false)
    private String citizenEmail;

    private String citizenPhone;



    @Column(nullable = false)
    private LocalDateTime createdAt;




}
