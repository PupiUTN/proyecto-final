Vue.component('mercadopago', {
    template: `
    <a v-on:click="createPayment" class="button medium border pull-right" target="_blank">Pagar <i class="im im-icon-Money-2"></i></a>
    `,
    data:
        function () {
            return {
                url: "/api/payments/",
                paymentPreference: {},
                sandboxInitPoint: "",
                initPoint: "",
                showModal: false
            }
        },
    props: {
        reserva: {
            type: Object
        },
    },
    mounted() {
    },
    methods: {
        createPayment() {
            console.log("CREATE PAYMENT");
            console.log(this.url);
            console.log(this.reserva);
            axios.post(this.url, this.reserva)
                .then((paymentPreference) => {
                    this.paymentPreference = paymentPreference.data;
                    this.initPoint = this.paymentPreference.init_point;
                    this.sandboxInitPoint = this.paymentPreference.sandbox_init_point;
                    this.pay(this.initPoint);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        pay(url) {
            console.log("PAY");
            console.log(url);
            window.location.href = url;
        }
    }
})