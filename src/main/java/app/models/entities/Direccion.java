/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.models.entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Direccion implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String direccionLinea1; // Evasio Garrone 7018, Córdoba, Argentina (Autocompletar de google)
    private String direccionLinea2; // Apartamento, unidad, edificio, piso, etc.
    private Integer numero; // 7018
    private String calle; // Evasio Garrone
    private String ciudad; // Córdoba
    private String ciudadPlaceId; // ChIJaVuPR1-YMpQRkrBmU5pPorA <-- Busqueda
    private String departamento; // Capital
    private String provincia; // Cordoba
    private String placeId; // ChIJrz5WfeKeMpQR7ONDwyCZifY
    private Double latitud; // -31.388186
    private Double longitud;// -64.275706
    private String codigoPostal;
    private String pais;

    /**
     * https://developers.google.com/places/web-service/details
     * https://developers.google.com/maps/documentation/geocoding/intro
     */
    public Direccion() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDireccionLinea1() {
        return direccionLinea1;
    }

    public void setDireccionLinea1(String direccionLinea1) {
        this.direccionLinea1 = direccionLinea1;
    }

    public String getDireccionLinea2() {
        return direccionLinea2;
    }

    public void setDireccionLinea2(String direccionLinea2) {
        this.direccionLinea2 = direccionLinea2;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getCiudadPlaceId() {
        return ciudadPlaceId;
    }

    public void setCiudadPlaceId(String ciudadPlaceId) {
        this.ciudadPlaceId = ciudadPlaceId;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }


    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }
}
