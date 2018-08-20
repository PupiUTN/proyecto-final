package app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Bussines Logic Expcetion")
public class BussinesLogicException extends Exception {
    public BussinesLogicException(String s) {

    }
}
