package com.smartcity.smartcityserver.controller;

import com.smartcity.smartcityserver.dto.BillDTO;
import com.smartcity.smartcityserver.dto.ComplaintDTO;
import com.smartcity.smartcityserver.dto.ContactDTO;
import com.smartcity.smartcityserver.service.BillService;
import com.smartcity.smartcityserver.service.ComplaintService;
import com.smartcity.smartcityserver.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@Slf4j
@RequiredArgsConstructor
public class AdminController {

    private final ComplaintService complaintService;
    private final ContactService contactService;
    private final BillService billService;
    // Get all complaints
    @GetMapping("/complaints")
    public ResponseEntity<List<ComplaintDTO>> getAllComplaints() {
        List<ComplaintDTO> complaints = complaintService.getComplaints();
        return ResponseEntity.ok(complaints);
    }

    // Get a specific complaint by ID
    @GetMapping("/complaints/{id}")
    public ResponseEntity<ComplaintDTO> getComplaintById(@PathVariable Long id) {
        ComplaintDTO complaint = complaintService.getComplaintById(id);
        return ResponseEntity.ok(complaint);
    }

    // Get all contact messages
    @GetMapping("/contacts")
    public ResponseEntity<List<ContactDTO>> getAllContacts() {
        List<ContactDTO> contacts = contactService.getContacts();
        return ResponseEntity.ok(contacts);
    }

    // Get a specific contact by ID
    @GetMapping("/contacts/{id}")
    public ResponseEntity<ContactDTO> getContactById(@PathVariable Long id) {
        ContactDTO contact = contactService.getContactById(id);
        return ResponseEntity.ok(contact);
    }

    // check complain status
    @PatchMapping("/complaint/{id}")
    public ResponseEntity<ComplaintDTO> changeComplaintStatus(@PathVariable Long id,@Valid @RequestBody ComplaintDTO complaintDTO) {
        ComplaintDTO dto = complaintService.changeComplaintStatus(id,complaintDTO);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/bills")
    public ResponseEntity<BillDTO> createBill(@Valid @RequestBody BillDTO billDTO ) {
        BillDTO savedBill = billService.createBill(billDTO);
        return ResponseEntity.ok(savedBill);
    }

    @GetMapping("/bills")
    public ResponseEntity<List<BillDTO>> getAllBills(){
        List<BillDTO> allBills = billService.getAllBills();
        return ResponseEntity.ok(allBills);
    }



}
