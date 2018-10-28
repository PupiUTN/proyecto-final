package app.services;

import app.models.entities.Reserva;
import app.models.entities.User;
import app.models.mercadopago.Preference;
import app.persistence.PaymentRepository;
import app.security.Encryptor;
import app.utils.PaymentsUtils;
import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.MerchantOrder;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.datastructures.merchantorder.MerchantOrderPayment;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.datastructures.preference.Payer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.crypto.Cipher;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class PaymentsService {

    private final PaymentRepository paymentRepository;
    private final ReservaService reservaService;
    private final Encryptor encryptor;
    @Value("${app.mp.pupi.clientId}")
    private String clientId;
    @Value("${app.mp.pupi.clientSecret}")
    private String clientSecret;

    @Value("${app.environment}")
    private String ENVIRONMENT;

    private String APP_DOMAIN;


    private static final Logger LOG = LoggerFactory.getLogger(PaymentsService.class);

    @Autowired
    public PaymentsService(PaymentRepository paymentRepository, ReservaService reservaService, Encryptor encryptor) {
        this.paymentRepository = paymentRepository;
        this.reservaService = reservaService;
        this.encryptor = encryptor;
    }

    @PostConstruct
    private void configureSDK() {
        try {
            MercadoPago.SDK.setClientId(clientId);
            MercadoPago.SDK.setClientSecret(clientSecret);
        } catch (MPException e) {
            e.printStackTrace();
        }
    }

    @PostConstruct
    private void setRedirectUri() {
        if ("prod".equalsIgnoreCase(ENVIRONMENT)) {
            APP_DOMAIN = "https://pupi.com.ar";
        } else {
            APP_DOMAIN = "http://localhost:5000";
        }
    }

    public Preference createPreference(Reserva reserva) {

        Preference preference = new Preference();

        User user = reserva.getCuidador()
                .getUser();

        Item item = PaymentsUtils.fillItem(reserva.getPrecioTotal(), user.getFullName(), reserva.getId()
                .toString());

        Payer payer = PaymentsUtils.fillPayer(reserva.getPerro()
                .getUser());

        preference.setPayer(payer);
        preference.appendItem(item);
        preference.setNotificationUrl("https://pupi.com.ar/api/payments/notifications");
        preference.setExternalReference(reserva.getId()
                .toString());

        //Acá seteamos el token del vendedor
        Optional<String> mpToken = Optional.ofNullable(user.getMpToken());

        mpToken.ifPresent(token -> MercadoPago.SDK.setUserToken(getMercadoPagoToken(token)));

        preference.setMarketplaceFee(getMarketplaceFee(reserva.getPrecioTotal()));
        String backUrl = null;
        try {
            backUrl = new URI(APP_DOMAIN + "/views/reserva/mis-reservas-user.html?status=pagada-dueño").toASCIIString();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        if (backUrl != null) {
            BackUrls backUrls = new BackUrls().setSuccess(backUrl);
            preference.setBackUrls(backUrls);
        }
        try {
            preference.save();
        } catch (MPException e) {
            e.printStackTrace();
        }

        return preference;
    }

    public void getPaymentInfo(String id, String topic) {
        try {

            LOG.info("Message received [message_id:{}] [topic:{}]", id, topic);

            if (MercadoPago.SDK.getAccessToken() == null) {
                configureSDK();
            }

            MerchantOrder merchantOrder = topic.equalsIgnoreCase("payment") ? MerchantOrder.findById(Payment.findById(id)
                    .getOrder()
                    .getId()
                    .toString()) : MerchantOrder.findById(id);

            if (merchantOrder != null && merchantOrder.getLastApiResponse()
                    .getStatusCode() == 200) {
                Reserva booking = getReserva(Long.parseLong(merchantOrder.getExternalReference()));

                if (checkRefund(merchantOrder.getPayments())) {
                    reservaService.setEstadoRefunded(booking);

                } else if (calculatePaidAmountAndLog(merchantOrder.getPayments(), booking, id) >= merchantOrder.getTotalAmount()) {
                    reservaService.setEstadoPagada(booking);
                }
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            LOG.error("Error when trying to get payment info [error:{}] [message:{}]", e.toString(), e.getMessage());
            e.printStackTrace();
        }
    }

    private float calculatePaidAmountAndLog(ArrayList<MerchantOrderPayment> payments, Reserva booking, String id) {
        if (payments.isEmpty()) return 0f;
        return (float) payments.stream()
                .filter(pay -> "approved".equalsIgnoreCase(pay.getStatus()))
                .peek(pay -> createPayment(booking, Long.valueOf(id), pay.getStatus()))
                .mapToDouble(MerchantOrderPayment::getTransactionAmount)
                .sum();
    }

    private boolean checkRefund(ArrayList<MerchantOrderPayment> payments) {
        return payments.stream()
                .anyMatch(pay -> "refunded".equalsIgnoreCase(pay.getStatus()));
    }

    public void createPayment(Reserva reserva, Long mpId, String status) {
        app.models.entities.Payment p = new app.models.entities.Payment();
        p.setUser(reserva.getPerro()
                .getUser());
        p.setPaymentData("DATOS PAGO");
        p.setMpPaymentId(mpId);
        p.setStatus(status);
        paymentRepository.save(p);
    }

    private Reserva getReserva(Long reservaId) {
        return reservaService.getReserva(reservaId);
    }

    private String getMercadoPagoToken(String mpToken) {
        return encryptor.run(mpToken, Cipher.DECRYPT_MODE)
                .replace("\"", "");
    }

    private float getMarketplaceFee(float totalAmount) {
        return totalAmount * 0.2f;
    }
}
