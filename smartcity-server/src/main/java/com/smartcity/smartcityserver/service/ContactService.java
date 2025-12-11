package com.smartcity.smartcityserver.service;

import com.smartcity.smartcityserver.dto.ContactDTO;
import java.util.List;


public interface ContactService {

    /**
     * Saves a new contact message submitted by a user.
     *
     * @param contactDTO DTO containing contact form details
     * @return saved ContactDTO with generated ID and timestamps
     */
    ContactDTO createContact(ContactDTO contactDTO);

    /**
     * Retrieves a contact message by its ID.
     *
     * @param id unique identifier of the contact message
     * @return ContactDTO if found
     */
    ContactDTO getContactById(Long id);

    /**
     * Retrieves all submitted contact messages.
     *
     * @return list of ContactDTO
     */
    List<ContactDTO> getAllContacts();

    /**
     * Deletes a contact message by its ID.
     *
     * @param id ID of the contact message to delete
     */
    void deleteContact(Long id);

    List<ContactDTO> getContactsByUserId(Long userId);

    ContactDTO getContactByIdAndUserId(Long id, Long userId);

    List<ContactDTO> getContacts();
}
