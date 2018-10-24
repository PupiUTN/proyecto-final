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
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MailService {
    private final String FROM = "reservas@pupi.com.ar";
    @Value("${app.aws.ses.accessKey}")
    private String accesskey;

    @Value("${app.aws.ses.secretKey}")
    private String secretKey;

    private static SendEmailRequest createEmailRequest(String from, String to, MailType type, String fullName, String url, String buttonText) throws IOException {

        return new SendEmailRequest()
                .withDestination(
                        new Destination().withToAddresses(to))
                .withMessage(new Message()
                        .withBody(new Body()
                                .withHtml(new Content()
                                        .withCharset("UTF-8").withData(type.getMailTemplate(fullName))))
                        .withSubject(new Content()
                                .withCharset("UTF-8").withData(type.getMailSubject(fullName))))
                .withSource(from);
    }

    public int sendEmail(User user, MailType type) {
        try {
            AmazonSimpleEmailService client = getClient();
            SendEmailRequest sendEmailRequest = createEmailRequest(FROM, user.getEmail(), type, user.getFullName(),null,null);
            SendEmailResult sendEmailResult = client.sendEmail(sendEmailRequest);
            return sendEmailResult.getSdkHttpMetadata().getHttpStatusCode();
        } catch (Exception e) {
            throw new AmazonSimpleEmailServiceException(e.toString());
        }
    }

    public int sendEmail(User user, MailType type,String url, String buttonText) {
        try {
            AmazonSimpleEmailService client = getClient();
            SendEmailRequest sendEmailRequest = createEmailRequest(FROM, user.getEmail(), type,user.getFullName(), url, buttonText);
            SendEmailResult sendEmailResult = client.sendEmail(sendEmailRequest);
            return sendEmailResult.getSdkHttpMetadata().getHttpStatusCode();
        } catch (Exception e) {
            throw new AmazonSimpleEmailServiceException(e.toString());
        }
    }


    @Bean
    private AmazonSimpleEmailService getClient() {
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
        return service;

    }
}
