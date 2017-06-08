package app.controllers;

import app.models.support.FileJson;
import app.services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping(value = "/api/file")
public class FileController {

    // https://spring.io/guides/gs/uploading-files/
    private final StorageService storageService;

    @Autowired
    public FileController(StorageService storageService) {
        this.storageService = storageService;
    }
    @GetMapping("/")
    public List<FileJson> listUploadedFiles() throws IOException {
        return storageService.loadAll();
    }

    @PostMapping("/")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
        return storageService.store(file);
    }

}


