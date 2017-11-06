package app.services;

import app.models.entities.User;
import app.utils.MailType;
import com.amazonaws.ClientConfiguration;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private static final String FROM = "reservas@pupi.com.ar";
    @Value("${app.aws.ses.accessKey}")
    private static String accesskey;

    @Value("${app.aws.ses.secretKey}")
    private static String secretKey;

    public static int sendEmail(User user, MailType type) {

        try {
            BasicAWSCredentials credentials = new BasicAWSCredentials(accesskey, secretKey);
            AmazonSimpleEmailServiceClientBuilder builder = AmazonSimpleEmailServiceClientBuilder
                    .standard()
                    .withCredentials(new AWSStaticCredentialsProvider(credentials))
                    .withRegion(Regions.US_EAST_1.getName())
                    .withClientConfiguration(
                            new ClientConfiguration()
                                    .withConnectionTimeout(3000)
                                    .withRequestTimeout(3000));

            AmazonSimpleEmailService service = builder.build();
            SendEmailRequest sendEmailRequest = createEmailRequest(FROM, user.getEmail(), type, user.getUsername());
            SendEmailResult sendEmailResult = service.sendEmail(sendEmailRequest);
            return sendEmailResult.getSdkHttpMetadata().getHttpStatusCode();
        } catch (Exception e) {
            throw new AmazonSimpleEmailServiceException(e.toString());
        }
    }

    private static SendEmailRequest createEmailRequest(String from, String to, MailType type, String username) {

        String emailTemplate = type.getMailTemplate(username);
        Destination destination = new Destination().withToAddresses(to);
        Content subjectContent = new Content().withData(type.getMailSubject());
        Content textContent = new Content().withData(emailTemplate);
        Body body = new Body().withHtml(textContent);
        Message message = new Message().withSubject(subjectContent).withBody(body);

        return new SendEmailRequest().withSource(from).withDestination(destination).withMessage(message);

    }
}
