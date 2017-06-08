package app.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {
    
    @GetMapping("api/hello")
    public String index() {
        return "Greetings from Spring Boot!";
    }
    
}
