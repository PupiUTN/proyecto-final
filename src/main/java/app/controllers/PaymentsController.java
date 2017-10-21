package app.controllers;

import app.services.PaymentsService;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping(method = RequestMethod.GET)
    public JSONObject getPreference()  {
        return paymentsService.getPreference();
    }


}
