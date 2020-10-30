package sdm.servlets;

import com.google.gson.Gson;
import logic.users.User;
import sdm.constants.Constants;
import sdm.utils.ServletUtils;
import logic.users.UserManager;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static sdm.constants.Constants.USERNAME;

public class LoginServlet extends HttpServlet {

    // urls that starts with forward slash '/' are considered absolute
    // urls that doesn't start with forward slash '/' are considered relative to the place where this servlet request comes from
    // you can use absolute paths, but then you need to build them from scratch, starting from the context path
    // ( can be fetched from request.getContextPath() ) and then the 'absolute' path from it.
    // Each method with it's pros and cons...

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final String SDM_MAIN_PAGE_URL = request.getContextPath() + "/pages/sdmmainpage/sdm-main-page.html";
        final String LOGIN_ERROR_URL = request.getContextPath() + "/pages/loginerror/login_attempt_after_error.html";  // must start with '/' since will be used in request dispatcher...
        response.setContentType("text/html;charset=UTF-8");
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        String usernameFromSession = SessionUtils.getUsername(request);
        String userType = request.getParameter(Constants.USERTYPE);
        if (userType == null) {
            String errorMessage = "you didn't choose your type";
            response.sendRedirect(LOGIN_ERROR_URL + "?errorMessage=" + errorMessage);
        }
        else
        {
            if (usernameFromSession == null)
            {
                //user is not logged in yet
                String usernameFromParameter = request.getParameter(USERNAME);
                if (usernameFromParameter == null || usernameFromParameter.isEmpty())
                {
                    String errorMessage = "you didn't choose a name";
                    response.sendRedirect(LOGIN_ERROR_URL + "?errorMessage=" + errorMessage);
                }
                else
                {
                    usernameFromParameter = usernameFromParameter.trim();
                    synchronized (this) {
                        if (userManager.isUserExists(usernameFromParameter)) {
                            String errorMessage = "Username " + usernameFromParameter + " already exists. Please enter a different username.";
                            response.sendRedirect(LOGIN_ERROR_URL + "?errorMessage=" + errorMessage);
                        } else {
                            userManager.addUser(usernameFromParameter, userType);
                            request.getSession(true).setAttribute(Constants.USERNAME, usernameFromParameter);
                            request.getSession(true).setAttribute(Constants.USERTYPE, userType);

                            System.out.println("On login, request URI is: " + request.getRequestURI());
                            response.sendRedirect(SDM_MAIN_PAGE_URL);
                        }
                    }
                }
            }
            else
            {
                //user is already logged in
                System.out.println("User already loggen in");
                response.sendRedirect(SDM_MAIN_PAGE_URL);
        }
    }
}
// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
