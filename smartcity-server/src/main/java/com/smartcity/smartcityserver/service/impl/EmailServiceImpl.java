package com.smartcity.smartcityserver.service.impl;


import com.smartcity.smartcityserver.exception.EmailSendingException;
import com.smartcity.smartcityserver.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;


    @Override
    @Async
    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            log.info("Email sent successfully to {}", to);

        } catch (MailException e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
            throw new EmailSendingException("Failed to send email to " + to, e);
        }
    }
}
