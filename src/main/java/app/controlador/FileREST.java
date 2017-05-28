package app.controlador;

import app.modelo.soporte.FileJson;
import app.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import app.service.StorageServiceFileSystem;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping(value = "/api/file")
public class FileREST {

    private final StorageService storageService;

    @Autowired
    public FileREST(StorageServiceFileSystem storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/")
    public List<FileJson> listUploadedFiles() throws IOException {
        List<FileJson> fileJsons = storageService.loadAll();
        return fileJsons;
    }

    @PostMapping("/")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
        String store = storageService.store(file);
        return store;

    }


}


