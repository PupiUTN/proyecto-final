package app.controllers;

import app.models.entities.Reserva;
import app.services.PaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/payments")
public class PaymentsController {

    PaymentsService paymentsService;

    @Autowired
    public PaymentsController(PaymentsService paymentsService) {
        this.paymentsService = paymentsService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<String> createPayment(@RequestBody Reserva entity)  {
        String response = paymentsService.createPreference(entity).toString();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
