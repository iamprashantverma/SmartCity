package com.smartcity.smartcityserver.service.impl;

import com.smartcity.smartcityserver.dto.ComplaintDTO;
import com.smartcity.smartcityserver.entity.Complaint;
import com.smartcity.smartcityserver.entity.User;

import com.smartcity.smartcityserver.exception.ComplaintNotFoundException;
import com.smartcity.smartcityserver.exception.ResourceNotFoundException;
import com.smartcity.smartcityserver.repositoriy.ComplaintRepository;
import com.smartcity.smartcityserver.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ComplaintServiceImpl implements ComplaintService {

    private final ModelMapper modelMapper;
    private final ComplaintRepository complaintRepository;

    @Override
    @Transactional
    public ComplaintDTO createComplaint(ComplaintDTO complaintDTO) {
        User user = getCurrentUser();
        Complaint complaint = modelMapper.map(complaintDTO, Complaint.class);
        complaint.setUser(user);

        Complaint saved = complaintRepository.save(complaint);
        log.info("Complaint created with id={} by user={}", saved.getId(), user.getUserId());

        return modelMapper.map(saved, ComplaintDTO.class);
    }

    @Override
    @Transactional
    public ComplaintDTO updateComplaint(Long id, ComplaintDTO complaintDTO) {
        User user = getCurrentUser();
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint not found with id: " + id));

        if (!user.hasRole("ADMIN") && !complaint.getUser().getUserId().equals(user.getUserId())) {
            log.warn("User {} attempted to update complaint {} without permission", user.getUserId(), id);
            throw new AccessDeniedException("Access denied");
        }

        complaint.setComplaintType(complaintDTO.getComplaintType());
        complaint.setDescription(complaintDTO.getDescription());
        Complaint updated = complaintRepository.save(complaint);

        log.info("Complaint updated with id={} by user={}", updated.getId(), user.getUserId());
        return modelMapper.map(updated, ComplaintDTO.class);
    }

    @Override
    public List<ComplaintDTO> getComplaints() {
        User user = getCurrentUser();
        List<Complaint> complaints;

        if (user.hasRole("ADMIN")) {
            complaints = complaintRepository.findAll();
            log.info("Admin user {} fetched all complaints", user.getUserId());
        } else {
            complaints = complaintRepository.findByUser(user);
            log.info("User {} fetched their own complaints", user.getUserId());
        }

        return complaints.stream()
                .map(c -> modelMapper.map(c, ComplaintDTO.class))
                .toList();
    }

    @Override
    public ComplaintDTO getComplaintById(Long id) {
        User user = getCurrentUser();
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint not found with id: " + id));

        if (!user.hasRole("ADMIN") && !complaint.getUser().getUserId().equals(user.getUserId())) {
            log.warn("User {} attempted to access complaint {} without permission", user.getUserId(), id);
            throw new AccessDeniedException("Access denied");
        }

        log.info("Complaint fetched with id={} by user={}", id, user.getUserId());
        return modelMapper.map(complaint, ComplaintDTO.class);
    }

    @Override
    public ComplaintDTO changeComplaintStatus(Long id, ComplaintDTO complaintDTO) {
        Complaint complaint = complaintRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Invalid complain number:"+ id));
        complaint.setStatus(complaintDTO.getStatus());
        Complaint updatedComplaint = complaintRepository.save(complaint);

        return modelMapper.map(updatedComplaint,ComplaintDTO.class);
    }

    // Helper to fetch currently logged-in user
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
