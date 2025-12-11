package com.smartcity.smartcityserver.dto;

import com.smartcity.smartcityserver.entity.enums.ComplaintStatus;
import com.smartcity.smartcityserver.entity.enums.Priority;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ComplaintDTO {

    private Long id;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Complaint type cannot be blank")
    @Size(max = 100, message = "Complaint type must not exceed 100 characters")
    private String complaintType;

    @NotBlank(message = "Description cannot be blank")
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @Size(max = 255, message = "Attachment URL must not exceed 255 characters")
    private String attachmentUrl;

    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;

    private ComplaintStatus status = ComplaintStatus.PENDING;

    private Priority priority = Priority.NORMAL;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
