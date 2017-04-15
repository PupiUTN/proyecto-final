/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class Califiacion implements Serializable  {
    @Id
    private Long id;
    private int puntaje;
    private String comentario;

    //para jpa, necesito constructor vacio y todos los stegest y getters de cada atributo
    public Califiacion() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    
    
    
}
