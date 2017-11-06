let mySidebar = Vue.component('my-sidebar', {
    template: `
        <div class="dashboard-nav">
            <div class="dashboard-nav-inner">

                <ul data-submenu-title="Principal">
                    <li class="active"><a href="/views/dashboard/dashboard.html"><i class="sl sl-icon-settings"></i> Panel</a></li>
                </ul>

                <ul v-show="role === 'ROLE_USER' || role === 'ROLE_CUIDADOR'"  data-submenu-title="Cuenta">
                    <li><a href="/views/due%C3%B1o/perfil.html"><i class="sl sl-icon-user"></i> Mi Perfil</a></li>	
                    <li><a href="/views/perros/perros.html"><i class="im im-icon-Dog"></i> Mis Perros</a></li>
                    <li><a><i class="sl sl-icon-layers"></i> Mis Reservas</a>
					<ul>
						<li><a href="/views/reserva/mis-reservas-user.html?status=CONFIRMATION_PENDING">Pendientes <span class="nav-tag green"></span></a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=ACCEPTED">Aceptadas <span class="nav-tag yellow"></span></a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=CANCEL_BY_USER">Canceladas <span class="nav-tag red"></span></a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=PAID">Pagadas <span class="nav-tag blue"></span></a></li>
					</ul>
					</li>
				</ul>
                	<ul v-show="role === 'ROLE_USER' || role === 'ROLE_CUIDADOR'"  data-submenu-title="Calificaciones" >
                    <li><a href="/views/reserva/mis-reservas-user.html?status=finalizada"><i class="sl sl-icon-layers"></i> Calificaciones</a></li>
				
                </ul>
                <ul  data-submenu-title="Cuidador">
                    <li v-show="role === 'ROLE_USER'"><a href="/views/cuidadores/alta-cuidador.html"><i class="sl sl-icon-user"></i> Convertirse</a></li>
                     <li v-show="role === 'ROLE_CUIDADOR'"><a href="/views/cuidadores/cuidadores-editar.html"><i class="sl sl-icon-book-open"></i> Mi Descripcion</a></li>
                     <li v-show="role === 'ROLE_CUIDADOR'"><a><i class="sl sl-icon-layers"></i> Mis Reservas</a>
					 <ul>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=CONFIRMATION_PENDING">Pendientes <span class="nav-tag green"></span></a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=ACCEPTED">Aceptadas <span class="nav-tag yellow"></span></a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=CANCEL">Canceladas <span class="nav-tag red"></span></a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=PAID">Pagadas <span class="nav-tag blue"></span></a></li>
					 </ul>	
					 </li>
                </ul>
                
                 <ul v-show="role === 'ROLE_CUIDADOR'" data-submenu-title="Calificaciones" >
                    <li><a href="/views/reserva/mis-reservas-cuidador.html?status=finalizada"><i class="sl sl-icon-layers"></i> Calificaciones</a></li>
                </ul>
                
                <ul v-show="role === 'ROLE_ADMIN'" data-submenu-title="Admin" >
                    <li><a href="/views/admin/moderar-cuidador.html"><i class="sl sl-icon-user"></i> Moderar Solicitud</a></li>
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
    },



});