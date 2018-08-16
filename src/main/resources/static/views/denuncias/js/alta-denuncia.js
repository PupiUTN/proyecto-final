Vue.component('alta-denuncia', {
    // language=HTML
    template: `
<div>
 <div id="titlebar">
    <div class="row">
        <div class="col-md-12">
            <h2>Nueva Denuncia</h2>
        </div>
    </div>
</div>
    <div class="row">
    <div class="col-md-12" >
        <div class="notification warning" v-show="isReadOnly">
            <p><span> Atencion!</span> Su solicitud esta en proceso.</p>
        </div>
        <div class="dashboard-list-box margin-top-0">
            <h4 class="gray"> 	<i class="fa fa-paw"></i> Antes de crear una denuncia, asegurate de revisar estos puntos </h4>
            <div class="dashboard-list-box-static"  > 
            <ul>
                <li><i class="fa fa-paw"></i>
                Estás por hacer una denuncia sobre una reserva. Una vez creada, no hay posibilidad de cancelarla. Solo se puede hacer una denuncia sobre una reserva.
                </li>
                <li><i class="fa fa-paw"></i>
                Un encargado de PUPI la recibirá y analizará la situación. Es posible que se contacte con ambas partes para entender
                mejor lo ocurrido y dictaminar una resolución.
                </li>
                <li><i class="fa fa-paw"></i>
                El encargado puede fallar a favor de una parte o descartar la misma. En ambos casos, se informarán los motivos a través de un e-mail.
                </li>
                <li><i class="fa fa-paw"></i>
                Recuerda que PUPI busca fomentar el cuidado de perros entre sus usuarios. Pretendemos mantener una comunidad responsable y amante de los perros.
                Evita hacer denuncias falsas ya que podrías verte afectado por la misma.
                </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
    <form id="altaCuidadorForm" v-on:submit.prevent='enviarAltaDenuncia()' enctype="multipart/form-data">
    <div class="row">
    <div class="col-md-12 margin-top-20 margin-bottom-20 " style="height:80%">
        <div class="dashboard-list-box margin-top-0">
            <h4 class="gray"> 	<i class="fa fa-paw"></i> Motivo </h4>
        </div>
            <div class="dashboard-list-box-static" style="height:100%" >   
                <label class="margin-top-0 margin-bottom-10">Por favor, realiza una descripción lo más clara y simple posible de lo ocurrido.</label>
                <label class="margin-top-8 col-md-3" style="padding-left: 0px;">¿Con qué tuviste problemas?</label>
                <select v-model="denuncia.tipoDenuncia" required class="col-md-9">
                    <option v-for="tipoDenuncia in tiposDenuncia" :value="tipoDenuncia.id">
                        {{ tipoDenuncia.nombre }}
                    </option>
                </select>
                 <textarea v-model="denuncia.descripcion" rows="6" cols="50" maxlength="150"  placeholder="Descripcion"
                    style="height: " required>
                 </textarea>
            </div>
    </div>
    </div> 
    <div class="row">
    <div class="col-s-3" style="margin-left: 2%;">
    <input type="submit" value="Denunciar" name="denunciar()" style=" height: 60px; width: 150px; position: relative; " class="button margin-top-10"/>
    </div>
    </div>
</form>
              
</div>
    `,
    data: function () {
        return {
            isReadOnly: false,
            userUrl: "/api/user/",
            denunciaUrl : "/api/denuncias/",
            tiposDenuncia: [],
            denuncia: {
                estado: "pending",
            },
            user: {},

        }

    },
    mounted() {
        this.getTiposDenuncia();

    },
    methods: {
        getTiposDenuncia() {
            axios.get(this.denunciaUrl + "/tipo-denuncia")
                .then((response) => {
                    this.tiposDenuncia = response.data;
                })

        },
        //obitene los parametros de la url... copiado de internet
        getParameterByName(name) {
            var url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        denunciar() {
            this.denuncia.reserva = {
                id: window.location.pathname
            }
                axios.post(this.denunciaUrl, this.denuncia)
                    .then((response) => {
                        console.log(response);
                        swal({
                                title: "Denuciada",
                                text: "Se generó la denuncia exitosamente.",
                                type: "success"
                            },
                            function () {
                                window.location.href = "/views/dashboard/dashboard.html";
                            });
                    })
                    .catch(error => {
                            console.log(error);
                            sweetAlert("Oops...", "Error, ver consola lalalal", "error");
                        }
                    );
        },
    }
});

