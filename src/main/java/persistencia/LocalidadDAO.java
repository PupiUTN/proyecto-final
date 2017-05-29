/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package persistencia;

import modelo.Localidad;

/**
 *
 * @author jorge
 */
public class LocalidadDAO extends DAO<Localidad> {

    public LocalidadDAO() throws Exception {
        super(Localidad.class);
    }

    public void cargarDatos() throws Exception {
        if (count() == 0) {

            this.execSQL("src\\main\\sql\\Localidad.sql");
            
//            ProvinciaDAO provinciaDao = new ProvinciaDAO();
//            List<Provincia> provincias = provinciaDao.findAll();
//
//            Localidad cbaCapital = new Localidad();
//            cbaCapital.setNombre("Cordoba");
//            cbaCapital.setProvincia(provincias.get(0));
//            create(cbaCapital);
//
//            Localidad capitalFederal = new Localidad();
//            capitalFederal.setNombre("Capital Federal");
//            capitalFederal.setProvincia(provincias.get(1));
//            create(capitalFederal);
//
//            Localidad jesusMaria = new Localidad();
//            jesusMaria.setNombre("Jesus Maria");
//            jesusMaria.setProvincia(provincias.get(0));
//            create(jesusMaria);
//
//            Localidad colCaroya = new Localidad();
//            colCaroya.setNombre("Colonia Caroya");
//            colCaroya.setProvincia(provincias.get(0));
//            create(colCaroya);
//
//            Localidad laBolsa = new Localidad();
//            laBolsa.setNombre("La Bolsa");
//            laBolsa.setProvincia(provincias.get(0));
//            create(laBolsa);
//
//            Localidad quilmes = new Localidad();
//            quilmes.setNombre("Quilmes");
//            quilmes.setProvincia(provincias.get(1));
//            create(quilmes);
        }
    }

}
