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
    WELCOME_HOST,
    REVIEW_REQUEST_TO_HOST,
    REVIEW_REQUEST_TO_USER,
    BOOKING_PAYMENT_TO_HOST,
    BOOKING_PAYMENT_TO_USER;

    public String getMailTemplate(String fullName) throws IOException {
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
                        "Una vez pagada te brindaremos los datos de contacto del cuidador para que puedas efectuar tu estadia. ";
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
            case BOOKING_PAYMENT_TO_USER:
                text = "Tu reserva ha sido <b>pagada</b>.<br>" +
                        "Ingresa a la plataforma para obtener los datos de contacto de tu cuidador. ";
                break;
            case BOOKING_PAYMENT_TO_HOST:
                text = "Una de tus reserva ha sido <b>pagada</b>.<br>" +
                        "En breve se contactara tu huesped para coordinar la entragd el perro. ";
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

            case REVIEW_REQUEST_TO_HOST:
                text = "Tu Reserva como Cuidador a <b>finalizado</b><br>" +
                        "Nos gustaría saber cómo te fue con la estadia.<br> " +
                        "Califica al Perro para ayudar a la comunidad.<br>";
                break;
            case REVIEW_REQUEST_TO_USER:
                text = "Tu Estadia en Pupi a <b>finalizado</b><br>" +
                        "Nos gustaría saber cómo te fue con la estadia.<br> " +
                        "Califica al Cuidador para ayudar a la comunidad.<br>";
                break;
            default:
                throw new AssertionError("Unknown email type " + this);


        }
        return this.getTemplate(fullName, text);
    }

    public String getTemplate(String fullName, String bodyText) throws IOException {
        InputStream inputStream = new ClassPathResource("email/template-stripo.html").getInputStream();
        String content;
        try (BufferedReader buffer = new BufferedReader(new InputStreamReader(inputStream))) {
            content = buffer.lines().collect(Collectors.joining("\n"));
        }
        //
        content = content.replace("{{bodyText}}", bodyText);
        content = content.replace("{{fullName}}", fullName);
        return content;

    }

    public String getMailSubject(String fullName) {
        switch (this) {
            case WELCOME:
                return fullName + ", Bienvenido a Pupi!";
            case BOOKING_REQUEST:
                return fullName + ", Nueva Solicitud de Reserva - Pupi";
            case BOOKING_CONFIRMATION:
                return fullName + ", Confirmación de Reserva - Pupi";
            case BOOKING_CANCELLATION_BY_HOST:
                return fullName + ", Cancelación de Solicitud de Reserva - Pupi";
            case BOOKING_CANCELLATION_BY_USER:
                return fullName + ", Cancelación de Reserva - Pupi";
            case WELCOME_HOST:
                return fullName + ", Solicitud de Cuidador Aprobada - Pupi";
            case HOST_REJECTED:
                return fullName + ", Solicitud de Cuidador Rechazada - Pupi";
            case REVIEW_REQUEST_TO_USER:
                return fullName + ", Hospedaje Finalizado - Pupi";
            case REVIEW_REQUEST_TO_HOST:
                return fullName + ", Hospedaje Finalizado - Pupi";
            default:
                throw new AssertionError("Unknown email type " + this);
        }
    }
}

