package com.smartcity.smartcityserver.service;

import com.smartcity.smartcityserver.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

/**
 * Service interface for managing users (excluding login and signup operations).
 */
public interface UserService {

    /**
     * Fetches a user by their email.
     *
     * @param email the email of the user
     * @return the UserDTO of the user
     */
    UserDetails getUserByEmail(String email);

    /**
     * Fetches a user by their ID.
     *
     * @param userId the ID of the user
     * @return the UserDTO of the user
     */
    UserDTO getUserById(Long userId);

    /**
     * Fetches all users in the system.
     *
     * @return list of UserDTOs
     */
    List<UserDTO> getAllUsers();
}
