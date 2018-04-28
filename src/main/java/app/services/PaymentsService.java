package app.services;

import app.models.entities.Cuidador;
import app.models.entities.Payment;
import app.models.entities.Reserva;
import app.models.entities.User;
import app.persistence.PaymentRepository;
import app.utils.PaymentsUtils;
import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.datastructures.preference.Payer;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentsService {

    @Value("${app.mp.pupi.clientId}")
    private String clientId;

    @Value("${app.mp.pupi.clientSecret}")
    private String clientSecret;

    private PaymentRepository paymentRepository;

    private ReservaService reservaService;


    private static final Logger logger = LogManager.getLogger(PaymentsService.class);

    @Autowired
    public PaymentsService(PaymentRepository paymentRepository, ReservaService reservaService) {
        this.paymentRepository = paymentRepository;
        this.reservaService = reservaService;
        configureSDK();
    }

    private void configureSDK() {
        try {
            MercadoPago.SDK.setClientId(clientId);
            MercadoPago.SDK.setClientSecret(clientSecret);
        } catch (MPException e) {
            e.printStackTrace();
        }
    }

    public Preference createPreference(Reserva reserva) {
        Preference preference = new Preference();
        Item item = PaymentsUtils.fillItem(reserva.getPrecioTotal(), reserva.getCuidador()
                .getUser()
                .getFullName());

        Payer payer = PaymentsUtils.fillPayer(reserva.getPerro()
                .getUser());

        preference.setPayer(payer);
        preference.appendItem(item);
        preference.setNotificationUrl("http://pupi.com.ar/api/payments/notifications");
        preference.setExternalReference(reserva.getId()
                .toString());

        try {
            preference.save();
        } catch (MPException e) {
            e.printStackTrace();
        }

        return preference;
    }

    public JSONObject getPaymentInfo(String id, String topic) {
        try {
            JSONObject merchantOrderInfo = null;
            JSONObject paymentInfo = null;
            if (topic.equalsIgnoreCase("payment")) {
                paymentInfo = mp.get("/collections/notifications/" + id);
                logger.info("TOPIC -> PAYMENT");
                logger.info("paymentInfo - " + paymentInfo.toString());
                Long merchantOrderId = paymentInfo.getJSONObject("response")
                        .getJSONObject("collection")
                        .optLong("merchant_order_id");
                merchantOrderInfo = mp.get("/merchant_orders/" + merchantOrderId);
                logger.info("merchantOrderInfo - " + merchantOrderInfo.toString());
            } else if (topic.equalsIgnoreCase("merchant_order")) {
                merchantOrderInfo = mp.get("/merchant_orders/" + id);
                logger.info("TOPIC -> MERCHANT_ORDER");
                logger.info("merchantOrderInfo - " + merchantOrderInfo.toString());
            }
            if (merchantOrderInfo != null && merchantOrderInfo.getInt("status") == 200) {
                String externalReference = merchantOrderInfo.getJSONObject("response")
                        .getString("external_reference");
                Reserva booking = getReserva(Long.parseLong(externalReference));
                logger.info("EXTERNAL REFERENCE -> " + externalReference);
                Float paidAmount = 0f;
                JSONArray payments = merchantOrderInfo.getJSONObject("response")
                        .getJSONArray("payments");
                if (payments.length() > 0) {
                    for (int i = 0; i < payments.length(); i++) {
                        JSONObject payment = payments.getJSONObject(i);
                        if ("approved".equalsIgnoreCase(payment.getString("status"))) {
                            paidAmount += Float.parseFloat(payment.get("transaction_amount")
                                    .toString());
                        }
                        createPayment(booking, Long.valueOf(id), payment.getString("status"), payment.toString());
                    }
                    Float bookingAmount = Float.parseFloat(merchantOrderInfo.getJSONObject("response")
                            .get("total_amount")
                            .toString());

                    if (paidAmount >= bookingAmount) {
                        logger.info("RESERVA PAGADA - " + booking.toString());
                        reservaService.setEstadoPagada(booking);
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            logger.error("Error when trying to get payment info " + e.toString() + "\n");
            e.printStackTrace();
        }
        return null;
    }

    public Payment createPayment(Reserva reserva, Long mpId, String status, String paymentData) {
        Payment p = new Payment();
        p.setUser(reserva.getPerro()
                .getUser());
        p.setPaymentData("DATOS PAGO");
        p.setMpPaymentId(mpId);
        p.setStatus(status);
        return paymentRepository.save(p);
    }

    public Reserva getReserva(Long reservaId) {
        return reservaService.getReserva(reservaId);
    }
}
