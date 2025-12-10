package com.smartcity.smartcityserver.advice;



import com.smartcity.smartcityserver.exception.*;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateActionException.class)
    public ResponseEntity<APIResponse<?>> handleDuplicateActionException(DuplicateActionException ex) {
        log.error("Duplication Action exception: {}", ex.getMessage());
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<APIResponse<?>> handleUserNotFound(UserNotFoundException ex) {
        log.warn("User not found: {}", ex.getMessage());
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<APIResponse<?>> handleResourcesNotFound(ResourceNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<APIResponse<?>> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        log.warn("User already exists: {}", ex.getMessage());
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<APIResponse<?>> handleInvalidCredentials(InvalidCredentialsException ex) {
        log.warn("Invalid credentials: {}", ex.getMessage());
        return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }


    @ExceptionHandler(JwtException.class)
    public ResponseEntity<APIResponse<?>> handleJWTException(JwtException ex) {
        log.warn("JWT error: {}", ex.getMessage());
        return buildResponse(HttpStatus.UNAUTHORIZED, "Invalid or expired JWT token.");
    }


    @ExceptionHandler(IOException.class)
    public ResponseEntity<APIResponse<?>> handleCloudinaryNetworkIssues(IOException ex) {
        log.error("Cloudinary network issue: {}", ex.getMessage());
        return buildResponse(HttpStatus.GATEWAY_TIMEOUT, "Cloudinary network timeout or connectivity issue.");
    }

    @ExceptionHandler(QuizTimeOverException.class)
    public ResponseEntity<APIResponse<?>> handleQuizTimeOver(QuizTimeOverException ex) {
        log.warn("Quiz time over: {}", ex.getMessage());
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(QuizNotFinishedException.class)
    public ResponseEntity<APIResponse<?>> handleQuizNotFinished(QuizNotFinishedException ex) {
        log.warn("Quiz not finished: {}", ex.getMessage());
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }



    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<APIResponse<?>> handleInvalidMethodArgument(MethodArgumentNotValidException ex) {
        // Extract only the default messages from the validation errors
        List<String> errors = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());

        APIError apiError = APIError.builder()
                .status(HttpStatus.BAD_REQUEST)
                .message(String.join(", ", errors))
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new APIResponse<>(apiError));
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<APIResponse<?>> handleGenericException(Exception ex) {
        log.error("Unhandled exception: {}", ex.getMessage());
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong: " + ex.getMessage());
    }


    // Helper method
    private ResponseEntity<APIResponse<?>> buildResponse(HttpStatus status, String message) {
        APIError error = new APIError(status, message);
        return ResponseEntity.status(status).body(new APIResponse<>(error));
    }
}
