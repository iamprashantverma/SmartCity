package com.smartcity.smartcityserver.service.impl;

import com.smartcity.smartcityserver.dto.UserDTO;
import com.smartcity.smartcityserver.entity.User;
import com.smartcity.smartcityserver.exception.UserNotFoundException;
import com.smartcity.smartcityserver.repositoriy.UserRepository;
import com.smartcity.smartcityserver.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("User not found with email={}", email);
                    return new UserNotFoundException("User not found with email: " + email);
                });
        log.info("Fetched user with email={}", email);
        return user;
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("User not found with id={}", userId);
                    return new UserNotFoundException("User not found with id: " + userId);
                });
        log.info("Fetched user with id={}", userId);
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        log.info("Fetched all users, count={}", users.size());
        return users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
    }
}
