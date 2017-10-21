Vue.component('mercadopago', {
    template: `
    <a href="{{sandboxInitPoint}}">Pagar</a>
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
            axios.get(url)
                .then((paymentPreference) => {
                this.paymentPreference = paymentPreference;
                this.sandboxInitPoint = paymentPreference.sandboxInitPoint;
                })
                .catch(error => {
                    console.log(error);
                    sweetAlert("Oops...", "Error, ver consola", "error");
                });
        }
    }
})