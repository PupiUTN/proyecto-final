/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.models.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
public class Perro implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @ManyToOne
    private Owner owner;
    @NotNull
    private String nombre;
    @ManyToOne
    @NotNull
    private Raza raza;
    @ManyToOne
    @NotNull
    private Tamaño tamaño;
    @OneToMany
    @NotNull
    private List<Vacuna> vacunacionList;
    @NotNull
    private Imagen fotoPerfil;
    private String comentario;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Raza getRaza() {
        return raza;
    }

    public void setRaza(Raza raza) {
        this.raza = raza;
    }

    public Tamaño getTamaño() {
        return tamaño;
    }

    public void setTamaño(Tamaño tamaño) {
        this.tamaño = tamaño;
    }

    public List<Vacuna> getVacunacionList() {
        return vacunacionList;
    }

    public void setVacunacionList(List<Vacuna> vacunacionList) {
        this.vacunacionList = vacunacionList;
    }

    public Imagen getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(Imagen fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Perro{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", raza=" + raza +
                ", tamaño=" + tamaño +
                ", vacunacionList=" + vacunacionList +
                ", fotoPerfil=" + fotoPerfil +
                ", comentario='" + comentario + '\'' +
                '}';
    }
}
