package app.services;

import app.models.support.FileJson;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
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
    @Value("${app.aws.s3.accessKey}")
    private String accesskey;

    @Value("${app.aws.s3.secretKey}")
    private String secretKey;

    @Value("${app.aws.s3.bucketName}")
    private String bucketName;

    private String systemFolderName = "tmp" + File.separator;


    public StorageServiceS3() {
        File dir = new File(systemFolderName);
        if (!dir.exists()) dir.mkdirs();
    }


    public List<FileJson> loadAll() {
        return null;
    }


    public String store(MultipartFile remoteFile) throws IOException {
        AmazonS3 client = getClient();
        String remoteFileName = remoteFile.getOriginalFilename();
        String remoteFileExtension = remoteFileName.substring(remoteFileName.lastIndexOf(".") + 1);
        String serverFileName = UUID.randomUUID().toString() + "." + remoteFileExtension;
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, serverFileName, convert(remoteFile))
                .withCannedAcl(CannedAccessControlList.PublicRead);
        client.putObject(putObjectRequest);
        return String.valueOf(client.getUrl(bucketName, serverFileName));

    }

    @Bean
    private AmazonS3 getClient() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(accesskey, secretKey);

        return AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.US_EAST_2.getName())
                .build();

    }

    private File convert(MultipartFile file) throws IOException {
        File convFile = new File(systemFolderName + file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }


}
