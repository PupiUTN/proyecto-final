let mySidebar = Vue.component('my-sidebar', {
    template: `
        <div class="dashboard-nav">
            <div class="dashboard-nav-inner">

                <ul data-submenu-title="Principal">
                    <li class="active"><a href="/views/dashboard/dashboard.html"><i class="sl sl-icon-settings"></i> Dashboard</a></li>
                </ul>

                <ul data-submenu-title="Cuenta">
                    <li><a href="/views/perros/perros.html"><i class="im im-icon-Dog"></i> Mis Perros</a></li>
                    <li><a><i class="sl sl-icon-layers"></i> Mis Reservas</a>
					<ul>
						<li><a href="/views/reserva/mis-reservas-user.html?status=CONFIRMATION_PENDING">Pendientes <span class="nav-tag green">6</span></a></li>
						<li><a href="#">Concretadas <span class="nav-tag yellow">1</span></a></li>
						<li><a href="/views/reserva/mis-reservas-user.html?status=CANCEL_BY_USER">Canceladas <span class="nav-tag red">2</span></a></li>
					</ul>
					
                    <li><a href="/views/due%C3%B1o/perfil.html"><i class="sl sl-icon-user"></i> Mi Perfil</a></li>	
				</li>
                </ul>
                <ul data-submenu-title="Cuidador">
                    <li><a href="/views/cuidadores/alta-cuidador.html"><i class="sl sl-icon-user"></i> Solicitud</a></li>
                     <li><a href="/views/cuidadores/cuidadores-editar.html"><i class="sl sl-icon-book-open"></i> Mi Descripcion</a></li>
                     <li><a><i class="sl sl-icon-layers"></i> Mis Reservas</a>
					 <ul>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=CONFIRMATION_PENDING">Pendientes <span class="nav-tag green">6</span></a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=ACCEPTED">Concretadas <span class="nav-tag yellow">1</span></a></li>
						<li><a href="/views/reserva/mis-reservas-cuidador.html?status=CANCEL">Canceladas <span class="nav-tag red">2</span></a></li>
					 </ul>	
					 </li>
                </ul>

            </div>
        </div>
        <!-- Navigation / End -->
`
});