package app.controllers;

import app.services.MailService;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {
    private static final Logger logger = LogManager.getLogger(HelloController.class);

    @GetMapping("api/hello")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @PostMapping("api/log")
    public void log() {
        logger.info("HOLIS");
    }
    
}
