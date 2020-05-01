package syain;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import connectDB.ConnectDb;

/**
 * Servlet implementation class SyainUpdateServlet
 */
@WebServlet("/SyainUpdateServlet")
public class SyainUpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public SyainUpdateServlet() {
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
		// 1 リクエストパラメータの受け取り
		// 2 DBからのデータの取得
		// 3 レスポンスを返す


		response.setContentType("text/html; charset=UTF-8");
		//一覧表示、追加、編集、削除のどのリクエストかを判断
		String jsRequest = request.getParameter("request");
		String oldsyainId = request.getParameter("oldsyainId");
		String newsyainId = request.getParameter("newsyainId");
		String syainName = request.getParameter("syainName");
		String syainAge = request.getParameter("syainAge");
		String syainSex = request.getParameter("syainSex");
		String syainPhotoId = request.getParameter("syainPhotoId");
		String syainZip = request.getParameter("syainZip");
		String syainPref = request.getParameter("syainPref");
		String syainAddress = request.getParameter("syainAddress");
		String syainDeptName = request.getParameter("syainDeptName");
		String syainJoinDate = request.getParameter("syainJoinDate");
		String syainLeaveDate = request.getParameter("syainLeaveDate");


		String sql = "";
		String excute_message = "";

		if(jsRequest.equals("updateSyainInfo")){
			//部署名を編集（アップデート）
			sql = "update TR_SYAIN\n" +
					"set \n" +
					"TR_SYAIN.DEPT_ID=( \n" +
					"	select TR_DEPT.DEPT_ID\n" +
					"	from TR_DEPT\n" +
					"	where 1=1 \n" +
					"	and TR_DEPT.DEPT_NAME='"+syainDeptName+"' \n" + //syainDeptName
					"), \n" +
					"TR_SYAIN.ID='"+newsyainId+"', \n" +
					"TR_SYAIN.NAME='"+syainName+"', \n" +
					"TR_SYAIN.AGE='"+syainAge+"', \n" +
					"TR_SYAIN.SEX='"+syainSex+"', \n" +
					"TR_SYAIN.PHOTO_ID='"+syainPhotoId+"', \n" +
					"TR_SYAIN.JOIN_DATE='"+syainJoinDate+"', \n" +
					"TR_SYAIN.LEAVE_DATE='"+syainLeaveDate+"', \n" +
					"TR_SYAIN.ZIP='"+syainZip+"', \n" +
					"TR_SYAIN.PREFECTURE='"+syainPref+"',\n" +
					"TR_SYAIN.ADDRESS='"+syainAddress+"' \n" +
					"where TR_SYAIN.ID='"+oldsyainId+"' \n"; //oldsyainId
			excute_message = "社員情報を変更しました";

		}

		else if(jsRequest.equals("createSyain")){
			sql = "insert into TR_SYAIN \n" +
					"(ID, NAME, AGE, SEX, PHOTO_ID, DEPT_ID, JOIN_DATE, LEAVE_DATE, ZIP, PREFECTURE, ADDRESS) \n" +
					"select '"+newsyainId+"', '"+syainName+"', '"+syainAge+"', '"+syainSex+"', '"+syainPhotoId+"', TR_DEPT.DEPT_ID,'"+syainJoinDate+"', '"+syainLeaveDate+"', "
							+ "'"+syainZip+"', '"+syainPref+"', '"+syainAddress+"' \n" +
					"from TR_DEPT \n" +
					"where TR_DEPT.DEPT_NAME='"+syainDeptName+"' \n";
			excute_message = "社員情報を追加しました";
		}else if(jsRequest.equals("deleteSyain")){
			sql = "delete from TR_SYAIN \n" +
					"where TR_SYAIN.ID = '"+oldsyainId+"' \n";
			excute_message = "社員情報を削除しました";
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
