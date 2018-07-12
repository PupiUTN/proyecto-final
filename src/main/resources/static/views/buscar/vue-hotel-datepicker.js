//https://github.com/benitolopez/hotel-datepicker
var myHotelDatePicker = Vue.component('my-hotel-date-picker', {
    template: `
        <input class="datepicker__input" type="text" :id="datePickerId" :placeholder="placeholder" autocomplete="off"/>
    `,
    props: {
        datePickerId: {
            type: String,
            default: 'datepickerId-' + new Date().getTime().toString() // simulate random
        },
        placeholder: {
            type: String,
            default: 'Desde - Hasta'
        },
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        infoFormat: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        separator: {
            type: String,
            default: ' - '
        },
        startOfWeek: {
            type: String,
            default: 'monday'
        },
        startDate: {
            type: [Date, String],
            default: function () {
                return new Date()
            }
        },
        endDate: {
            type: [Date, String, Boolean],
            default: function () {
                var today = new Date();
                var fiveMonths= today.setMonth(today.getMonth()+5);
                return fiveMonths;
            }
        },
        minNights: {
            type: Number,
            default: 1
        },
        maxNights: {
            type: Number,
            default: 0
        },
        selectForward: {
            type: Boolean,
            default: false
        },
        disabledDates: {
            type: Array,
            default: function () {
                return []
            }
        },
        enableCheckout: {
            type: Boolean,
            default: false
        },
        container: {
            type: String,
            default: ''
        },
        animationSpeed: {
            type: String,
            default: '.5s'
        },
        hoveringTooltip: {
            type: [Boolean, Function],
            default: true
        },
        showTopbar: {
            type: Boolean,
            default: true
        },
        autoClose: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            inputValue: '',
            hdpkr: {}
        }
    },
    computed: {},
    watch: {
        'hdpkr.isOpen': {
            handler(newVal, oldVal) {
                if (!this.hdpkr.isOpen && this.hdpkr.changed) {
                    const date = document.querySelector(`#${this.datePickerId}`).value
                    this.$emit('updateDateRange', date, this.datePickerId)
                } else if (!this.hdpkr.isOpen && !this.hdpkr.changed) {
                    this.$emit('cancelUpdateDateRange', this.datePickerId)
                }
            }
        }
    },
    methods: {
        getValue() {
            return this.hdpkr.getValue()
        },
        setValue(val) {
            this.hdpkr.setValue(val)
        },
        toggle() {
            if (this.hdpkr.isOpen) {
                this.close()
            } else {
                this.open()
            }
        },
        open: function () {
            setTimeout(() => {
                this.hdpkr.open()
            }, 0)
        },
        close() {
            setTimeout(() => {
                this.hdpkr.close()
            }, 0)
        },
        clear() {
            // Clears the datepicker value.
            setTimeout(() => {
                this.hdpkr.clear()
            }, 100)
        },
        setRange(d1, d2) {
            // Sets the date range value.
            this.hdpkr.setRange(d1, d2)
        },
        getDatePicker() {
            // Gets the datepicker DOM element.
            return this.hdpkr.getDatePicker()
        },
        getNights() {
            // Gets the number of nights selected. Returns 0 otherwise.
            return this.hdpkr.getNights()
        },
        updateDateRange(e) {
            const newDate = document.querySelector(`#${this.datePickerId}`).value
            // console.log('HotelDatepicker updateDateRange', newDate, e)
            this.$emit('updateDateRange', newDate, this.datePickerId)
        }
    },
    mounted: function () {
        // const containerElement = document.querySelector(this.container)
        // console.log('containerElement', containerElement)
        const hdpkrId = document.querySelector(`#${this.datePickerId}`)
        const hdpkrOptions = {
            datePickerId: this.datePickerId,
            format: this.format,
            infoFormat: this.infoFormat,
            separator: this.separator,
            startOfWeek: this.startOfWeek,
            startDate: this.startDate,
            endDate: this.endDate,
            minNights: this.minNights,
            maxNights: this.maxNights,
            selectForward: this.selectForward,
            disabledDates: this.disabledDates,
            enableCheckout: this.enableCheckout,
            container: this.container,
            animationSpeed: this.animationSpeed,
            hoveringTooltip: this.hoveringTooltip,
            showTopbar: this.showTopbar,
            autoClose: this.autoClose,
            i18n: this.i18n
        }
        this.hdpkr = new HotelDatepicker(hdpkrId, hdpkrOptions)
        // console.log(this.hdpkr)
        if (!this.showTopbar) {
            // showTopbar is not implement from hotel datepicker now...
            const hdpkrTopbar = document.querySelector('.datepicker__topbar')
            hdpkrTopbar.style.display = 'none'
        }
    }
});
