package app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Email Already Exists")
public class EmailExistsException extends Exception {
    public EmailExistsException(String s) {

    }
}
