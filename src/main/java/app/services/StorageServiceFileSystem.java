package app.services;

import app.models.support.FileJson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class StorageServiceFileSystem  implements  StorageService{




    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    //Local
    private String rootPath;
    private String pathToLocalHost;
    private String folder;
    private String completePath;
    // Remote address
    private String hostName;
    private String port = String.valueOf(5000);

    public StorageServiceFileSystem() {
        rootPath = System.getProperty("user.dir");
        pathToLocalHost = rootPath + File.separator + "src" + File.separator + "main" + File.separator + "resources"
        + File.separator + "static" + File.separator + "file_upload";
        folder = File.separator + "file_upload";
        completePath = pathToLocalHost+ folder;
        // Remote address
        hostName = InetAddress.getLoopbackAddress().getHostName();
    }




    public List<FileJson> loadAll() {
        File folder = new File(completePath);
        File[] listOfFiles = folder.listFiles();
        if (listOfFiles == null || listOfFiles.length == 0) {
            return null;
        }
        List<FileJson> result = new ArrayList<>(listOfFiles.length);

        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                result.add(new FileJson(FileJson.FILE , getUrlFromFileName(listOfFiles[i].getName())) );
            } else if (listOfFiles[i].isDirectory()) {
                result.add(new FileJson(FileJson.DIR , getUrlFromFileName(listOfFiles[i].getName())) );
            }
        }
        return result;

    }


    public String store(MultipartFile remoteFile) throws IOException {
        InputStream inputStream = null;
        OutputStream outputStream = null;


        File dir = new File(completePath);
        if (!dir.exists()) dir.mkdirs();

        String remoteFileName = remoteFile.getOriginalFilename();
        String remoteFileExtension = remoteFileName.substring(remoteFileName.lastIndexOf(".") + 1);

        String serverFileName = UUID.randomUUID().toString() + "." + remoteFileExtension;
        File serverFile = new File(dir.getAbsolutePath() + File.separator + serverFileName);

        try {
            inputStream = remoteFile.getInputStream();

            if (!serverFile.exists()) {
                serverFile.createNewFile();
            }
            outputStream = new FileOutputStream(serverFile);
            int read = 0;
            byte[] bytes = new byte[1024];

            while ((read = inputStream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, read);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }



        logger.info("file path:" + serverFile.getAbsolutePath());
        return getUrlFromFileName(serverFileName);


    }

    private String getUrlFromFileName(String serverFileName){
        String remoteUrl = folder + File.separator + serverFileName;
        logger.info("file url:" + remoteUrl);
        return remoteUrl;
    }
}
