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
    private String nombre;
    private String email;
    private long telefono;
    @OneToOne(cascade = CascadeType.ALL)
    private Direccion direccion;
    private int cantidadMaxDePerros;
    @OneToMany(cascade = CascadeType.ALL) // guarda las imagen
    private List<Imagen> listaImagenes;

    public Cuidador() {
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getTelefono() {
        return telefono;
    }

    public void setTelefono(long telefono) {
        this.telefono = telefono;
    }

    public Direccion getDireccion() {
        return direccion;
    }

    public void setDireccion(Direccion direccion) {
        this.direccion = direccion;
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


    @Override
    public String toString() {
        return "Cuidador{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", email='" + email + '\'' +
                ", telefono=" + telefono +
                ", direccion=" + direccion +
                ", cantidadMaxDePerros=" + cantidadMaxDePerros +
                ", listaImagenes=" + listaImagenes +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        Cuidador oCuidador = (Cuidador) o;
        if (this.nombre != oCuidador.nombre) return false;
        if (this.telefono != oCuidador.telefono) return false;
        return true;
    }
}
