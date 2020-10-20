package sdm.servlets.pagetwo;

import logic.users.User;
import sdm.utils.ServletUtils;
import com.google.gson.Gson;
import logic.users.UserManager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@WebServlet("/users-list")
public class UsersListServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        //System.out.println("In UsersListServlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            /*for(Map.Entry<String, User> entry : userManager.getUsersMap().entrySet())
            {
                System.out.println(entry.getValue().getUserName());
            }*/
            //            Set<User> usersList = userManager.getUsersMap().values().stream().collect(Collectors.toCollection(HashSet<User>::new));
            Set<User> usersList = new HashSet<>(userManager.getUsersMap().values());
            /*for(User entry : usersList)
            {
                System.out.println(entry.getUserName() + "111");
            }*/
            String json = gson.toJson(usersList);
            //System.out.println("1");
           // System.out.println("1" + json);
            out.println(json);
            out.flush();
        }
        catch(Exception e)
        {
            System.out.println("There was error in UsersListServlet");
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
