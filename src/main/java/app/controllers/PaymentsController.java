package app.controllers;

import app.models.entities.Reserva;
import app.services.PaymentsService;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/notifications", method = RequestMethod.POST)
    public HttpStatus receiveNotification(@RequestParam("topic") String topic, @RequestParam("id") String paymentId)  {
        if("payment".equalsIgnoreCase(topic)) {
            JSONObject response = paymentsService.getPaymentInfo(paymentId);
        }
        return HttpStatus.OK;
    }


}
