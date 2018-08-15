package app.services;

import app.models.support.FileJson;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface StorageService {
    List<FileJson> loadAll();

    String store(MultipartFile remoteFile) throws IOException;
}
