package com.smartcity.smartcityserver.service;

import com.smartcity.smartcityserver.dto.ComplaintDTO;
import java.util.List;

public interface ComplaintService {

    /**
     * Creates a new complaint.
     *
     * @param complaintDTO DTO containing complaint details
     * @return saved ComplaintDTO with generated ID and timestamps
     */
    ComplaintDTO createComplaint(ComplaintDTO complaintDTO);

    /**
     * Updates an existing complaint.
     *
     * @param id ID of the complaint to update
     * @param complaintDTO DTO with updated complaint details
     * @return updated ComplaintDTO
     */
    ComplaintDTO updateComplaint(Long id, ComplaintDTO complaintDTO);

    /**
     * Retrieves a complaint by ID.
     *
     * @param id complaint ID
     * @return ComplaintDTO if found
     */
    ComplaintDTO getComplaintById(Long id);

    /**
     * Retrieves all complaints.
     *
     * @return list of ComplaintDTO
     */
    List<ComplaintDTO> getAllComplaints();

    /**
     * Deletes a complaint by ID.
     *
     * @param id complaint ID
     */
    ComplaintDTO deleteComplaint(Long id);
}
