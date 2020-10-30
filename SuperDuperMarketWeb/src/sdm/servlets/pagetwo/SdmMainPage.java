package sdm.servlets.pagetwo;

import logic.users.UserManager;
import sdm.constants.Constants;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/sdmmainpage")
public class SdmMainPage extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final String SDM_MAIN_PAGE_URL = request.getContextPath() + "/pages/sdmmainpage/sdm-main-stores-page.html";

        response.setContentType("text/html;charset=UTF-8");
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        String usernameFromSession = SessionUtils.getUsername(request);
        String userTypeFromSession = SessionUtils.getUserType(request);

        if (usernameFromSession == null || userTypeFromSession == null)
        {
            System.out.println("There is no session");
            response.sendRedirect(request.getContextPath() + "/index.html");
        }
    }


}
