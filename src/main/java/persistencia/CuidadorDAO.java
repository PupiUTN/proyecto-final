/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import java.util.AbstractList;
import java.util.LinkedList;
import java.util.List;
import modelo.Cuidador;
import modelo.Direccion;
import modelo.Dueno;

import modelo.Raza;
import modelo.Imagen;

/**
 *
 * @author agile
 */
public class CuidadorDAO extends DAO<Cuidador> {

    public CuidadorDAO() throws Exception {
        super(Cuidador.class);
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {
            Imagen imagen1 = new Imagen();
            List<Imagen> imagenes = new LinkedList<>();

            DireccionDAO direccionDAO = new DireccionDAO();
            List<Direccion> findAll = direccionDAO.findAll();
            Cuidador cuidador1 = new Cuidador();
            cuidador1.setNombre("Cesar Millan");
            cuidador1.setCantidadMaxDePerros(100);
            cuidador1.setEmail("cesar@encantadordeperros.com");
            cuidador1.setTelefono(3515644404L);
            cuidador1.setDireccion(findAll.remove(0));

//            imagen1.setUrl("http://e.noticias.americadigital.pe/ima/0/0/2/5/7/257161.jpg");
//            imagenes.add(imagen1);
//            cuidador1.setListaImagenes(imagenes);
            
            create(cuidador1);

            Cuidador cuidador2 = new Cuidador();
            cuidador2.setNombre("Juan Roman Riquelme");
            cuidador2.setCantidadMaxDePerros(3);
            cuidador2.setEmail("juan@bocajuniors.com.ar");
            cuidador2.setTelefono(1126354896);
            cuidador2.setDireccion(findAll.remove(0));

//            imagen1.setUrl("https://www.pagina12.com.ar/fotos/20100723/notas/na27fo01.jpg");
//            imagenes.clear();
//            imagenes.add(imagen1);
//            cuidador2.setListaImagenes(imagenes);

            create(cuidador2);

            Cuidador cuidador3 = new Cuidador();
            cuidador3.setNombre("Marcelo Tinelli");
            cuidador3.setCantidadMaxDePerros(2);
            cuidador3.setEmail("marce@show.com.ar");
            cuidador3.setTelefono(1195378619);
            cuidador3.setDireccion(findAll.remove(0));
            
//            imagen1.setUrl("http://static.wixstatic.com/media/f07ef9_3bb69e586d1341588117507acb8c2f60~mv2.jpg");
//            imagenes.clear();
//            imagenes.add(imagen1);
//            cuidador3.setListaImagenes(imagenes);
            
            create(cuidador3);

            Cuidador cuidador4 = new Cuidador();
            cuidador4.setNombre("Jorge Mario Bergoglio ");
            cuidador4.setCantidadMaxDePerros(1);
            cuidador4.setEmail("francis@pope.com");
            cuidador4.setTelefono(325923652);
            cuidador4.setDireccion(findAll.remove(0));
            create(cuidador4);

            Cuidador cuidador5 = new Cuidador();
            cuidador5.setNombre("Elisa María Avelina \"Lilita\" Carrió");
            cuidador5.setCantidadMaxDePerros(2);
            cuidador5.setEmail("lilita@ucr.com");
            cuidador5.setTelefono(586237470);
            cuidador5.setDireccion(findAll.remove(0));
            create(cuidador5);
        }
    }

}
