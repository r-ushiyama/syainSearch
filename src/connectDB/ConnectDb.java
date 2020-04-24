package connectDB;

import java.util.HashMap;
import java.util.Map;

public class ConnectDb {
	public static Map<String, String> loadDB(){
		try {
			// JDBCドライバのロード
			Class.forName("oracle.jdbc.driver.OracleDriver");
		} catch (ClassNotFoundException e) {
			// ドライバが設定されていない場合はエラーになります
			throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}
		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "syain_kanri";
		String pass = "syain_kanri";
		Map<String, String> connectinfo = new HashMap<String, String >();
		connectinfo.put("url", url);
		connectinfo.put("user", user);
		connectinfo.put("pass", pass);

		return connectinfo;
	}
}
