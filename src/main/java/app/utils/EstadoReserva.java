package app.utils;

public enum EstadoReserva {

    CREADA("creada-dueño"),

    ACEPTADA_CUIDADOR("aceptada-cuidador"),

    RECHAZADA_CUIDADOR("rechazada-cuidador"),

    PAGADA_DUEÑO("pagada-dueño"),

    RECHAZADA_DUEÑO("rechazada-dueño"),

    EJECUCION("ejecucion"),

    FINALZADA("finalizada"),

    COMENTARIO_CUIDADOR("comentario-cuidador"),

    COMENTARIO_DUEÑO("comentario-dueño"),

    CERRADA("cerrada"),

    CAIDA_FALTA_PAGO("caida-falta-pago");


    private final String status;

    EstadoReserva(String status) {

        this.status = status;

    }

    public String getStatus() {
        return status;
    }


}