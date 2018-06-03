package app.utils;

import app.models.entities.User;
import com.mercadopago.resources.datastructures.preference.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.MultiValueMap;

import java.util.Collections;

public class PaymentsUtils {

    private static final String TITLE = "Pupi - Pago de Estadía";
    private static final String DESCRIPTION = "Servicios de cuidado de mascotas a ";
    private static final String PICTURE_URL = "http://pupi.com.ar/assets/images/logo.png";
    private static final String CURRENCY = "ARS";

    public static Item fillItem(Float price, String fullName, String reservaId) {
        Item item = new Item();
        item.setTitle(TITLE)
                .setId(reservaId)
                .setQuantity(1)
                .setDescription(DESCRIPTION + fullName)
                .setPictureUrl(PICTURE_URL)
                .setCurrencyId(CURRENCY)
                .setUnitPrice(price);
        return item;
    }

    public static Payer fillPayer(User user) {
        Payer payer = new Payer();
        if (user.getFullName() != null) {
            String[] nombreCompleto = user.getFullName()
                    .split(" ");
            payer.setName(nombreCompleto[0]);
            payer.setSurname(nombreCompleto[1]);
        }

        if (user.getEmail() != null) {
            payer.setEmail(user.getEmail());
        }

        if (user.getPhone() != null) {
            payer.setPhone(new Phone().setAreaCode("")
                    .setNumber(user.getPhone()));
        }
        if (user.getDireccion() != null) {
            payer.setAddress(new Address()
                    .setStreetName(user.getDireccion()
                            .getCalle())
                    .setStreetNumber(user.getDireccion()
                            .getNumero())
                    .setZipCode(user.getDireccion()
                            .getCodigoPostal()));
        }
        return payer;
    }

    public static MultiValueMap<String, String> getMercadoPagoHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}
