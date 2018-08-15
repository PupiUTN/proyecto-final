/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.models.entities;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Cuidador implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int cantidadMaxDePerros;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Imagen> listaImagenes;
    private String descripcion;
    private float precioPorNoche;
    @OneToOne(cascade = CascadeType.MERGE)
    private User user;
    @ManyToMany
    private List<Servicio> listaServicios;
    @OneToOne
    private Tamaño tamaño;
    //pending, approved, rejected, down
    private String estado;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Imagen> dniImagenes;
    private int dni;
    private int cantidadReviews;
    private int promedioReviews;
    private int cantidadVisitas;
    @Transient
    private double ponderacion;


    @Override
    public boolean equals(Object o) {
        Cuidador oCuidador = (Cuidador) o;
        return this.id == oCuidador.id;
    }

    @Override
    public String toString() {
        return "Cuidador{" +
                "id=" + id +
                ", cantidadMaxDePerros=" + cantidadMaxDePerros +
                ", listaImagenes=" + listaImagenes +
                ", descripcion='" + descripcion + '\'' +
                ", precioPorNoche=" + precioPorNoche +
                ", user=" + user +
                ", listaServicios=" + listaServicios +
                ", tamaño=" + tamaño +
                ", estado='" + estado + '\'' +
                ", dniImagenes=" + dniImagenes +
                ", dni=" + dni +
                '}';
    }
}
