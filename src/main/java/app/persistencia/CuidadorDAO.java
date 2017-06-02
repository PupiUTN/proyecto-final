/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistencia;

import app.modelo.entidades.Cuidador;
import app.modelo.entidades.Direccion;
import app.modelo.entidades.Imagen;
import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.List;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

/**
 *
 * @author agile
 */
@Repository
public class CuidadorDAO extends DAO<Cuidador> {

    public CuidadorDAO() throws Exception {
        super(Cuidador.class);
    }

    public List<Cuidador> findPorLocalidad(int idLocalidad) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root<Cuidador> cuidador = cq.from(Cuidador.class);
        Join<Cuidador, Direccion> direccion = cuidador.join("direccion");
        cq.select(cuidador).where(direccion.get("localidad").in(idLocalidad));
        return getEntityManager().createQuery(cq).getResultList();
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {

            DireccionDAO direccionDAO = new DireccionDAO();
            List<Direccion> findAll = direccionDAO.findAll();
            Cuidador cuidador1 = new Cuidador();
            cuidador1.setNombre("Cesar Millan");
            cuidador1.setCantidadMaxDePerros(100);
            cuidador1.setEmail("cesar@encantadordeperros.com");
            cuidador1.setTelefono(3515644);
            cuidador1.setDireccion(findAll.remove(0));

            Imagen imagen1 = new Imagen();
            List<Imagen> imagenes1 = new LinkedList<>();
            imagen1.setUrl("http://localhost:5000/img/cesar_200.jpg");
            imagenes1.add(imagen1);
            cuidador1.setListaImagenes(imagenes1);

            create(cuidador1);

            Cuidador cuidador2 = new Cuidador();
            cuidador2.setNombre("Juan Roman Riquelme");
            cuidador2.setCantidadMaxDePerros(3);
            cuidador2.setEmail("juan@bocajuniors.com.ar");
            cuidador2.setTelefono(1126354896);
            cuidador2.setDireccion(findAll.remove(0));

            Imagen imagen2 = new Imagen();
            List<Imagen> imagenes2 = new LinkedList<>();
            imagen2.setUrl("http://localhost:5000/img/riquelme_200.jpg");
            imagenes2.add(imagen2);
            cuidador2.setListaImagenes(imagenes2);

            create(cuidador2);

            Cuidador cuidador3 = new Cuidador();
            cuidador3.setNombre("Marcelo Tinelli");
            cuidador3.setCantidadMaxDePerros(2);
            cuidador3.setEmail("marce@show.com.ar");
            cuidador3.setTelefono(1195378619);
            cuidador3.setDireccion(findAll.remove(0));

            Imagen imagen3 = new Imagen();
            List<Imagen> imagenes3 = new LinkedList<>();
            imagen3.setUrl("http://localhost:5000/img/marcelo_200.jpg");
            imagenes3.clear();
            imagenes3.add(imagen3);
            cuidador3.setListaImagenes(imagenes3);

            create(cuidador3);

            Cuidador cuidador4 = new Cuidador();
            cuidador4.setNombre("Jorge Mario Bergoglio ");
            cuidador4.setCantidadMaxDePerros(1);
            cuidador4.setEmail("francis@pope.com");
            cuidador4.setTelefono(325923652);
            cuidador4.setDireccion(findAll.remove(0));

            Imagen imagen4 = new Imagen();
            List<Imagen> imagenes4 = new LinkedList<>();
            imagen4.setUrl("http://localhost:5000/img/pope_200.jpg");
            imagenes4.clear();
            imagenes4.add(imagen4);
            cuidador4.setListaImagenes(imagenes4);

            create(cuidador4);

            Cuidador cuidador5 = new Cuidador();
            cuidador5.setNombre("Elisa María Avelina \"Lilita\" Carrió");
            cuidador5.setCantidadMaxDePerros(2);
            cuidador5.setEmail("lilita@ucr.com");
            cuidador5.setTelefono(586237470);
            cuidador5.setDireccion(findAll.remove(0));

            Imagen imagen5 = new Imagen();
            List<Imagen> imagenes5 = new LinkedList<>();
            imagen5.setUrl("http://localhost:5000/img/carrio_200.jpg");
            imagenes5.clear();
            imagenes5.add(imagen5);
            cuidador5.setListaImagenes(imagenes5);

            create(cuidador5);
        }
    }

}
