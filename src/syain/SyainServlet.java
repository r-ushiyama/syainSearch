package syain;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
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
 * Servlet implementation class SyainServlet
 */
@WebServlet("/SyainServlet")
public class SyainServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public SyainServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
				response.setContentType("text/html; charset=UTF-8");
				Map<String, String> ParamFromHttp = getParameterFromHttp(request);

				List<Syain> syainList = selectSyainFromDB(ParamFromHttp.get("syainId"), ParamFromHttp.get("syainName"),
						ParamFromHttp.get("syainDeptName"), ParamFromHttp.get("jsRequest"), ParamFromHttp.get("searchData"));

				// アクセスした人に応答するためのJSONを用意する
				PrintWriter pw = response.getWriter();

				// JSONで出力する
				pw.append(new ObjectMapper().writeValueAsString(syainList));

	}

	private Map<String, String> getParameterFromHttp(HttpServletRequest request){
		Map<String, String> ParamFromHttp = new HashMap<String, String>();
		ParamFromHttp.put("syainId" , request.getParameter("syainId"));
		ParamFromHttp.put("syainName" , request.getParameter("syainName"));
		ParamFromHttp.put("syainDeptName" , request.getParameter("syainDeptName"));
		ParamFromHttp.put("jsRequest" , request.getParameter("request"));
		ParamFromHttp.put("searchData" , request.getParameter("searchData"));
		return ParamFromHttp;
	}

	private List<Syain> selectSyainFromDB(String syainId, String syainName, String syainDeptName, String jsRequest, String searchData) {
		//実行するSQL文を決定
		String sql  = defineSqlByRequest(syainId, syainName, syainDeptName, jsRequest, searchData);

		//DBのURL,ID,PASSを取得
		Map<String, String> conInfo = ConnectDb.loadDB();

		//SQL実行
		return excuteSql(sql, conInfo);
	}

	private List<Syain> excuteSql(String sql, Map<String, String> conInfo) {
		try (
			// データベースへ接続します
			Connection con = DriverManager.getConnection(conInfo.get("url"), conInfo.get("user"), conInfo.get("pass"));
			// SQLの命令文を実行するための準備をおこないます
			Statement stmt = con.createStatement();
			// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
			ResultSet rs1 = stmt.executeQuery(sql);
		) {
			List<Syain> syainList = retrieveSyainList(rs1);
			return syainList;
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}finally{

		}
	}

	private List<Syain> retrieveSyainList(ResultSet rs1) throws SQLException {
		List<Syain> syainList = new ArrayList<Syain>();
		// SQL実行結果を保持している変数rsから情報を取得
		while (rs1.next()) {
			Syain syain = retrieveSyain(rs1);
			syainList.add(syain);
		}
		return syainList;
	}

	private Syain retrieveSyain(ResultSet rs1) throws SQLException {
		Syain syain = new Syain();
		syain.setSyainDeptName(rs1.getString("DEPT_NAME"));
		syain.setSyainId(rs1.getString("ID"));
		syain.setSyainName(rs1.getString("NAME"));
		syain.setSyainDeptId(rs1.getString("DEPT_ID"));
		syain.setSyainAge(rs1.getInt("AGE"));
		syain.setSyainSex(rs1.getString("SEX"));
		syain.setSyainZip(rs1.getString("ZIP"));
		syain.setSyainPrefecture(rs1.getString("PREFECTURE"));
		syain.setSyainAddress(rs1.getString("ADDRESS"));
		syain.setSyainPhotoId(rs1.getString("PHOTO_ID"));
		syain.setSyainJoinDate(rs1.getString("JOIN_DATE"));
		syain.setSyainLeaveDate(rs1.getString("LEAVE_DATE"));
		return syain;
	}

	private String defineSqlByRequest(String syainId, String syainName, String syainDeptName, String jsRequest, String searchData) {
		String sql = "";
		if(jsRequest.equals("syaintable")){
			//一覧表示
			sql = createSelectAllSyainSql();
		}else if(jsRequest.equals("setsyainInfo")){
			sql = createSelectSyainByIdSql(syainId);
		}else if(jsRequest.equals("searchSyain")){
			sql = someMethod(syainId, syainName, syainDeptName);
		}else if(jsRequest.equals("searchAllSyain")){
			sql= All(searchData);
		}
		return sql;
	}

	private String All(String searchData) {
		return "select TR_DEPT.DEPT_NAME,TR_SYAIN.DEPT_ID,ID,NAME,AGE,SEX,PHOTO_ID,JOIN_DATE,LEAVE_DATE,ZIP,PREFECTURE,ADDRESS  \n" +
				"from TR_SYAIN,TR_DEPT  \n" +
				"where TR_SYAIN.DEPT_ID = TR_DEPT.DEPT_ID \n" +
				"and( \n" +
				"TR_DEPT.DEPT_NAME LIKE '%"+searchData+"%'  \n" +
				"or TR_SYAIN.ID LIKE '%"+searchData+"%'  \n" +
				"or TR_SYAIN.NAME LIKE '%"+searchData+"%'  \n" +
				") order by ID \n";
	}

	private String someMethod(String syainId, String syainName, String syainDeptName) {
		return "select TR_DEPT.DEPT_NAME,TR_SYAIN.DEPT_ID,ID,NAME,AGE,SEX,PHOTO_ID,JOIN_DATE,LEAVE_DATE,ZIP,PREFECTURE,ADDRESS \n" +
				"from TR_SYAIN,TR_DEPT \n" +
				"where 1=1 \n" +
				"and TR_DEPT.DEPT_NAME LIKE '%"+syainDeptName+"%' \n" +
				"and TR_SYAIN.ID LIKE '%"+syainId+"%' \n" +
				"and TR_SYAIN.NAME LIKE '%"+syainName+"%' \n" +
				"and TR_SYAIN.DEPT_ID = TR_DEPT.DEPT_ID \n";
	}

	private String createSelectSyainByIdSql(String syainId) {
		return "select TR_DEPT.DEPT_NAME,TR_SYAIN.DEPT_ID,ID,NAME,AGE,SEX,PHOTO_ID,JOIN_DATE,LEAVE_DATE,ZIP,PREFECTURE,ADDRESS \n" +
				"from TR_SYAIN,TR_DEPT \n" +
				"where 1=1 \n" +
				"and ID='"+syainId+"' \n" +
				"and TR_SYAIN.DEPT_ID = TR_DEPT.DEPT_ID \n";
	}

	private String createSelectAllSyainSql() {
		return "select \n" +
				"* \n" +
				"from \n" +
				"TR_SYAIN,TR_DEPT \n" +
				"where TR_SYAIN.DEPT_ID = TR_DEPT.DEPT_ID \n"+
				"order by ID \n";
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
