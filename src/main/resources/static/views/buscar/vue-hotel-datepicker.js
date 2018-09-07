// https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

//https://github.com/benitolopez/hotel-datepicker
var myHotelDatePicker = Vue.component('my-hotel-date-picker', {
    template: `
<div>
    <input v-if="showDatePicker" class="datepicker__input" type="text" :id="datePickerId" :placeholder="placeholder" autocomplete="off"/>
    <p  v-if="!showDatePicker" > Calculando Fechas Disponibles</p>
</div>

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
                today.setMonth(today.getMonth() + 3);
                return today;
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
        },
        removeLeft: {
            type: Boolean,
            default: false
        },
        idCuidador: {
            type: Number
        },
        cantidadMaxDePerros: {
            type: Number
        },
    },
    data() {
        return {
            inputValue: '',
            hdpkr: {},
            showDatePicker: true,
            disabledDates: []
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
        },
        getReservasPagadasYEjecucion(idCuidador) {
            console.log('Calculando fechas deshabilitadas')
            // obtengo las reservas
            // PAGADAS DUEÑO y ejecucion
            axios.get("/api/reservas/fromToday/?idCuidador=" + idCuidador + "&status=pagada-due%C3%B1o&status=ejecucion&status=aceptada-cuidador")
                .then((response) => {
                    let fechasList = this.calcularListadoDeFechas(response.data);
                    this.disabledDates = this.calcularFechasDeshabilitadas(fechasList);
                    // como las properties del componente no son reactivas debo montar el date picker luego de calcular las fecha
                    this.mount()
                })
                .catch(error => {
                    this.mount()
                    console.log(error);
                    sweetAlert("Oops...", "Error getReservasPagadasYEjecucion ", "error");
                });

        },
        getReservasPagadasYEjecucion() {
            // obtengo las reservas
            // PAGADAS DUEÑO y ejecucion
            axios.get("/api/reservas/fromToday/?idCuidador=" + this.idCuidador + "&status=pagada-due%C3%B1o&status=ejecucion&status=aceptada-cuidador")
                .then((response) => {
                    let fechasList = this.calcularListadoDeFechas(response.data);
                    this.disabledDates = this.calcularFechasDeshabilitadas(fechasList);
                    // como las properties del componente no son reactivas debo montar el date picker luego de calcular las fecha
                    this.mount()
                })
                .catch(error => {
                    this.mount()
                    console.log(error);
                    sweetAlert("Oops...", "Error  getReservasPagadasYEjecucion", "error");
                });

        },
        calcularFechasDeshabilitadas(fechasList) {
            // debemos deshabilitar aquellas fechas que en el mismo dia tiene mayor o igual cantidad de reservas
            // que la maxima admitida por el cuidador
            let cantidadReservasPorDia = new Map()
            for (let i = 0; i < fechasList.length; i++) {
                let fecha = fechasList[i];
                let frecuencia = cantidadReservasPorDia.get(fecha);
                if (frecuencia === undefined) {
                    cantidadReservasPorDia.set(fecha, 1);
                } else {
                    cantidadReservasPorDia.set(fecha, frecuencia + 1);
                }
            }
            let fechasSuperanCantidadMaximaDePerro = [];
            console.log('calcularFechasDeshabilitadas, cantidad maxima de perros', this.cantidadMaxDePerros, cantidadReservasPorDia);
            for (var [key, value] of cantidadReservasPorDia.entries()) {
                if (value >= this.cantidadMaxDePerros) {
                    // An array of strings in this format: 'YYYY-MM-DD' (note the ''). All the dates passed to the list will be disabled.
                    var disableDate = fecha.parse(key, 'DD/MM/YYYY');
                    fechasSuperanCantidadMaximaDePerro.push(fecha.format(disableDate, 'YYYY-MM-DD'))
                }
            }
            return fechasSuperanCantidadMaximaDePerro;
        },
        calcularListadoDeFechas(reservasPagadasYEjecucion) {
            // creo una lista con todas las fechas de todas las reservas
            let datesList = [];
            for (var i = 0; i < reservasPagadasYEjecucion.length; i++) {
                // Do stuff with arr[i] or i
                let reserva = reservasPagadasYEjecucion[i];
                let dates = this.getDatesBetween(reserva.fechaInicio, reserva.fechaFin)
                datesList.push(...dates)
            }
            return datesList;
        },
        getDatesBetween(startDate, stopDate) {
            var dateArray = new Array();
            var currentDate = fecha.parse(startDate, 'DD/MM/YYYY');
            var stopDate = fecha.parse(stopDate, 'DD/MM/YYYY');
            while (currentDate <= stopDate) {
                dateArray.push(fecha.format(currentDate, 'DD/MM/YYYY'));
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        },
        mount() {
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
            if (this.removeLeft) {
                // showTopbar is not implement from hotel datepicker now...
                const hdpkrTopbar = document.querySelector('.datepicker')
                hdpkrTopbar.style.left = 0
            }

        }
    },
    mounted: function () {
        if (this.idCuidador && this.cantidadMaxDePerros) {
            this.getReservasPagadasYEjecucion(this.idCuidador)
        } else {
            this.mount()
        }
    }
});
