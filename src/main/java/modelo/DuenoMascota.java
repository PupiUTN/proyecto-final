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
public class DuenoMascota implements Serializable {

    @Id
    private Long id;
    private String nombre;

    //para jpa, necesito constructor vacio y todos los stegest y getters de cada atributo
    public DuenoMascota() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
