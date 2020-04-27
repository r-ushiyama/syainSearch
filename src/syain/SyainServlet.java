package syain;

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
				//一覧表示、追加、編集、削除のどのリクエストかを判断
				String syainId = request.getParameter("syainId");
				String jsRequest = request.getParameter("request");
				String syainName = request.getParameter("syainName");
				String syainDeptName = request.getParameter("syainDeptName");

				//String jsRequest = "syaintable";
				String sql = "";

				if(jsRequest.equals("syaintable")){
					//一覧表示
					sql = "select \n" +
							"* \n" +
							"from \n" +
							"TR_SYAIN,TR_DEPT \n" +
							"where TR_SYAIN.DEPT_ID = TR_DEPT.DEPT_ID \n"+
							"order by ID \n";
				}else if(jsRequest.equals("setsyainInfo")){
					sql = "select TR_DEPT.DEPT_NAME,TR_SYAIN.DEPT_ID,ID,NAME,AGE,SEX,PHOTO_ID,JOIN_DATE,LEAVE_DATE,ZIP,PREFECTURE,ADDRESS \n" +
							"from TR_SYAIN,TR_DEPT \n" +
							"where 1=1 \n" +
							"and ID='"+syainId+"' \n" +
							"and TR_SYAIN.DEPT_ID = TR_DEPT.DEPT_ID \n";
				}else if(jsRequest.equals("searchSyain")){
					sql = "select TR_DEPT.DEPT_NAME,TR_SYAIN.DEPT_ID,ID,NAME,AGE,SEX,PHOTO_ID,JOIN_DATE,LEAVE_DATE,ZIP,PREFECTURE,ADDRESS \n" +
							"from TR_SYAIN,TR_DEPT \n" +
							"where 1=1 \n" +
							"and TR_DEPT.DEPT_NAME LIKE '%"+syainDeptName+"%' \n" +
							"and TR_SYAIN.ID LIKE '%"+syainId+"%' \n" +
							"and TR_SYAIN.NAME LIKE '%"+syainName+"%' \n" +
							"and TR_SYAIN.DEPT_ID = TR_DEPT.DEPT_ID \n";

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
					List<Syain> syainList = new ArrayList<Syain>();
					// SQL実行結果を保持している変数rsから情報を取得
					while (rs1.next()) {
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

						syainList.add(syain);
					}

					// アクセスした人に応答するためのJSONを用意する
					PrintWriter pw = response.getWriter();

					// JSONで出力する
					pw.append(new ObjectMapper().writeValueAsString(syainList));

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
