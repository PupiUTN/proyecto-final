package app.utils;

import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

public enum MailType {
    WELCOME,
    BOOKING_REQUEST,
    BOOKING_CONFIRMATION,
    BOOKING_CANCELLATION_BY_HOST,
    BOOKING_CANCELLATION_BY_USER,
    HOST_REJECTED,
    WELCOME_HOST;

    public String getMailTemplate(String username) throws IOException {
        String text;
        switch (this) {
            case WELCOME:
                text = "Bienvenido a Pupi! \uD83D\uDC3E\n <br>" +
                        "Somos la plataforma que conecta dueños de mascotas con cuidadores que hospedan perros en su casa, <br> " +
                        "brindando todo su cariño y seguridad. ";
                break;
            case BOOKING_REQUEST:
                text = "Su solicitud de reserva ah sido enviada, proximanente el cuidador le respondera";
                break;

            case BOOKING_CONFIRMATION:
                text = "Iujuuuuuu, el cuidador ah acepetado su solicitud de reserva, ahora solo tienes que pagar para confirmarla";
                break;

            case BOOKING_CANCELLATION_BY_HOST:
                text = "PENDIENTE DE DESARROLLO, CONTACTE AL ADMINISTRADOR";
                break;

            case BOOKING_CANCELLATION_BY_USER:
                text = "PENDIENTE DE DESARROLLO, CONTACTE AL ADMINISTRADOR";

                break;

            case WELCOME_HOST:
                text = "Bienvenido a pupi, la plataforma donde te llenaras de dinero";
                break;

            case HOST_REJECTED:
                text = "PENDIENTE DE DESARROLLO, CONTACTE AL ADMINISTRADOR";

                break;

            default:
                throw new AssertionError("Unknown email type " + this);


        }
        return this.getTemplate(username, text);
    }

    public String getTemplate(String username, String bodyText) throws IOException {
        InputStream inputStream = new ClassPathResource("email/template.html").getInputStream();
        String content;
        try (BufferedReader buffer = new BufferedReader(new InputStreamReader(inputStream))) {
            content = buffer.lines().collect(Collectors.joining("\n"));
        }
        //
        content = content.replace("{{bodyText}}", bodyText);
        content = content.replace("{{username}}", username);
        return content;

    }

    public String getMailSubject() {
        switch (this) {
            case WELCOME:
                return "Bienvenido a Pupi!";
            case BOOKING_REQUEST:
                return "Nueva Solicitud de Reserva - Pupi";
            case BOOKING_CONFIRMATION:
                return "Confirmación de Reserva - Pupi";
            case BOOKING_CANCELLATION_BY_HOST:
                return "Cancelación de Solicitud de Reserva - Pupi";
            case BOOKING_CANCELLATION_BY_USER:
                return "Cancelación de Reserva - Pupi";
            case WELCOME_HOST:
                return "Solicitud de Cuidador Aprobada - Pupi";
            case HOST_REJECTED:
                return "Solicitud de Cuidador Rechazada - Pupi";
            default:
                throw new AssertionError("Unknown email type " + this);
        }
    }

    public String getMailText(String username) {
        switch (this) {
            case WELCOME:
                return username + ", Bienvenido";
            case BOOKING_REQUEST:
                return username + ", Tienes una solicitud de reserva";
            case BOOKING_CONFIRMATION:
                return username + ", Tu reserva ha sido confirmada";
            case BOOKING_CANCELLATION_BY_HOST:
                return username + ", Tu solicitud de reserva ha sido cancelada";
            case BOOKING_CANCELLATION_BY_USER:
                return username + ", Tu reserva ha sido cancelada";
            case WELCOME_HOST:
                return username + ", Has sido aprobado como cuidador";
            case HOST_REJECTED:
                return username + ", Lo sentimos, no fuiste aprobado";
            default:
                throw new AssertionError("Unknown email type " + this);
        }
    }

    public String getButtonText() {
        switch (this) {
            case WELCOME:
            case WELCOME_HOST:
            case HOST_REJECTED:
                return "Ir a Pupi";
            default:
                return "Ver Detalle";
        }
    }

    public String getRedirectUrl() {
        switch (this) {
            case WELCOME:
            case WELCOME_HOST:
            case HOST_REJECTED:
                return "";
            case BOOKING_REQUEST:
                return "/views/reserva/mis-reservas-cuidador.html?status=CONFIRMATION_PENDING";
            case BOOKING_CONFIRMATION:
                return "/views/reserva/mis-reservas-user.html?status=ACCEPTED";
            case BOOKING_CANCELLATION_BY_HOST:
                return "/views/reserva/mis-reservas-cuidador.html?status=CANCEL";
            case BOOKING_CANCELLATION_BY_USER:
                return "/views/reserva/mis-reservas-user.html?status=CANCEL_BY_USER";
            default:
                throw new AssertionError("Unknown email type " + this);
        }
    }
}

