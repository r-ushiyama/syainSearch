package login;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class Hmac {

	        public static void main(String pass) {

	        }

	        public static String getHmac(String pass){
                String algo = "HmacSHA256";
                try {
                        String plaintext = pass;
                        String secret = "r-ushiyama";
                        SecretKeySpec sk = new SecretKeySpec(secret.getBytes(), algo);
                        Mac mac = Mac.getInstance(algo);
                        mac.init(sk);

                        byte[] mac_bytes = mac.doFinal(plaintext.getBytes());

                        StringBuilder sb = new StringBuilder(2 * mac_bytes.length);
                        for(byte b: mac_bytes) {
                                sb.append(String.format("%02x", b&0xff) );
                        }
                        return sb.toString();

                } catch (NoSuchAlgorithmException e) {
                        e.printStackTrace();
                } catch (InvalidKeyException e) {
                        e.printStackTrace();
                }
				return null;
	        }

}
