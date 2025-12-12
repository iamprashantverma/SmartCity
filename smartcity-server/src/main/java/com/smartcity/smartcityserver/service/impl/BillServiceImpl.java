package com.smartcity.smartcityserver.service.impl;

import com.smartcity.smartcityserver.dto.BillDTO;
import com.smartcity.smartcityserver.entity.Bill;
import com.smartcity.smartcityserver.entity.User;
import com.smartcity.smartcityserver.exception.BillNotFoundException;
import com.smartcity.smartcityserver.exception.ResourceNotFoundException;
import com.smartcity.smartcityserver.exception.UserNotFoundException;
import com.smartcity.smartcityserver.repositoriy.BillRepository;
import com.smartcity.smartcityserver.repositoriy.UserRepository;
import com.smartcity.smartcityserver.service.BillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class BillServiceImpl implements BillService {

    private final BillRepository billRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Override
    public BillDTO createBill(BillDTO billDTO) {
        Bill bill = modelMapper.map(billDTO, Bill.class);
        Bill saved = billRepository.save(bill);
        User user = userRepository.findById(billDTO.getUserId()).orElseThrow(()->
                new ResourceNotFoundException("Invalid UserId :" + billDTO.getUserId()));

        log.info("Bill created with id={}", saved.getBillId());
        return modelMapper.map(saved, BillDTO.class);
    }

    @Override
    public BillDTO updateBill(Long billId, BillDTO billDTO) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new BillNotFoundException("Bill not found with id: " + billId));

        bill.setBillType(billDTO.getBillType());
        bill.setAmount(billDTO.getAmount());
        bill.setUserId(billDTO.getUserId());
        bill.setPaid(billDTO.getPaid());

        if (billDTO.getPaid() != null && billDTO.getPaid() && bill.getPaidAt() == null) {
            bill.setPaidAt(LocalDateTime.now());
        }

        Bill updated = billRepository.save(bill);
        log.info("Bill updated with id={}", updated.getBillId());
        return modelMapper.map(updated, BillDTO.class);
    }

    @Override
    public List<BillDTO> getAllBills() {
        User user = getCurrentUser();
        List<Bill>allBills;
        if (user.hasRole("ADMIN")) {
            allBills = billRepository.findAll();
        } else {
            allBills = billRepository.findAllByUserId(user.getUserId());
        }
        log.info("Fetched all bills, count={}", allBills.size());
        return allBills.stream()
                .map(b -> modelMapper.map(b, BillDTO.class))
                .toList();
    }

    @Override
    public BillDTO getBillById(Long billId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new BillNotFoundException("Bill not found with id: " + billId));
        log.info("Fetched bill with id={}", billId);
        return modelMapper.map(bill, BillDTO.class);
    }

    @Override
    public void markBillAsPaid(Long billId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new BillNotFoundException("Bill not found with id: " + billId));

        if (!bill.getPaid()) {
            bill.setPaid(true);
            bill.setPaidAt(LocalDateTime.now());
            billRepository.save(bill);
            log.info("Bill marked as paid with id={}", billId);
        }
    }

    // Helper to fetch currently logged-in user
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
