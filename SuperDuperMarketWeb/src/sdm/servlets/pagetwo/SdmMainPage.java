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

//@WebServlet(name = "SdmMainPage", urlPatterns = {"/pages/sdmmainpage/sdmmainpage"})
@WebServlet("/sdmmainpage")
public class SdmMainPage extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("POST");
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("GET");

        processRequest(request,response);
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final String SDM_MAIN_PAGE_URL = request.getContextPath() + "/pages/sdmmainpage/sdm-main-stores-page.html";

        response.setContentType("text/html;charset=UTF-8");
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        System.out.println("AAAAA");
        String usernameFromSession = SessionUtils.getUsername(request);
        String userTypeFromSession = SessionUtils.getUserType(request);

        if (usernameFromSession == null || userTypeFromSession == null)
        {
            System.out.println("There is no session");
            response.sendRedirect(request.getContextPath() + "/index.html");
        }
        else
        {
            System.out.println("great");
          //  response.getOutputStream().
           // response.sendRedirect( SDM_MAIN_PAGE_URL + "?" + Constants.USERNAME + "=" + usernameFromSession + "&" + Constants.USERTYPE + "=" + userTypeFromSession);
        }
       /* else if(userNameFromURL == null || userTypeFromURL== null || userNameFromURL != null && !userNameFromURL.equals(usernameFromSession) || userTypeFromURL != null && !userTypeFromURL.equals(userTypeFromSession))
        {
            System.out.println("something got wrong");
            System.out.println(userNameFromURL);
            System.out.println(userTypeFromURL);
            response.sendRedirect( SDM_MAIN_PAGE_URL + "?" + Constants.USERNAME + "=" + usernameFromSession + "&" + Constants.USERTYPE + "=" + userTypeFromSession);
        }
        else
        {
            System.out.println("great");
            response.sendRedirect( SDM_MAIN_PAGE_URL + "?" + Constants.USERNAME + "=" + usernameFromSession + "&" + Constants.USERTYPE + "=" + userTypeFromSession);
        }*/
    }


}
