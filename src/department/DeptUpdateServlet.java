package department;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Arrays;
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
 * Servlet implementation class DeptUpdateServlet
 */
@WebServlet("/DeptUpdateServlet")
public class DeptUpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeptUpdateServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession(true);
		String RoleSetting[] = {"マネージャー"};
		if(!Arrays.asList(RoleSetting).contains(session.getAttribute("userRoll"))){
			throw new RuntimeException();
		}
		response.setContentType("text/html; charset=UTF-8");
		//一覧表示、追加、編集、削除のどのリクエストかを判断
		String deptId = request.getParameter("deptId");
		String jsRequest = request.getParameter("request");
		String newName = request.getParameter("newName");
		String newId = request.getParameter("newId");
		//String jsRequest = "depttable";
		String sql = "";
		String excute_message = "";
		if(jsRequest.equals("updateDept")){
			//部署名を編集（アップデート）
			sql = "update TR_DEPT \n" +
					"set DEPT_NAME = '"+newName+"' \n" +
					"where DEPT_ID = '"+deptId+"' \n";
			excute_message = "部署名を"+newName+"に変更しました";
		}else if(jsRequest.equals("createDept")){
			sql = "insert into TR_DEPT \n" +
					"(DEPT_ID, DEPT_NAME) \n" +
					"values('"+newId+"', '"+newName+"') \n";

			excute_message = newName+"を追加しました";
		}else if(jsRequest.equals("deleteDept")){
			sql = "delete from TR_DEPT \n" +
					"where DEPT_ID = '"+deptId+"' \n";
			excute_message = newName+"を削除しました";
		}else{
			throw new RuntimeException();
		}

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

}
