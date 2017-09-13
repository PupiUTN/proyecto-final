package app.services;

import com.amazonaws.AmazonClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClient;
import com.amazonaws.services.simpleemail.model.*;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    static final String FROM = "reservas@pupi.com.ar";
    static final String TO = "fbackhaus94@gmail.com";
    static final String SUBJECT = "PRUEBA";
    static final String SMTP_USERNAME = "AKIAI7PULODMLK23LEGQ";
    static final String SMTP_PASSWORD = "AvYqXJjZNJFJ+ClkCpsDK40CcgBE4eNlVIkI24SHyvmK";
    static final String HOST = "email-smtp.us-east-1.amazonaws.com";
    static final int PORT = 25;
    static final String BODY = "LA ESTAMOS ROMPIENDO TODA JOSEPE";
    private static Regions AWS_REGION = Regions.US_EAST_1;

    public void sendEmail() {
        try {
            BasicAWSCredentials b = new BasicAWSCredentials("AKIAJC5QINGQL2PXT7TA", "//PQfIw02psEx2ZWmdgCR1KktRJRR5m2qUTwDW+8");
            AWSCredentials awsCredentials = null;
            try {
                awsCredentials = b;
            } catch (Exception e) {
                throw new AmazonClientException("Can't load SES Credentials");
            }
            Region REGION = Region.getRegion(AWS_REGION);
            Destination destination = new Destination().withToAddresses(new String[]{TO});
            Content subject = new Content().withData(SUBJECT);
            Content textBody = new Content().withData(BODY);
            Body body = new Body().withText(textBody);
            Message message = new Message().withSubject(subject).withBody(body);
            SendEmailRequest request = new SendEmailRequest().withSource(FROM).withDestination(destination).withMessage(message);

            AmazonSimpleEmailServiceClient client = new AmazonSimpleEmailServiceClient(awsCredentials);
            client.setRegion(REGION);
            client.sendEmail(request);
            System.out.println("EMAIL SENT!");
        }
        catch(Exception e) {
            System.out.println("THE EMAIL WAS NOT SENT!");
            System.out.println(e.getMessage());
        }



    }
}
