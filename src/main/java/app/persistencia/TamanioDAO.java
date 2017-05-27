/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.persistencia;

import app.modelo.entidades.Tamanio;

/**
 *
 * @author agile
 */
public class TamanioDAO extends DAO<Tamanio> {

    public TamanioDAO() throws Exception {
                super(Tamanio.class);
    }

    public void cargarDatos() {
        if (count() == 0) {

            Tamanio tamanioS = new Tamanio();
            tamanioS.setNombre('S');
            Tamanio tamanioM = new Tamanio();
            tamanioM.setNombre('M');
            Tamanio tamanioL = new Tamanio();
            tamanioL.setNombre('L');

            create(tamanioS);
            create(tamanioM);
            create(tamanioL);

        }

    }

}
