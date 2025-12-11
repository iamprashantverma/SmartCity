package com.smartcity.smartcityserver.service;

import com.smartcity.smartcityserver.dto.ComplaintDTO;
import jakarta.validation.Valid;
import java.util.List;

public interface ComplaintService {

    /**
     * Create a new complaint for the currently logged-in user.
     *
     * @param complaintDTO the complaint data to create
     * @return the created complaint as a DTO
     */
    ComplaintDTO createComplaint(@Valid ComplaintDTO complaintDTO);

    /**
     * Update an existing complaint.
     * <p>
     * Citizens can update only their own complaints.
     * Admins can update any complaint.
     *
     * @param id           the ID of the complaint to update
     * @param complaintDTO the updated complaint data
     * @return the updated complaint as a DTO
     */
    ComplaintDTO updateComplaint(Long id, @Valid ComplaintDTO complaintDTO);

    /**
     * Retrieve all complaints visible to the currently logged-in user.
     * <p>
     * - Admin: returns all complaints.
     * - Citizen: returns only their own complaints.
     *
     * @return a list of complaint DTOs
     */
    List<ComplaintDTO> getComplaints();

    /**
     * Retrieve a specific complaint by ID.
     * <p>
     * - Admin: can access any complaint.
     * - Citizen: can access only their own complaint.
     *
     * @param id the ID of the complaint to retrieve
     * @return the complaint as a DTO
     */
    ComplaintDTO getComplaintById(Long id);
}
