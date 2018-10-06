let mySidebar = Vue.component('my-sidebar', {
    template: `
        <div class="dashboard-nav">
            <div class="dashboard-nav-inner">

                <ul data-submenu-title="Principal">
                    <li class=""><a href="/views/dashboard/dashboard.html"><i class="sl sl-icon-home"></i> Inicio </a></li>
                </ul>
                 

                <ul v-show="role === 'ROLE_USER' || role === 'ROLE_CUIDADOR'"  data-submenu-title="Cuenta">
                    <li><a href="/views/due%C3%B1o/perfil.html"><i class="sl sl-icon-user"></i> Mi Perfil</a></li>	
                    <li><a href="/views/perros/perros.html"><i class="im im-icon-Dog"></i> Mis Perros</a></li>
                    <li><a><i class="sl sl-icon-layers"></i> Mis Reservas</a>
					<ul>
						<li><a href="/views/reserva/mis-reservas-user.html?status=creada-dueño">Generadas </a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=aceptada-cuidador">Aceptadas </a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=rechazada-dueño">Canceladas </a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=pagada-dueño">Pagadas </a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=ejecucion">En ejecucion </a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=cerrada">Finalizadas </a></li>
					</ul>
					</li>
					                    <li><a><i class="sl sl-icon-star"></i> Calificaciones<!--span v-if="pendientesUser > 0" class="nav-tag green">{{pendientesUser}}</span>--></a>
					                    					                    
					                  <ul>
					    <li><a href="/views/reserva/mis-reservas-user.html?status=finalizada">Pendientes </a></li>
					    <li><a href="/views/reserva/comentarios-dueño.html"> Recibidas </a></li>
					                       </ul>	
					                    </li>
					                    
					  <li v-show="role === 'ROLE_CUIDADOR'""><a href="/views/estadisticas/estadistica.html"><i class="sl sl-icon-pie-chart"></i> Mis Estadisticas </a></li>
					  <li v-show="role === 'ROLE_USER'"><a href="/views/cuidadores/alta-cuidador.html"><i class="sl sl-icon-user"></i> Convertirse</a></li>
				
				</ul>  	
                <ul v-show="role === 'ROLE_CUIDADOR'" data-submenu-title="Cuidador">
                 
                     <li v-show="role === 'ROLE_CUIDADOR'"><a href="/views/cuidadores/cuidadores-editar.html"><i class="sl sl-icon-book-open"></i> Mi Descripcion</a></li>
                     <!-- <li v-show="role === 'ROLE_CUIDADOR'"><a href="/views/cuidadores/mi-calendario-cuidador.html"><i class="sl sl-icon-calender"></i> Mi Calendario</a></li>-->
                     <li v-show="role === 'ROLE_CUIDADOR'"><a><i class="sl sl-icon-layers"></i> Mis Reservas</a> 
					 <ul>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=creada-dueño">Nuevas </a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=aceptada-cuidador">Aceptadas </a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=rechazada-cuidador">Canceladas </a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=pagada-dueño">Pagadas </a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=ejecucion">En ejecucion</a></li>
			        	<li><a href="/views/reserva/mis-reservas-cuidador.html?status=cerrada">Finalizadas </a></li>
					 </ul>	
					 </li>
					                     <li v-show="role === 'ROLE_CUIDADOR'"><a><i class="sl sl-icon-star"></i> Calificaciones<!--<span v-if="pendientesCuidador > 0" class="nav-tag green">{{pendientesCuidador}}</span>--></a>
					                      <ul>
					    <li><a href="/views/reserva/mis-reservas-cuidador.html?status=finalizada">Pendientes </a></li>
					    <li><a href="/views/reserva/comentarios-cuidador.html"> Realizadas </a></li>
					                       </ul>	
					                     
					                     </li>
                </ul>
          
                <ul v-show="role === 'ROLE_ADMIN'" data-submenu-title="Admin" >
                    <li><a href="/views/admin/moderar-cuidador.html"><i class="sl sl-icon-user"></i> Moderar Solicitud</a></li>
                    <li><a href="/views/admin/estadisticas-admin.html"><i class="sl sl-icon-pie-chart"></i> Estadisticas</a></li>
                    <li><a href="/views/abm/raza.html"><i class="im im-icon-Dog"></i> Razas</a></li>
                    <li><a href="/views/abm/vacuna.html"><i class="im im-icon-Blood"></i> Vacunas</a></li>
                    <li><a href="/views/abm/servicio.html"><i class="im im-icon-Bone"></i> Servicios</a></li>
                </ul>

            </div>
        </div>
        <!-- Navigation / End -->
`
    , props: {
        role: {
            required: true,
            type: String,

        },
        pendientesCuidador: {
            required: false,
            type: Number,

        },
        pendientesUser: {
            required: false,
            type: Number,

        }
    },


});