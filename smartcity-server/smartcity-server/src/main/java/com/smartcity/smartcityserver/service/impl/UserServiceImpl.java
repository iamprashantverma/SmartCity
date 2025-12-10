package com.smartcity.smartcityserver.service.impl;

import com.smartcity.smartcityserver.repositoriy.UserRepository;
import com.smartcity.smartcityserver.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl  implements UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;


    @Override
    public UserDetails getUserByEmail(String userEmail) {
        return null;
    }
}
