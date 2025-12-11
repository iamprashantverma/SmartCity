package com.smartcity.smartcityserver.entity;


import com.smartcity.smartcityserver.entity.enums.ComplaintStatus;
import com.smartcity.smartcityserver.entity.enums.Priority;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Data
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String complaintType;

    @Column(nullable = false, length = 500)
    private String description;

    private String attachmentUrl;

    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplaintStatus status = ComplaintStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.NORMAL;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist(){
        if(createdAt ==null)
            createdAt = LocalDateTime.now();
        if(updatedAt == null)
            updatedAt = LocalDateTime.now();
    }

}
