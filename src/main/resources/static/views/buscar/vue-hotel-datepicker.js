var myHotelDatePicker = Vue.component('my-hotel-date-picker', {
    template: `
        <input id="hdpkr" type="text" readonly>
    `,
    data:
        function () {
            return {
                hdpkr: null
            }
        },
    mounted() {
        this.hdpkr = new HotelDatepicker(document.getElementById('hdpkr'));
    },
    methods: {
        getValue() {
            return this.hdpkr.getValue();
        }
    }
});
