package app.services;

import app.models.entities.Cuidador;
import app.models.entities.Payment;
import app.models.entities.Reserva;
import app.models.entities.User;
import app.persistence.PaymentRepository;
import com.mercadopago.*;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentsService {

    private PaymentRepository paymentRepository;
    private ReservaService reservaService;

    private static final Logger logger = LogManager.getLogger(PaymentsService.class);
    MP mp = new MP("92590042667422", "R8bMZvxKoJgO4gxALPfVnRv4ueJyqwRL");

    @Autowired
    public PaymentsService(PaymentRepository paymentRepository, ReservaService reservaService) {
        this.paymentRepository = paymentRepository;
        this.reservaService = reservaService;
    }

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
            transactionInfo.put("notification_url", "http://pupi.com.ar/api/payments/notifications");
            transactionInfo.put("external_reference", reserva.getId());

            preference = mp.createPreference(transactionInfo.toString());
        }
        catch(Exception e) {
            System.out.println("Exception when trying to create preference " + e.toString());
        }
        return preference;
    }

    public JSONObject getPaymentInfo(String id, String topic) {
        try {
            JSONObject merchantOrderInfo = null;
            JSONObject paymentInfo = null;
            if (topic.equalsIgnoreCase("payment")) {
                paymentInfo = mp.get("/collections/notifications/" + id);
                Long merchantOrderId = paymentInfo.getJSONObject("response").getJSONObject("collection").optLong("merchant_order_id");
                merchantOrderInfo = mp.get("/merchant_orders/" + merchantOrderId);
            } else if (topic.equalsIgnoreCase("merchant_order")) {
                merchantOrderInfo = mp.get("/merchant_orders/" + id);
            }
            if (merchantOrderInfo != null && merchantOrderInfo.getInt("status") == 200) {
                Reserva booking = getReserva(Long.valueOf(paymentInfo.getJSONObject("response").getString("external_reference")));
                Float paidAmount = 0f;
                JSONArray payments = merchantOrderInfo.getJSONObject("response").getJSONArray("payments");
                for (int i = 0; i < payments.length(); i++) {
                    JSONObject payment = payments.getJSONObject(i);
                    if ("approved".equalsIgnoreCase(payment.getString("status"))) {
                        paidAmount += Float.parseFloat(payment.get("transaction_amount").toString());
                    }
                    createPayment(booking, Long.valueOf(id), payment.getString("status"), payment.toString());
                }
                Float bookingAmount = Float.parseFloat(merchantOrderInfo.getJSONObject("response").get("total_amount").toString());

                if (paidAmount >= bookingAmount) {
                    reservaService.setEstadoFinalizado(booking);
                }
            }
        }
        catch(Exception e) {
            System.out.println(e.toString());
            logger.error("Error when trying to get payment info " + e.toString());
        }
        return null;
    }

    public Payment createPayment(Reserva reserva, Long mpId, String status, String paymentData) {
        Payment p = new Payment();
        p.setUser(reserva.getPerro().getUser());
        p.setPaymentData(paymentData);
        p.setMpPaymentId(mpId);
        p.setStatus(status);
        return paymentRepository.save(p);
    }

    public Reserva getReserva(Long reservaId) {
        return reservaService.getReserva(reservaId);
    }
}
