package app.controllers;

import app.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {

    @GetMapping("api/hello")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @PostMapping("api/email")
    public void sendEmail() {
        MailService.sendEmail("fbackhaus94@gmail.com", "prueba");
    }
    
}
