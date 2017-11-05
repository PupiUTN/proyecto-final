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
                initPoint: ""
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
            axios.post(this.url, this.reserva)
                .then((paymentPreference) => {
                    this.paymentPreference = paymentPreference.data.response;
                    this.sandboxInitPoint = this.paymentPreference.sandbox_init_point;
                    this.openInNewTab(this.sandboxInitPoint);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        executeOnMyReturn(response) {
            console.log(response);
        },
        openInNewTab(url) {
            var checkout = window.open(url, '_blank');
            checkout.focus();
        }
    }
})