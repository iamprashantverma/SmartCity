package com.smartcity.smartcityserver.service.impl;

import com.smartcity.smartcityserver.dto.ContactDTO;
import com.smartcity.smartcityserver.entity.Contact;
import com.smartcity.smartcityserver.entity.User;
import com.smartcity.smartcityserver.exception.ContactNotFoundException;
import com.smartcity.smartcityserver.repositoriy.ContactRepository;
import com.smartcity.smartcityserver.service.ContactService;
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
public class ContactServiceImpl implements ContactService {

    private final ModelMapper modelMapper;
    private final ContactRepository contactRepository;

    @Override
    public ContactDTO createContact(ContactDTO contactDTO) {
        User user = getCurrentUser();

        Contact contact = modelMapper.map(contactDTO, Contact.class);
        contact.setUser(user);

        Contact saved = contactRepository.save(contact);
        log.info("Contact created with id={} by user={}", saved.getId(), user.getUserId());

        return modelMapper.map(saved, ContactDTO.class);
    }

    @Override
    public ContactDTO getContactById(Long id) {
        User user = getCurrentUser();

        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ContactNotFoundException("Contact not found with id: " + id));

        if (!user.hasRole("ADMIN") && !contact.getUser().getUserId().equals(user.getUserId())) {
            log.warn("User {} attempted to access contact {} without permission", user.getUserId(), id);
            throw new AccessDeniedException("Access denied");
        }

        log.info("Contact fetched with id={} by user={}", id, user.getUserId());
        return modelMapper.map(contact, ContactDTO.class);
    }

    @Override
    public List<ContactDTO> getAllContacts() {
        User user = getCurrentUser();

        List<Contact> contacts;
        if (user.hasRole("ADMIN")) {
            contacts = contactRepository.findAll();
            log.info("Admin user {} fetched all contacts", user.getUserId());
        } else {
            contacts = contactRepository.findByUser(user);
            log.info("User {} fetched their own contacts", user.getUserId());
        }

        return contacts.stream()
                .map(c -> modelMapper.map(c, ContactDTO.class))
                .toList();
    }

    @Override
    public void deleteContact(Long id) {
        User user = getCurrentUser();

        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ContactNotFoundException("Contact not found with id: " + id));

        if (!user.hasRole("ADMIN") && !contact.getUser().getUserId().equals(user.getUserId())) {
            log.warn("User {} attempted to delete contact {} without permission", user.getUserId(), id);
            throw new AccessDeniedException("Access denied");
        }

        contactRepository.delete(contact);
        log.info("Contact deleted with id={} by user={}", id, user.getUserId());
    }

    @Override
    public List<ContactDTO> getContactsByUserId(Long userId) {
        List<Contact> contacts = contactRepository.findByUser_UserId(userId);

        return contacts.stream()
                .map(c -> modelMapper.map(c, ContactDTO.class))
                .toList();
    }

    @Override
    public ContactDTO getContactByIdAndUserId(Long id, Long userId) {
        Contact contact = contactRepository.findByIdAndUser_UserId(id, userId)
                .orElseThrow(() -> new ContactNotFoundException("Contact not found with id: " + id + " and userId: " + userId));

        return modelMapper.map(contact, ContactDTO.class);
    }

    @Override
    public List<ContactDTO> getContacts() {
        User user = getCurrentUser();

        List<Contact> contacts;
        if (user.hasRole("ADMIN")) {
            contacts = contactRepository.findAll();
        } else {
            contacts = contactRepository.findByUser(user);
        }

        return contacts.stream()
                .map(c -> modelMapper.map(c, ContactDTO.class))
                .toList();
    }

    // Helper to fetch currently logged-in user
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
