Vue.component('moderar-cuidador', {
    template: `<div>
<div id="titlebar">
    <div class="row">
        <div class="col-md-12">
            <h2>Moderar Solicitudes de Cuidador</h2>
        </div>
    </div>
</div>
<div class="row">
<div class="col-lg-12 col-md-12">
    <div class="dashboard-list-box margin-top-0">
        <h4 class="gray"> 	<i class="fa fa-paw"></i> Solicitudes pendientes</h4>
        <ul>
        <div v-for="solicitud in solicitudes">
            <li>
                <div class="list-box-listing" style="margin: -2%">
                <div class="row">
         
                    <div class="list-box-listing-content">
                        <div class="inner">
                        <div class="col-xs-12">
                            <h3>{{solicitud.user.fullName}}</h3>
                            </div>
                            <div class="col-lg-2 col-md-6 col-xs-6"> 
                            <a :href= "solicitud.dniImagenes[0].url">
                        <img :src="solicitud.dniImagenes[0].url" alt="DNI" >
                        </a>
                    </div>
                    <div class="col-lg-2 col-md-6 col-xs-6">
                    <a :href= "solicitud.dniImagenes[1].url">
                        <img :src="solicitud.dniImagenes[1].url" alt="DNI" v-on:click='mostrar(solicitud.dniImagenes[1].url)'>
                    </a>
                    </div>
                            <div class="col-lg-2 col-md-6 col-xs-12">
                            <span>DNI: {{solicitud.dni}}</span>
                            <span>{{solicitud.user.direccion.direccionLinea1}}, {{solicitud.user.direccion.ciudad}}, {{solicitud.user.direccion.provincia}}</span>
                            </div>
                            <div class="col-lg-3 col-md-6 col-xs-12">
                            <span>{{solicitud.descripcion}}</span>
                           
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="buttons-to-right">
                    <a v-on:click='aceptarSolicitud(solicitud)' class="button gray "><i class="sl sl-icon-emotsmile"></i> Aceptar</a>
                    <a v-on:click='cancelarSolicitud(solicitud)' class="button gray "><i class="sl sl-icon-close"></i> Cancelar</a>
                </div>
                
            </li>
        </div>
        </ul>
    </div>
    </div>
</div>
</div>
    `,
    data: function () {
        return {
            url: "/api/user/",
            solicitudes:[],

        }

    },
    mounted() {
        this.getUserInfo();

    },
    methods: {
        getUserInfo() {
            axios.get(this.url + "me")
                .then((sessionInfo) => {
                    this.isUserAdmin(sessionInfo);
                })
                .catch(error => {
                    console.log(error);
                    document.location.href = "/";
                });
        },

        isUserAdmin(sessionInfo) {
            this.user = sessionInfo.data.principal.user;
            //console.log(this.user);
            if (this.user.role == 'ROLE_ADMIN') {
                this.recuperarSolicitudes();
            }else{
                //document.location.href = "/";
            }

        },
        recuperarSolicitudes() {
            var consulta = "/api/cuidadores/solicitudes/";
            axios.get(consulta)
                .then((data) => {
                    console.log(data);
                    this.solicitudes=data.data;
                })
                .catch(error => {
                    console.log(error);
                });

        },
        mostrar(foto) {

        },
        aceptarSolicitud(cuidador){
            var updateUrl="/api/cuidadores/";
            cuidador.estado="approved";
            cuidador.user.role="ROLE_CUIDADOR";
            console.log(cuidador);
            sweetAlert({
                    title: "Atención!",
                    text: "Está seguro de que desea aceptar al cuidador?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "Aprobar",
                    cancelButtonText: "Cancelar",
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                },
                function () {
                    axios.put(updateUrl+cuidador.id, cuidador)
                        .then((data) => {
                            sweetAlert({
                                    title: "Aprobado",
                                    text: "El cuidador ha sido aprobado.",
                                    type: "success",
                                },
                                function () {
                                    location.reload();

                                });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });


        },
        cancelarSolicitud(cuidador){
            var updateUrl="/api/cuidadores/";
            cuidador.estado="rejected";
            console.log(cuidador);
            sweetAlert({
                    title: "Atención!",
                    text: "Está seguro de que desea rechazar al cuidador?",
                    type: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#f91941",
                    confirmButtonText: "Rechazar",
                    cancelButtonText: "Cancelar",
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                },
                function () {
                    axios.put(updateUrl+cuidador.id, cuidador)
                        .then((data) => {
                            sweetAlert({
                                    title: "Rechazado",
                                    text: "El cuidador ha sido rechazado.",
                                    type: "success",
                                },
                                function () {
                                location.reload();

                                });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });

        },

    }
});