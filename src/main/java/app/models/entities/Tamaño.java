/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.models.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tamaño implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String nombre;
    @NotNull
    private int valorMinimo;
    @NotNull
    private int valorMaximo;


    @Override
    public String toString() {
        return "Tamaño{" + "id=" + id + ", nombre=" + nombre + ", valorMinimo=" + valorMinimo + ", valorMaximo=" + valorMaximo + '}';
    }

}
