package app.utils;

import app.models.entities.User;
import com.mercadopago.resources.datastructures.preference.*;

public class PaymentsUtils {

    public static Item fillItem(Float price, String fullName) {
        Item item = new Item();
        item.setTitle("Pupi - Pago de Estadía")
                .setQuantity(1)
                .setDescription("Servicios de cuidado de mascotas a " + fullName)
                .setPictureUrl("http://pupi.com.ar/assets/images/logo.png")
                .setCurrencyId("ARS")
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

}
