package com.smartcity.smartcityserver.service.impl;


import com.smartcity.smartcityserver.dto.ContactDTO;
import com.smartcity.smartcityserver.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {


    @Override
    public ContactDTO createContact(ContactDTO contactDTO) {
        return null;
    }

    @Override
    public ContactDTO getContactById(Long id) {
        return null;
    }

    @Override
    public List<ContactDTO> getAllContacts() {
        return List.of();
    }

    @Override
    public void deleteContact(Long id) {

    }

    @Override
    public List<ContactDTO> getContactsByUserId(Long userId) {
        return List.of();
    }

    @Override
    public ContactDTO getContactByIdAndUserId(Long id, Long userId) {
        return null;
    }

    @Override
    public List<ContactDTO> getContacts() {
        return List.of();
    }
}
