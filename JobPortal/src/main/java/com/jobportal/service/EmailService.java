package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.jobportal.entity.Application;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSelectionMail(Application application) {

        String to = application.getStudent().getEmail();
        String jobRole = application.getJob().getJobRole();
        String company = application.getJob().getCompanyName();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("🎉 You are selected!");
        message.setText(
            "Dear " + application.getStudent().getName() + ",\n\n" +
            "Congratulations!\n\n" +
            "You have been SELECTED for the position of " + jobRole +
            " at " + company + ".\n\n" +
            "Our team will contact you with further details.\n\n" +
            "Best Regards,\n" +
            company + " HR Team"
        );

        mailSender.send(message);
    }
}
