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

        <!-- Fullwidth Section -->
        <section class="fullwidth margin-top-65 padding-top-75 padding-bottom-70" data-background-color="#f8f8f8">

            <div class="container">
                <div class="row">

                    <div class="col-md-12">
                        <h3 class="headline centered margin-bottom-45">
                            Descubre Amigos para tus mejores amigos
                            <span></span>
                        </h3>
                    </div>

                    <div class="col-md-12">
                        <div class="simple-slick-carousel dots-nav">

                            <!-- Listing Item -->
                            <div class="carousel-item">
                                <a href="/views/index/acerca-de-pupi.html" class="listing-item-container">
                                    <div class="listing-item">
                                        <img  src="/img/background11.jpg" alt="">



                                        <div class="listing-item-content">

                                            <h3   style="line-height: 200px; margin-left: 100px;" >Conocenos</h3>



                                        </div>
                                        <!--<i class="like-icon"></i>-->
                                    </div>

                                </a>
                            </div>
                            <!-- Listing Item / End -->

                            <!-- Listing Item -->
                            <div class="carousel-item">
                                <a href="/views/dashboard/dashboard.html" class="listing-item-container">
                                    <div class="listing-item">
                                        <img src="/img/background12.jpg" alt="">
                                        <div class="listing-item-details">

                                        </div>
                                        <div class="listing-item-content">

                                            <h3   style="line-height: 200px; margin-left: 100px;" >Ingresá</h3>

                                        </div>

                                    </div>

                                </a>
                            </div>
                            <!-- Listing Item / End -->

                            <!-- Listing Item -->
                            <div class="carousel-item">
                                <a href="http://www.facebook.com/pupi.com.ar/" class="listing-item-container">
                                    <div class="listing-item">
                                        <img src="/img/background13.jpg" alt="">
                                        <div class="listing-item-details">

                                        </div>
                                        <div class="listing-item-content">

                                            <h3  style="line-height: 200px; margin-left: 100px;" >Conoce más</h3>

                                        </div>

                                    </div>

                                </a>
                            </div>
                            <!-- Listing Item / End -->

                            <!-- Listing Item -->

                            <!-- Listing Item / End -->


                            <!-- Listing Item / End -->
                        </div>

                    </div>

                </div>
            </div>

        </section>
        <!-- Fullwidth Section / End -->

    <!-- Back To Top Button -->
    <div id="backtotop"><a href="#"></a></div>
    </span>

`
});
