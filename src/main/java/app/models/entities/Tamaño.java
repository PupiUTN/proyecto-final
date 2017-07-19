/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.models.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Tamaño implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private char nombre;
    private int valorMinimo;
    private int valorMaximo;

    //para jpa, necesito constructor vacio y todos los stegest y getters de cada atributo
    public Tamaño() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public char getNombre() {
        return nombre;
    }

    public void setNombre(char nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "Tamaño{" + "id=" + id + ", nombre=" + nombre + ", valorMinimo=" + valorMinimo + ", valorMaximo=" + valorMaximo + '}';
    }

}
