/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.models.entities;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

@Entity
public class Perro implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @ManyToOne
    private User user;
    @NotNull
    private String nombre;
    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull
    private Raza raza;
    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull
    private Tamaño tamaño;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Vacuna> listaVacunas;
    @NotNull
    @NotEmpty
    private String fotoPerfil;
    @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.EAGER)
    private Set<Imagen> listaImagenes;
    private String comentario;
    @NotNull
    private String sexo;
    @NotNull
    private String birthday;


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


    public String getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public Set<Vacuna> getListaVacunas() {
        return listaVacunas;
    }

    public void setListaVacunas(Set<Vacuna> listaVacunas) {
        this.listaVacunas = listaVacunas;
    }

    public Set<Imagen> getListaImagenes() {
        return listaImagenes;
    }

    public void setListaImagenes(Set<Imagen> listaImagenes) {
        this.listaImagenes = listaImagenes;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
}
