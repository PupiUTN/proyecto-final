package app.controlador;

import app.modelo.soporte.FileJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import app.service.StorageService;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping(value = "/api/file")
public class FileREST {

    private final StorageService storageService;

    @Autowired
    public FileREST(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/")
    public List<FileJson> listUploadedFiles() throws IOException {
        return storageService.loadAll();
    }

    @PostMapping("/")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) throws IOException {

        String store = storageService.store(file);
        return store;

    }


}


