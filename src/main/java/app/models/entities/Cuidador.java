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
    @OneToOne
    private User user;
    @OneToMany
    private List<Servicio> listaServicios;
    @OneToOne
    private  Tamaño tamaño;
    //pending, approved, rejected, down
    private String estado;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Imagen> dniImagenes;

    private int dni;



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

    public List<Servicio> getListaServicios() {
        return listaServicios;
    }

    public void setListaServicios(List<Servicio> listaServicios) {
        this.listaServicios = listaServicios;
    }

    public Tamaño getTamaño() {
        return tamaño;
    }

    public void setTamaño(Tamaño tamaño) {
        this.tamaño = tamaño;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public List<Imagen> getDniImagenes() {
        return dniImagenes;
    }

    public void setDniImagenes(List<Imagen> dniImagenes) {
        this.dniImagenes = dniImagenes;
    }

    public int getDni() {
        return dni;
    }

    public void setDni(int dni) {
        this.dni = dni;
    }

    @Override
    public boolean equals(Object o) {
        Cuidador oCuidador = (Cuidador) o;
        if (this.id != oCuidador.id) return false;
        return true;
    }
}
