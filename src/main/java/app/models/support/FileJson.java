package app.models.support;

/**
 * Created by agile on 27/05/17.
 */
public class FileJson {

    public static final String FILE= "file";
    public static final String DIR= "dir";


    String tipoDeArchivo;
    String ulr;

    public FileJson(String tipoDeArchivo, String ulr) {
        this.tipoDeArchivo = tipoDeArchivo;
        this.ulr = ulr;
    }

    public String getTipoDeArchivo() {
        return tipoDeArchivo;
    }

    public void setTipoDeArchivo(String tipoDeArchivo) {
        this.tipoDeArchivo = tipoDeArchivo;
    }


    public String getUlr() {
        return ulr;
    }

    public void setUlr(String ulr) {
        this.ulr = ulr;
    }
}
