package com.smartcity.smartcityserver.repositoriy;

import com.smartcity.smartcityserver.entity.Contact;
import com.smartcity.smartcityserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    // Fetch all contacts of a specific user by their userId
    List<Contact> findByUser_UserId(Long userId);

    // Fetch all contacts of a specific user by User object
    List<Contact> findByUser(User user);

    // Fetch a contact by id and userId (nested property)
    Optional<Contact> findByIdAndUser_UserId(Long id, Long userId);
}

