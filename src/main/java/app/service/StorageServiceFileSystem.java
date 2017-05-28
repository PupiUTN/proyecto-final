package app.service;

import app.modelo.soporte.FileJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class StorageServiceFileSystem  implements  StorageService{



    @Autowired
    Environment environment;

    final static Logger logger = Logger.getLogger(StorageServiceFileSystem.class.getSimpleName());

    //Local
    private String rootPath;
    private String pathToLocalHost;
    private String folder;
    private String completePath;
    // Remote address
    private String hostName;

    public StorageServiceFileSystem() {
        rootPath = System.getProperty("user.dir");
        pathToLocalHost = rootPath + File.separator + "src" + File.separator + "main" + File.separator + "webapp" ;
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
        // Remote Port
        String port = environment.getProperty("server.port");
        if (hostName.equals("localhost")){
            String remoteUrl = "http://" + hostName + ":" + port + folder + File.separator + serverFileName;
            logger.info("file url:" + remoteUrl);
            return remoteUrl;

        }else {
            String remoteUrl = "http://" + hostName  + folder + File.separator + serverFileName;
            logger.info("file url:" + remoteUrl);
            return remoteUrl;

        }
    }
}
