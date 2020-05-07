package login;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import connectDB.ConnectDb;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    // Servlet 初期化パラメータ情報
	    String userId = request.getParameter("userId");
	    String password = Hmac.getHmac(request.getParameter("password"));
	    System.out.println(password);
	    PrintWriter pw = response.getWriter();
	   // String Id = "admin";
	    //String Pass = "admin";
	    System.out.println(userId+password);
	    //PrintWriter pw = response.getWriter();
	    response.setContentType("text/html; charset=shift-jis");

//	    String sql="select TR_SYAIN.ID ,TR_SYAIN.NAME, TR_AUTH.ROLL \n" +
//	    		"from TR_AUTH \n" +
//	    		",TR_SYAIN \n" +
//	    		"where 1=1 \n" +
//	    		"and TR_AUTH.ID=TR_SYAIN.ID \n" +
//	    		"and TR_AUTH.ID='"+userId+"' \n" +
//	    		"and TR_AUTH.PASS='"+password+"' \n";

	    Map<String, String> conInfo = ConnectDb.loadDB();

	    Map <String, String> responseData = new HashMap<>();
		// DBへ接続してSQLを実行
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(conInfo.get("url"), conInfo.get("user"), conInfo.get("pass"));
				// SQLの命令文を実行するための準備をおこないます
				//Statement stmt = con.createStatement();
				PreparedStatement stmt = createPreparedStatement(con, userId, password);
				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				//ResultSet rs1 = stmt.executeQuery(sql);
				ResultSet rs1 = stmt.executeQuery();
			) {
				//ユーザIDとパスワードが一致しているとき
				if (rs1.next()) {
					HttpSession session = request.getSession(true);
					//セッションオブジェクトに保存する
					String userName = rs1.getString("NAME");
					String userRoll = rs1.getString("ROLL");
				    session.setAttribute("userId", userId);
				    session.setAttribute("userName", userName);
				    session.setAttribute("userRoll", userRoll);

				    System.out.println("ログインしました");
				    responseData.put("result", "OK");
				}else{
					System.out.println("NG パスワードまたはユーザー名が違います");
					responseData.put("result", "NG");
				}
				// JSONで出力する
				pw.append(new ObjectMapper().writeValueAsString(responseData));

			} catch (Exception e) {
				throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
			}

	  }

	private PreparedStatement createPreparedStatement(Connection con, String userId, String password) throws
		SQLException {
		// 実行するSQL文
	    String sql="select TR_SYAIN.ID ,TR_SYAIN.NAME, TR_AUTH.ROLL \n" +
	    		"from TR_AUTH \n" +
	    		",TR_SYAIN \n" +
	    		"where 1=1 \n" +
	    		"and TR_AUTH.ID=TR_SYAIN.ID \n" +
	    		"and TR_AUTH.ID=? \n" +
	    		"and TR_AUTH.PASS=? \n";
		PreparedStatement stmt = con.prepareStatement(sql);
		stmt.setString(1, userId);
		stmt.setString(2, password);
		return stmt;
	}
	}

