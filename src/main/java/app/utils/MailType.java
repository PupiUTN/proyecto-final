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
                text = "<b>¡Bienvenido a Pupi!</b> \uD83D\uDC3E <br>" +
                        "Somos la plataforma que conecta dueños de mascotas con cuidadores que hospedan perros en su casa, <br> " +
                        "brindando todo su cariño y seguridad. ";
                break;
            case BOOKING_REQUEST:
                text = "Has recibido una <b>solicitud de reserva</b> por tu perfil como cuidador<br>" +
                        "Tienes 72 hs para aceptarla o rechazarla, revisa el perfil del dueño y de su mascota para que no haya inconvenientes. <br> " +
                        "Una vez aceptada el dueño tendra 72hs para pagar su reserva. ";
                break;

            case BOOKING_CONFIRMATION:
                text = "Tu reserva ha sido <b>confirmada</b>.<br>" +
                        "Tienes 72 hs para pagarla. <br> " +
                        "Una vez pagada te brindaremos los datos de contacto del cuidador para que puedas efectuar tu reserva. ";
                break;

            case BOOKING_CANCELLATION_BY_HOST:
                text = "Tu reserva ha sido <b>cancelada</b> por el cuidador.<br>" +
                        "No te desanimes, ya encontraras tu cuidador ideal. <br> " +
                        "Te recomendamos completar tu perfil para aumentar tus probalidades. ";
                break;

            case BOOKING_CANCELLATION_BY_USER:
                text = "Una de tus reservas ha sido <b>cancelada</b> por el usuario.<br>" +
                        "No te desanimes, ya vendran nuevos clientes. <br> " +
                        "Te recomendamos completar tu perfil para aumentar tus chances. ";

                break;

            case WELCOME_HOST:
                text = "<b>¡Bienvenido a Pupi!</b> \uD83D\uDC3E  <br>" +
                        "Gracias por ser parte de nuestra comunidad de cuidadores. <br> " +
                        "El siguiente paso es completar tu perfil como cuidador para empezar a ganar dinero con tus futuros clientes.";
                break;

            case HOST_REJECTED:
                text = "<b>¡Noticias de Pupi!</b><br>" +
                        "Lamentamos informarte que por distintas razones tu solicitud como cuidador.<br> " +
                        "Si crees que hemos cometido un error a la hora de revisar tu solicitud, <br>" +
                        "te invitamos a que te contactes con nosotros para revisar el caso personalmente.";
                break;

            default:
                throw new AssertionError("Unknown email type " + this);


        }
        return this.getTemplate(username, text);
    }

    public String getTemplate(String username, String bodyText) throws IOException {
        InputStream inputStream = new ClassPathResource("email/template-stripo.html").getInputStream();
        String content;
        try (BufferedReader buffer = new BufferedReader(new InputStreamReader(inputStream))) {
            content = buffer.lines().collect(Collectors.joining("\n"));
        }
        //
        content = content.replace("{{bodyText}}", bodyText);
        content = content.replace("{{username}}", username);
        return content;

    }

    public String getMailSubject(String username) {
        switch (this) {
            case WELCOME:
                return username + ", Bienvenido a Pupi!";
            case BOOKING_REQUEST:
                return username + ", Nueva Solicitud de Reserva - Pupi";
            case BOOKING_CONFIRMATION:
                return username + ", Confirmación de Reserva - Pupi";
            case BOOKING_CANCELLATION_BY_HOST:
                return username + ", Cancelación de Solicitud de Reserva - Pupi";
            case BOOKING_CANCELLATION_BY_USER:
                return username + ", Cancelación de Reserva - Pupi";
            case WELCOME_HOST:
                return username + ", Solicitud de Cuidador Aprobada - Pupi";
            case HOST_REJECTED:
                return username + ", Solicitud de Cuidador Rechazada - Pupi";
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

