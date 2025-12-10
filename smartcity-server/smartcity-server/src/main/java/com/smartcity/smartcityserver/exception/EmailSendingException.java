package com.smartcity.smartcityserver.exception;

import org.springframework.mail.MailException;

public class EmailSendingException extends RuntimeException {
    public EmailSendingException(String message, MailException e) {
        super(message);
    }
}
