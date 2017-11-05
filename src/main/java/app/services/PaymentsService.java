package app.services;

import app.models.entities.Cuidador;
import app.models.entities.Reserva;
import app.models.entities.User;
import com.mercadopago.*;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class PaymentsService {

    MP mp = new MP("92590042667422", "R8bMZvxKoJgO4gxALPfVnRv4ueJyqwRL");

    public JSONObject createPreference(Reserva reserva) {
        Float totalAmount = reserva.getPrecioTotal();
        User user = reserva.getPerro().getUser();
        Cuidador cuidador = reserva.getCuidador();
        JSONObject preference = null;
        JSONObject transactionInfo = new JSONObject();
        JSONArray items = new JSONArray();
        JSONObject item = new JSONObject();
        JSONObject payer = new JSONObject();
        try{
            item.put("title", "Pupi - Pago de Estadía");
            item.put("description", "Servicios de cuidado de mascotas a " + cuidador.getUser().getFullName());
            item.put("quantity", 1);
            item.put("picture_url", "http://pupi.com.ar/assets/images/logo.png");
            item.put("currency_id", "ARS");
            item.put("unit_price", totalAmount);
            items.put(item);

            if(user.getFullName() != null) {
                String[] nombreCompleto = user.getFullName().split(" ");
                payer.put("name", nombreCompleto[0]);
                payer.put("surname", nombreCompleto[1]);
            }

            if(user.getEmail() != null) {
                payer.put("email", user.getEmail());
            }

            if(user.getPhone() != null) {
                JSONObject phone = new JSONObject();
                phone.put("number", user.getPhone());
                payer.put("phone", phone);
            }

            transactionInfo.put("items", items);
            transactionInfo.put("payer", payer);

            preference = mp.createPreference(transactionInfo.toString());
        }
        catch(Exception e) {
            System.out.println("Exception when trying to create preference " + e.toString());
        }
        return preference;
    }
}
