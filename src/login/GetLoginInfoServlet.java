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
		Map <String, String> responseData = new HashMap<>();

		response.setContentType("text/html;charset=UTF-8");
		HttpSession session = request.getSession(true);
		String status = (String) session.getAttribute("userId");
		String loginRequest = request.getParameter("loginRequest");
		PrintWriter pw = response.getWriter();

		if(status == null) {
			responseData.put("json", "NEEDLOGIN");
		}else {
			if (loginRequest != null && loginRequest.equals("logout")){
				session.removeAttribute("userId");
				session.removeAttribute("userName");
				session.removeAttribute("userRoll");
				responseData.put("json", "LOGOUT");
			}else {
				responseData.put("userId", (String) session.getAttribute("userId"));
				responseData.put("userName", (String) session.getAttribute("userName"));
				responseData.put("userRoll", (String) session.getAttribute("userRoll"));
			}
		}
		pw.append(new ObjectMapper().writeValueAsString(responseData));
	}

}
