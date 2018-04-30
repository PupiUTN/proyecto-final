package app.models.mercadopago;


import com.mercadopago.core.MPBase;
import com.mercadopago.core.annotations.rest.GET;
import com.mercadopago.core.annotations.rest.POST;
import com.mercadopago.core.annotations.rest.PUT;
import com.mercadopago.core.annotations.validation.NotNull;
import com.mercadopago.core.annotations.validation.Size;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.DifferentialPricing;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.datastructures.preference.Payer;
import com.mercadopago.resources.datastructures.preference.PaymentMethods;
import com.mercadopago.resources.datastructures.preference.Shipments;
import java.util.ArrayList;
import java.util.Date;

public class Preference extends MPBase {

    @NotNull
    private ArrayList<Item> items = null;
    @NotNull
    private Payer payer = null;
    private PaymentMethods paymentMethods = null;
    private Shipments shipments = null;
    private BackUrls backUrls = null;
    @Size(
            max = 500
    )
    private String notificationUrl = null;
    private String id = null;
    private String initPoint = null;
    private String sandboxInitPoint = null;
    private Date dateCreated = null;
    private Preference.OperationType operationType = null;
    @Size(
            max = 600
    )
    private String additionalInfo = null;
    private Preference.AutoReturn autoReturn = null;
    @Size(
            max = 256
    )
    private String externalReference = null;
    private Boolean expires = null;
    private Integer collectorId = null;
    private Long clientId = null;
    @Size(
            max = 256
    )
    private String marketplace = null;
    private Float marketplaceFee = null;
    private DifferentialPricing differentialPricing = null;

    public Preference() {
    }

    public ArrayList<Item> getItems() {
        return this.items;
    }

    public Preference setItems(ArrayList<Item> items) {
        this.items = items;
        return this;
    }

    public Preference appendItem(Item item) {
        if (this.items == null) {
            this.items = new ArrayList();
        }

        this.items.add(item);
        return this;
    }

    public Payer getPayer() {
        return this.payer;
    }

    public Preference setPayer(Payer payer) {
        this.payer = payer;
        return this;
    }

    public PaymentMethods getPaymentMethods() {
        return this.paymentMethods;
    }

    public Preference setPaymentMethods(PaymentMethods paymentMethods) {
        this.paymentMethods = paymentMethods;
        return this;
    }

    public Shipments getShipments() {
        return this.shipments;
    }

    public Preference setShipments(Shipments shipments) {
        this.shipments = shipments;
        return this;
    }

    public BackUrls getBackUrls() {
        return this.backUrls;
    }

    public Preference setBackUrls(BackUrls backUrls) {
        this.backUrls = backUrls;
        return this;
    }

    public String getNotificationUrl() {
        return this.notificationUrl;
    }

    public Preference setNotificationUrl(String notificationUrl) {
        this.notificationUrl = notificationUrl;
        return this;
    }

    public String getId() {
        return this.id;
    }

    public String getInitPoint() {
        return this.initPoint;
    }

    public String getSandboxInitPoint() {
        return this.sandboxInitPoint;
    }

    public Date getDateCreated() {
        return this.dateCreated;
    }

    public Preference.OperationType getOperationType() {
        return this.operationType;
    }

    public String getAdditionalInfo() {
        return this.additionalInfo;
    }

    public Preference setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
        return this;
    }

    public Preference.AutoReturn getAutoReturn() {
        return this.autoReturn;
    }

    public Preference setAutoReturn(Preference.AutoReturn autoReturn) {
        this.autoReturn = autoReturn;
        return this;
    }

    public String getExternalReference() {
        return this.externalReference;
    }

    public Preference setExternalReference(String externalReference) {
        this.externalReference = externalReference;
        return this;
    }

    public Boolean getExpires() {
        return this.expires;
    }

    public Preference setExpires(Boolean expires) {
        this.expires = expires;
        return this;
    }

    public Integer getCollectorId() {
        return this.collectorId;
    }

    public Long getClientId() {
        return this.clientId;
    }

    public String getMarketplace() {
        return this.marketplace;
    }

    public Preference setMarketplace(String marketplace) {
        this.marketplace = marketplace;
        return this;
    }

    public Float getMarketplaceFee() {
        return this.marketplaceFee;
    }

    public Preference setMarketplaceFee(Float marketplaceFee) {
        this.marketplaceFee = marketplaceFee;
        return this;
    }

    public DifferentialPricing getDifferentialPricing() {
        return this.differentialPricing;
    }

    public Preference setDifferentialPricing(DifferentialPricing differentialPricing) {
        this.differentialPricing = differentialPricing;
        return this;
    }

    public static Preference findById(String id) throws MPException {
        return findById(id, WITHOUT_CACHE);
    }

    @GET(
            path = "/checkout/preferences/:id"
    )
    public static Preference findById(String id, Boolean useCache) throws MPException {
        return (Preference)processMethod(Preference.class, "findById", id, useCache);
    }

    @POST(
            path = "/checkout/preferences"
    )
    public Preference save() throws MPException {
        return (Preference)super.processMethod("save", WITHOUT_CACHE);
    }

    @PUT(
            path = "/checkout/preferences/:id"
    )
    public Preference update() throws MPException {
        return (Preference)super.processMethod("update", WITHOUT_CACHE);
    }

    public static enum AutoReturn {
        approved,
        all;

        private AutoReturn() {
        }
    }

    public static enum OperationType {
        regular_payment,
        money_transfer;

        private OperationType() {
        }
    }
}

