/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class Cuidador implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String nombre;
    private String email;
    private long telefono;
    @ManyToOne(cascade = CascadeType.PERSIST)
    //@JoinColumn(name = "ID", referencedColumnName = "ID")
    private Direccion direccion;
    private int cantidadMaxDePerros;
    @OneToMany(cascade = CascadeType.PERSIST) // guarda las imagen
    private List<Imagen> listaImagenes;

    //para jpa, necesito constructor vacio y todos los stegest y getters de cada atributo
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

    
    
    
    

}
