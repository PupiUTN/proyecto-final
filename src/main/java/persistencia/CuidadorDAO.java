/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import modelo.Cuidador;
import modelo.Direccion;
import modelo.Imagen;

import java.util.LinkedList;
import java.util.List;

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
            imagen1.setUrl("http://e.noticias.americadigital.pe/ima/0/0/2/5/7/257161.jpg");
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
            imagen2.setUrl("https://www.pagina12.com.ar/fotos/20100723/notas/na27fo01.jpg");
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
            imagen3.setUrl("http://static.wixstatic.com/media/f07ef9_3bb69e586d1341588117507acb8c2f60~mv2.jpg");
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
            imagen4.setUrl("http://africa.com/wp-content/uploads/2016/02/Pope-Francis-with-wine.jpg");
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
            imagen5.setUrl("http://3.bp.blogspot.com/-gLc6JaCgytA/VG5gXza1YgI/AAAAAAAAO40/wq_cQd8Ebp0/s1600/carrio.png");
            imagenes5.clear();
            imagenes5.add(imagen5);
            cuidador5.setListaImagenes(imagenes5);
            
            create(cuidador5);
        }
    }

}
