package app.security;


import org.apache.commons.codec.binary.Base64;

public class TokenCrypto {

    /**
     * Codifica un texto usando Base64.
     * @param value <code>String</code> texto a codificar.
     * @return <code>String</code> texto codificado.
     */
    public static String encrypt(String value) {
        return new String(Base64.encodeBase64(value.getBytes()));
    }

    /**
     * Decodifica un texto usando Base64.
     * @param value <code>String</code> texto a decodificar.
     * @return <code>String</code> texto decodificado.
     */
    public static String decrypt(String value) {
        return new String(Base64.decodeBase64(value.getBytes()));
    }
}
