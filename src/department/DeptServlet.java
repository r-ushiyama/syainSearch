package department;

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
 * Servlet implementation class DeptServlet
 */
@WebServlet("/DeptServlet")
public class DeptServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		//一覧表示、追加、編集、削除のどのリクエストかを判断
		String deptId = request.getParameter("deptId");
		String deptName = request.getParameter("deptName");
		String jsRequest = request.getParameter("request");
		//String jsRequest = "depttable";
		String sql = "";

		if(jsRequest.equals("depttable")){
			//一覧表示
			sql = "select \n" +
					"DEPT_ID,  \n" +
					"DEPT_NAME \n" +
					"from \n" +
					"TR_DEPT \n"+
					"order by DEPT_ID";
		}else if(jsRequest.equals("setdeptName")){
			sql = "select \n" +
					"DEPT_ID,  \n" +
					"DEPT_NAME \n" +
					"from \n" +
					"TR_DEPT \n" +
					"where 1=1 \n" +
					"and DEPT_ID = '"+deptId+"' \n";
		}else if(jsRequest.equals("searchAllDept")){
			sql = "select DEPT_ID, DEPT_NAME \n" +
					"from TR_DEPT \n" +
					"where 1=1 \n" +
					"and( \n" +
					"DEPT_ID LIKE '%"+deptId+"%' \n" +
					"or DEPT_NAME LIKE '%"+deptName+"%' \n" +
					") \n" +
					"order by DEPT_ID \n";
		}else{
			System.out.println("リクエストが指定されていません");
		}




		//DBのURL,ID,PASSを取得
		Map<String, String> conInfo = ConnectDb.loadDB();


		try (
			// データベースへ接続します
			Connection con = DriverManager.getConnection(conInfo.get("url"), conInfo.get("user"), conInfo.get("pass"));
			// SQLの命令文を実行するための準備をおこないます
			Statement stmt = con.createStatement();
			// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
			ResultSet rs1 = stmt.executeQuery(sql);
		) {
			List<Dept> deptList = new ArrayList<Dept>();
			// SQL実行結果を保持している変数rsから情報を取得
			while (rs1.next()) {
				Dept dept = new Dept();
				dept.setDeptId(rs1.getString("DEPT_ID"));
				dept.setDeptName(rs1.getString("DEPT_NAME"));
				deptList.add(dept);
			}

			// アクセスした人に応答するためのJSONを用意する
			PrintWriter pw = response.getWriter();

			// JSONで出力する
			pw.append(new ObjectMapper().writeValueAsString(deptList));

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
