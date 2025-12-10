package com.smartcity.smartcityserver.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

    UserDetails getUserByEmail(String userEmail);
}
