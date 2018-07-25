package app.models.entities;

public enum EstadoReserva {

    CREADA ("creada-dueño"),

    ACEPTADACUIDADOR ("aceptada-cuidador"),

    RECHAZADACUIDADOR("rechazada-cuidador"),

    PAGADADUEÑO ("pagada-dueño"),

    RECHAZADADUEÑO ("rechazada-dueño"),

    EJECUCION ("ejecución"),

    FINALZADA ("finalizada"),

    COMENTARIOCUIDADOR ("comentario-cuidador"),

    COMENTARIODUEÑO ("comentario-dueño"),

    CERRADA ("cerrada");


    private final String status;

    EstadoReserva (String status) {

        this.status = status;

    }

    public String getStatus() { return status; }


}