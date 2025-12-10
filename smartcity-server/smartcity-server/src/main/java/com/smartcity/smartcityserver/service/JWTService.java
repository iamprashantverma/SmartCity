package com.smartcity.smartcityserver.service;


import com.smartcity.smartcityserver.entity.User;

public interface JWTService {

    /**
     * Generates a JWT access token for the given user.
     *
     * @param user the authenticated user for whom the token is generated
     * @return a signed JWT access token
     */
    String generateAccessToken(User user);

    /**
     * Generates a JWT refresh token for the given user.
     *
     * @param user the authenticated user for whom the refresh token is generated
     * @return a signed JWT refresh token
     */
    String generateRefreshToken(User user);

    /**
     * Extracts the user identifier (typically email or userId)
     * from the provided JWT token.
     *
     * @param token the JWT token to parse
     * @return the user identifier contained in the token
     */
    String getUserIdFromToken(String token);
}
