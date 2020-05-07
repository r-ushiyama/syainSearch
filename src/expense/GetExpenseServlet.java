package expense;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import connectDB.ConnectDb;

/**
 * Servlet implementation class GetExpenseServlet
 */
@WebServlet("/GetExpenseServlet")
public class GetExpenseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetExpenseServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		//一覧表示、追加、編集、削除のどのリクエストかを判断
		String jsReq = request.getParameter("expId");
		//String jsRequest = "depttable";
		String sql = "";
		if(jsReq.equals("all")){
			sql = "select EXPENSE_ID, REQ_DATE, APP_NAME, TITLE, PAYEE, AMOUNT,  \n" +
					"	UPDATE_DATE, UPDATE_NAME, STATUS, REASON, DENY_REASON \n" +
					"from TR_EXPENSE order by UPDATE_DATE desc\n";
		}else{
			sql = "select EXPENSE_ID, REQ_DATE, APP_NAME, TITLE, PAYEE, AMOUNT,  \n" +
					"	UPDATE_DATE, UPDATE_NAME, STATUS, REASON, DENY_REASON \n" +
					"from TR_EXPENSE where EXPENSE_ID='"+jsReq+"' order by EXPENSE_ID\n";
		}


		//DBのURL,ID,PASSを取得
		Map<String, String> conInfo = ConnectDb.loadDB();

		System.out.println(sql);
		try (
			// データベースへ接続します
			Connection con = DriverManager.getConnection(conInfo.get("url"), conInfo.get("user"), conInfo.get("pass"));
			// SQLの命令文を実行するための準備をおこないます
			Statement stmt = con.createStatement();
			// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
			ResultSet rs1 = stmt.executeQuery(sql);
		) {
			List<Expense> expList = new ArrayList<Expense>();
			// SQL実行結果を保持している変数rsから情報を取得
			while (rs1.next()) {
				Expense exp = new Expense();
				exp.setExpenseId(rs1.getString("EXPENSE_ID"));
				exp.setReqDate(rs1.getString("REQ_DATE"));
				exp.setAppName(rs1.getString("APP_NAME"));
				exp.setTitle(rs1.getString("TITLE"));
				exp.setPayee(rs1.getString("PAYEE"));
				exp.setAmount(rs1.getString("AMOUNT"));
				exp.setUpdateDate(rs1.getString("UPDATE_DATE"));
				exp.setUpdateName(rs1.getString("UPDATE_NAME"));
				exp.setStatus(rs1.getString("STATUS"));
				exp.setReason(rs1.getString("REASON"));
				exp.setDenyReason(rs1.getString("DENY_REASON"));
				expList.add(exp);
			}

			// アクセスした人に応答するためのJSONを用意する
			PrintWriter pw = response.getWriter();

			// JSONで出力する
			pw.append(new ObjectMapper().writeValueAsString(expList));

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
