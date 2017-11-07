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
public class Direccion implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String direccionLinea1; // Evasio Garrone 7018, Córdoba, Argentina (Autocompletar de google)
    private String direccionLinea2; // Apartamento, unidad, edificio, piso, etc.
    @NotNull
    private Integer numero; // 7018
    @NotNull
    private String calle; // Evasio Garrone
    @NotNull
    private String ciudad; // Córdoba
    @NotNull
    private String ciudadPlaceId; // ChIJaVuPR1-YMpQRkrBmU5pPorA <-- Busqueda
    @NotNull
    private String provincia; // Cordoba
    @NotNull
    private String placeId; // ChIJrz5WfeKeMpQR7ONDwyCZifY
    @NotNull
    private Double latitud; // -31.388186
    @NotNull
    private Double longitud;// -64.275706
    @NotNull
    private String codigoPostal;
    @NotNull
    private String pais;

    /**
     * https://developers.google.com/places/web-service/details
     * https://developers.google.com/maps/documentation/geocoding/intro
     */
}
