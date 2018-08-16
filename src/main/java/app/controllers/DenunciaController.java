package app.controllers;

import app.models.entities.Denuncia;
import app.models.entities.TipoDenuncia;
import app.services.DenunciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/denuncias")
public class DenunciaController {

    @Autowired
    private DenunciaService denunciaService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "{estado}", method = RequestMethod.GET)
    public List<Denuncia> getDenuncias(@PathVariable("estado") String status) {
        List<Denuncia> list =  denunciaService.getDenunciasByStatus(status);
        return list;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Denuncia getDenuncia(@PathVariable("id") Long id) {
        Denuncia denuncia = denunciaService.getDenuncia(id);
        return denuncia;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "/cerrar", method = RequestMethod.PUT)
    public Denuncia cerrarDenuncias(@RequestBody Denuncia denuncia) {
        return denunciaService.cerrar(denuncia);
    }

    @RequestMapping(value = "/tipo-denuncia", method = RequestMethod.GET)
    public List<TipoDenuncia> getTipoDenuncias() {
        List<TipoDenuncia> list =  denunciaService.getTipoDenuncias();
        return list;
    }


}
