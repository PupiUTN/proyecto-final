package app.services;

import app.models.entities.Denuncia;
import app.models.entities.Reserva;
import app.models.entities.TipoCierre;
import app.models.entities.TipoDenuncia;
import app.persistence.DenunciaRepository;
import app.persistence.TipoDenunciaRepository;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DenunciaService {

    private final DenunciaRepository denunciaRepository;
    private final TipoDenunciaRepository tipoDenunciaRepository;

    @Autowired
    public DenunciaService(DenunciaRepository denunciaRepository, TipoDenunciaRepository tipoDenunciaRepository) {
        this.denunciaRepository = denunciaRepository;
        this.tipoDenunciaRepository = tipoDenunciaRepository;
    }

    public List<Denuncia> getDenunciasByStatus(String status) {
        return denunciaRepository.findAllDenunciasByStatus(status);
    }

    public Denuncia getDenuncia(Long id) {
        return denunciaRepository.findById(id);
    }

    public Denuncia save(Denuncia denuncia) {
        //TODO hot fix, el formato de la fecha al no tener hora se desplaza un dia
        // https://stackoverflow.com/questions/7556591/javascript-date-object-always-one-day-off
        //reserva.setFechaFin(addDays(reserva.getFechaFin(), 1));
        //reserva.setFechaInicio(addDays(reserva.getFechaInicio(), 1));

        denuncia.setEstado("creada");
        Denuncia savedObject = denunciaRepository.save(denuncia);
        return savedObject;
    }

    public Denuncia setStatus(long denunciaId, String status) {
        Date fechaActualizacion = DateTime.now().toDate();
        Denuncia savedObject = denunciaRepository.updateStatus(denunciaId, status, fechaActualizacion);
        return savedObject;
    }

    public Denuncia cerrar(Denuncia denuncia){
        Denuncia savedObject = denunciaRepository.cerrar(denuncia.getId(), "cerrada", denuncia.getResolucion(), denuncia.getTipoCierre());
        return savedObject;
    }

    public List<TipoDenuncia> getTipoDenuncias() {
        return tipoDenunciaRepository.findAll();
    }
}
