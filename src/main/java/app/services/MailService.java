package app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    public JavaMailSender emailSender;

    public void sendEmail() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("fbackhaus94@gmail.com");
        message.setFrom("reservas@pupi.com.ar");
        message.setSubject("Prueba Pupi");
        message.setText("HOLIS");
        emailSender.send(message);
    }
}
