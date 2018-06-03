package app.services;

import app.models.entities.Reserva;
import app.models.mercadopago.Preference;
import app.persistence.PaymentRepository;
import app.utils.PaymentsUtils;
import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.MerchantOrder;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.datastructures.merchantorder.MerchantOrderPayment;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.datastructures.preference.Payer;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

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

    public Preference createPreference(Reserva reserva) {

        Preference preference = new Preference();

        Item item = PaymentsUtils.fillItem(reserva.getPrecioTotal(), reserva.getCuidador()
                .getUser()
                .getFullName(), reserva.getId()
                .toString());

        Payer payer = PaymentsUtils.fillPayer(reserva.getPerro()
                .getUser());

        preference.setPayer(payer);
        preference.appendItem(item);
        preference.setNotificationUrl("http://pupi.com.ar/api/payments/notifications");
        preference.setExternalReference(reserva.getId()
                .toString());

        //Acá seteamos el token del vendedor
        //MercadoPago.SDK.setUserToken("tokenId");
        try {
            preference.save();
        } catch (MPException e) {
            e.printStackTrace();
        }

        return preference;
    }

    public void getPaymentInfo(String id, String topic) {
        try {

            MerchantOrder merchantOrder = topic.equalsIgnoreCase("payment") ? MerchantOrder.findById(Payment.findById(id)
                    .getOrder()
                    .getId()
                    .toString()) : MerchantOrder.findById(id);

            if (merchantOrder != null && merchantOrder.getLastApiResponse()
                    .getStatusCode() == 200) {
                Reserva booking = getReserva(Long.parseLong(merchantOrder.getExternalReference()));
                if (calculatePaidAmountAndLog(merchantOrder.getPayments(), booking, id) >= merchantOrder.getTotalAmount()) {
                    reservaService.setEstadoPagada(booking);
                }
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            logger.error("Error when trying to get payment info " + e.toString() + "\n");
            e.printStackTrace();
        }
    }

    private float calculatePaidAmountAndLog(ArrayList<MerchantOrderPayment> payments, Reserva booking, String id) {
        if (payments.isEmpty()) return 0f;
        return (float) payments.stream()
                .filter(pay -> "approved".equalsIgnoreCase(pay.getStatus()))
                .peek(pay -> createPayment(booking, Long.valueOf(id), pay.getStatus()))
                .mapToDouble(pay -> pay.getTransactionAmount())
                .sum();
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

    public Reserva getReserva(Long reservaId) {
        return reservaService.getReserva(reservaId);
    }
}
