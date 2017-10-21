Vue.component('mercadopago', {
    template: `
    <a v-bind:href="sandboxInitPoint" name="MP-Checkout" class="red-M-Rn-Ar-ArOn" mp-mode="popup" onreturn="executeOnMyReturn">Pagar</a>
    `,
    data:
        function() {
            return {
                url: "/api/payments/",
                paymentPreference: {},
                sandboxInitPoint: "",
                initPoint: ""
            }
        },
    mounted() {
        this.getPaymentPreference();
    },
    methods: {
        getPaymentPreference() {
            console.log("ENTRO AL PREFERENCE");
            axios.get(this.url)
                .then((paymentPreference) => {
                console.log(paymentPreference);
                this.paymentPreference = paymentPreference.data.response;
                this.sandboxInitPoint = this.paymentPreference.sandbox_init_point;
                console.log(this.sandboxInitPoint);
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        },
        executeOnMyReturn(response) {
            console.log(response);
        }
    }
})