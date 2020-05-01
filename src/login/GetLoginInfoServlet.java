package login;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class GetLoginInfoServlet
 */
@WebServlet("/GetLoginInfoServlet")
public class GetLoginInfoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetLoginInfoServlet() {
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
		/*response.setContentType("text/html; charset=shift-jis");
		HttpSession session = request.getSession(false);
		PrintWriter pw = response.getWriter();
		Map <String, String> responseData = new HashMap<>();

		System.out.println("connected");

	    //セッションオブジェクトの獲得確認
	    if (session == null || session.getAttribute("username") == null || session.getAttribute("username") == "undefined") {
	     //セッションが取得できなければエラー
	    	responseData.put("json", "NG");
		    pw.append(new ObjectMapper().writeValueAsString(responseData));
	    } else {
	     //セッションが取得できた場合はリストを表示
	     System.out.println(session.getAttribute("username") + "さん");
	     responseData.put("userName", (String) session.getAttribute("username"));

	   	// JSONで出力する
	      pw.append(new ObjectMapper().writeValueAsString(responseData));
	    }*/
		Map <String, String> responseData = new HashMap<>();
		response.setContentType("text/html;charset=UTF-8");
		HttpSession session = request.getSession(true);
		String status = (String) session.getAttribute("userId");
		String loginRequest = request.getParameter("loginRequest");
		System.out.println(loginRequest);
		PrintWriter pw = response.getWriter();
		if(status == null) {
			if(loginRequest != null &&  loginRequest.equals("login")) {
				session.setAttribute("userId",(String) session.getAttribute("userId"));
				session.setAttribute("userName",(String) session.getAttribute("userName"));
				session.setAttribute("userRoll",(String) session.getAttribute("userRoll"));
				//pw.append(new ObjectMapper().writeValueAsString("ログイン完了。"));
			}else {
				//pw.append(new ObjectMapper().writeValueAsString("ログインして下さい。"));
				responseData.put("json", "NEEDLOGIN");
			}
		}else {
			if (loginRequest != null && loginRequest.equals("logout")){
				session.removeAttribute("userId");
				session.removeAttribute("userName");
				session.removeAttribute("userRoll");
				System.out.println(session.getAttribute("userId"));
				//pw.append(new ObjectMapper().writeValueAsString("ログアウト完了。"));
				responseData.put("json", "LOGOUT");
			}else {
				//pw.append(new ObjectMapper().writeValueAsString("ログイン済み"));
				responseData.put("userId", (String) session.getAttribute("userId"));
				responseData.put("userName", (String) session.getAttribute("userName"));
				responseData.put("userRoll", (String) session.getAttribute("userRoll"));
			}
		}
		pw.append(new ObjectMapper().writeValueAsString(responseData));
	}

}
