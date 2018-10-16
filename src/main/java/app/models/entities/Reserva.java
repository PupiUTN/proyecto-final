/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.models.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Reserva implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", insertable = false)
    private Date fechaTransaccion;
    @ManyToOne
    @NotNull
    private Cuidador cuidador;
    @ManyToOne
    @NotNull
    private Perro perro;

    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate fechaInicio;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @NotNull
    private LocalDate fechaFin;

    private float precioTotal;

    @NotNull
    private String status;

    @NotNull
    private String mensaje;



    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate fechaAceptacion;

}
