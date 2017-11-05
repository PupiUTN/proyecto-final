let myIndex = Vue.component('my-index', {
    template: `    
    <span>
<div class="main-search-container" data-background-image="/img/perro_fondo_2.jpg">
    <div class="main-search-inner">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2> Tú mascota es nuestra mascota</h2>
                    <h4>Porque tú mejor amigo no merece estar solo en casa</h4>
                    <my-buscar-cuidadores ref="myBuscarCuidadores"></my-buscar-cuidadores>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Info Section -->
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <h2 class="headline centered margin-top-80">
                Planea la estadía de sus sueños
                <span class="margin-top-25"> Explora algunos de los mejores cuidadores del país. Descubre nuevas experiencias y haz a tu perro feliz </span>
            </h2>
        </div>
    </div>
    <div class="row icons-container">
        <!-- Stage -->
        <div class="col-md-4">
            <div class="icon-box-2 with-line">
                <i class="im im-icon-Search-People"></i>
                <h3>Encuentra el lugar indicado </h3>
                <p>Mira perfiles y lee las reviews .</p>
            </div>
        </div>
        <!-- Stage -->
        <div class="col-md-4">
            <div class="icon-box-2 with-line">
                <i class="im im-icon-Mailbox-Empty"></i>
                <h3>Contacta con tu cuidador ideal</h3>
                <p> Envía mensajes y conócelo.</p>
            </div>
        </div>
        <!-- Stage -->
        <div class="col-md-4">
            <div class="icon-box-2">
                <i class="im im-icon-Checked-User"></i>
                <h3>Haz una reserva</h3>
                <p>De forma fácil y segura. A un click de distancia</p>
            </div>
        </div>
    </div>
</div>


    <!-- Back To Top Button -->
    <div id="backtotop"><a href="#"></a></div>
    </span>

`
});
