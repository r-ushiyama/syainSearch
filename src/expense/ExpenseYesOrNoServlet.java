package expense;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import connectDB.ConnectDb;

/**
 * Servlet implementation class ExpenseYesOrNoServlet
 */
@WebServlet("/ExpenseYesOrNoServlet")
public class ExpenseYesOrNoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public ExpenseYesOrNoServlet() {
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

		response.setContentType("text/html; charset=UTF-8");
		//一覧表示、追加、編集、削除のどのリクエストかを判断
		String expId = request.getParameter("expId");
		String userName = request.getParameter("userName");
		String jsReq = request.getParameter("request");
		String denyReason = request.getParameter("deny_reason");
		//String jsRequest = "depttable";
		String sql = "";
		String excute_message = "";
		String time = toStr(LocalDateTime.now(), "yyyy-MM-dd");
		System.out.println(expId+userName+jsReq);


		if(jsReq.equals("confirm")){
			//部署名を編集（アップデート）
			sql = "update TR_EXPENSE \n" +
					"set UPDATE_DATE = '"+time+"', \n" +
					"	UPDATE_NAME = '"+userName+"', \n" +
					"	STATUS = '1' \n" +
					"where EXPENSE_ID = '"+expId+"' \n";
		}else if(jsReq.equals("deny")){
			sql = "update TR_EXPENSE \n" +
					"set UPDATE_DATE = '"+time+"', \n" +
					"	UPDATE_NAME = '"+userName+"', \n" +
					"	STATUS = '2', \n" +
					"DENY_REASON = '"+denyReason+"' \n" +
					"where EXPENSE_ID = '"+expId+"' \n";
		}

		System.out.println(sql);

		//DBのURL,ID,PASSを取得
		Map<String, String> conInfo = ConnectDb.loadDB();


		try (
			// データベースへ接続します
			Connection con = DriverManager.getConnection(conInfo.get("url"), conInfo.get("user"), conInfo.get("pass"));
			// SQLの命令文を実行するための準備をおこないます
			Statement stmt = con.createStatement();
			// SQLの命令文を実行し、その結果をResultSet型のrsに代入します

		) {

			@SuppressWarnings("unused")
			int rs1 = stmt.executeUpdate(sql);

			// アクセスした人に応答するためのJSONを用意する
			PrintWriter pw = response.getWriter();

			// JSONで出力する
			pw.append(new ObjectMapper().writeValueAsString(excute_message));

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}
	}

	private String toStr(LocalDateTime localDateTime, String format) {
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(format);
        return localDateTime.format(dateTimeFormatter);
	}

}
