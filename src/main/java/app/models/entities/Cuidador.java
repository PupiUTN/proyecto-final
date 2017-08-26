/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.models.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class Cuidador implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int cantidadMaxDePerros;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Imagen> listaImagenes;
    private String descripcion;
    private float precioPorNoche;
    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Servicio> listaServicios;


    public Cuidador() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public int getCantidadMaxDePerros() {
        return cantidadMaxDePerros;
    }

    public void setCantidadMaxDePerros(int CantidadMaxDePerros) {
        this.cantidadMaxDePerros = CantidadMaxDePerros;
    }

    public List<Imagen> getListaImagenes() {
        return listaImagenes;
    }

    public void setListaImagenes(List<Imagen> listaImagenes) {
        this.listaImagenes = listaImagenes;
    }

    public String getDescripcio() {
        return descripcion;
    }

    public void SetDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public float getPrecioPorNoche() {
        return precioPorNoche;
    }

    public void SetPrecio(float precio) {
        this.precioPorNoche = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setPrecioPorNoche(float precioPorNoche) {
        this.precioPorNoche = precioPorNoche;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    @Override
    public boolean equals(Object o) {
        Cuidador oCuidador = (Cuidador) o;
        if (this.id != oCuidador.id) return false;
        return true;
    }
}
