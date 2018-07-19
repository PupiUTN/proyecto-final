package app.security;

import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class Encryptor {

    public static String run(String key, String initVector, String value, int cipherMode) {
        try {
            IvParameterSpec iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(cipherMode, skeySpec, iv);

            switch (cipherMode) {
                case Cipher.ENCRYPT_MODE:
                    return Base64.encodeBase64String(cipher.doFinal(value.getBytes()));
                case Cipher.DECRYPT_MODE:
                    return new String(cipher.doFinal(Base64.decodeBase64(value)));
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
