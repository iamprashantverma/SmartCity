package com.smartcity.smartcityserver.controller;

import com.smartcity.smartcityserver.dto.ComplaintDTO;
import com.smartcity.smartcityserver.dto.ContactDTO;
import com.smartcity.smartcityserver.service.ComplaintService;
import com.smartcity.smartcityserver.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/citizen")
@Slf4j
@RequiredArgsConstructor
public class CitizenController {

    private final ComplaintService complaintService;
    private final ContactService contactService;

    // Create a complaint
    @PostMapping("/complaints")
    public ResponseEntity<ComplaintDTO> createComplaint(@Valid @RequestBody ComplaintDTO complaintDTO) {
        ComplaintDTO created = complaintService.createComplaint(complaintDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Update a complaint
    @PutMapping("/complaints/{id}")
    public ResponseEntity<ComplaintDTO> updateComplaint(@PathVariable Long id, @Valid @RequestBody ComplaintDTO complaintDTO) {
        ComplaintDTO updated = complaintService.updateComplaint(id, complaintDTO);
        return ResponseEntity.ok(updated);
    }

    // Get all complaints
    @GetMapping("/complaints")
    public ResponseEntity<List<ComplaintDTO>> getComplaints() {
        List<ComplaintDTO> complaints = complaintService.getComplaints();
        return ResponseEntity.ok(complaints);
    }

    // Get a specific complaint by ID
    @GetMapping("/complaints/{id}")
    public ResponseEntity<ComplaintDTO> getComplaintById(@PathVariable Long id) {
        ComplaintDTO complaint = complaintService.getComplaintById(id);
        return ResponseEntity.ok(complaint);
    }

    // Submit a contact message
    @PostMapping("/contacts")
    public ResponseEntity<ContactDTO> submitContact(@Valid @RequestBody ContactDTO contactDTO) {
        ContactDTO created = contactService.createContact(contactDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Get all contact messages
    @GetMapping("/contacts")
    public ResponseEntity<List<ContactDTO>> getContacts() {
        List<ContactDTO> contacts = contactService.getContacts();
        return ResponseEntity.ok(contacts);
    }

    // Get a specific contact message by ID
    @GetMapping("/contacts/{id}")
    public ResponseEntity<ContactDTO> getContactById(@PathVariable Long id) {
        ContactDTO contact = contactService.getContactById(id);
        return ResponseEntity.ok(contact);
    }
}
