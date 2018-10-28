package app.services;

import app.models.entities.Cuidador;
import app.models.entities.Servicio;
import app.persistence.CuidadorRepository;
import app.utils.MailType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by fbackhaus on 7/6/17.
 */
@Service
public class CuidadorService {

    private final CuidadorRepository cuidadorRepository;
    private final MailService mailService;


    @Autowired
    public CuidadorService(CuidadorRepository cuidadorRepository, MailService mailService) {
        this.cuidadorRepository = cuidadorRepository;
        this.mailService = mailService;
    }

    public List<Cuidador> getCuidadores() {
        return cuidadorRepository.findAll();
    }

    public Cuidador getCuidador(Long id) {
        return cuidadorRepository.findOne(id);
    }

    public void deleteCuidador(Long id) {
        if (id > 0) {
            cuidadorRepository.delete(id);
        }
    }

    public void createCuidador(Cuidador entity) {
        cuidadorRepository.save(entity);
    }


    public Cuidador editCuidador(Cuidador entity) {
        if ("approved".equalsIgnoreCase(entity.getEstado())) {
            mailService.sendEmail(entity.getUser(), MailType.WELCOME_HOST, null, "Ir a pupi");
        } else if ("rejected".equalsIgnoreCase(entity.getEstado())) {
            mailService.sendEmail(entity.getUser(), MailType.HOST_REJECTED, null, "Ir a pupi");
        }
        return cuidadorRepository.save(entity);
    }


    public List<Servicio> getListaServicios() {

        return cuidadorRepository.getServicios();
    }


    public Cuidador cuidadorXUser(Long id) {
        return cuidadorRepository.findcuidadorXUser(id);
    }


    public List<Cuidador> getSolicitudes() {

        return cuidadorRepository.getSolicitudes();
    }

    public List<Cuidador> searchCuidadores(String ciudadPlaceId, LocalDate from, LocalDate to, String status) {
        List<Cuidador> cuidadores;
        if (from == null || to == null) {
            cuidadores = cuidadorRepository.findAllbyCiudadPlaceIdAndStatus(ciudadPlaceId, status);
        } else {
            cuidadores = cuidadorRepository.findAllbyCiudadYFecha(ciudadPlaceId, from, to, status);
        }
        return cuidadores;


    }

    public Long getTotalCuidadores() {
        return cuidadorRepository.count();
    }

    public Long getTotalCuidadoresOperativos() {
        return cuidadorRepository.getTotalCuidadoresOperativos();
    }
}
