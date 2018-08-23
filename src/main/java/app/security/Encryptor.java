package app.security;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Service
public class Encryptor {

    @Value("${app.mp.pupi.encryptKey}")
    private String KEY;

    @Value("${app.mp.pupi.encryptVector}")
    private String VECTOR;

    public String run(String value, int cipherMode) {
        try {
            IvParameterSpec iv = new IvParameterSpec(VECTOR.getBytes(StandardCharsets.UTF_8));
            SecretKeySpec skeySpec = new SecretKeySpec(KEY.getBytes(StandardCharsets.UTF_8), "AES");
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
