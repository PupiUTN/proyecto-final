package app.services;

import com.mercadopago.MP;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class PaymentsService {

    MP mp = new MP("92590042667422", "R8bMZvxKoJgO4gxALPfVnRv4ueJyqwRL");

    public JSONObject getPreference() {
        JSONObject preference = null;
        String preferenceData = "{'items':"+
                "[{"+
                "'title':'Multicolor kite',"+
                "'quantity':1,"+
                "'currency_id':'ARS',"+ // Available currencies at: https://api.mercadopago.com/currencies
                "'unit_price':10.0"+
                "}]"+
                "}";

        try {
            preference = mp.createPreference(preferenceData);
        }
        catch(Exception e) {
            System.out.println("Excepcion a la hora de crear la preferencia: " + e.toString());
        }
        return preference;
    }
}
