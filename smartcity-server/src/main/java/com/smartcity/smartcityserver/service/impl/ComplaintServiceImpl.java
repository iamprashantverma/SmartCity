package com.smartcity.smartcityserver.service.impl;

import com.smartcity.smartcityserver.dto.ComplaintDTO;
import com.smartcity.smartcityserver.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService {

    @Override
    public ComplaintDTO createComplaint(ComplaintDTO complaintDTO) {
        return null;
    }

    @Override
    public ComplaintDTO updateComplaint(Long id, ComplaintDTO complaintDTO) {
        return null;
    }

    @Override
    public ComplaintDTO getComplaintById(Long id) {
        return null;
    }

    @Override
    public List<ComplaintDTO> getAllComplaints() {
        return List.of();
    }

    @Override
    public ComplaintDTO deleteComplaint(Long id) {
        return null;
    }
}
