package app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Email Already Exists")
public class TokenException extends Exception {
    public TokenException(String s) {
        super(s);
    }
}
