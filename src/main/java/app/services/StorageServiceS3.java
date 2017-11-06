package app.services;

import app.models.support.FileJson;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class StorageServiceS3 implements StorageService {


    protected Logger logger = LoggerFactory.getLogger(this.getClass());
    @Value("${app.aws.accessKey}")
    private String accesskey;

    @Value("${app.aws.secretKey}")
    private String secretKey;

    @Value("${app.aws.s3.bucketName}")
    private String bucketName;


    public StorageServiceS3() {
    }


    public List<FileJson> loadAll() {
        return null;
    }


    public String store(MultipartFile remoteFile) throws IOException {
        AmazonS3 client = getClient();
        String remoteFileName = remoteFile.getOriginalFilename();
        String remoteFileExtension = remoteFileName.substring(remoteFileName.lastIndexOf(".") + 1);
        String serverFileName = UUID.randomUUID().toString() + "." + remoteFileExtension;
        client.putObject(bucketName, serverFileName, convert(remoteFile));
        return String.valueOf(client.getUrl(bucketName, serverFileName));


    }

    @Bean
    private AmazonS3 getClient() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(accesskey, secretKey);

        return AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))

                .build();

    }

    private File convert(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }


}
