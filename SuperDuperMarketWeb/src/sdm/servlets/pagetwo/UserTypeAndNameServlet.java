package sdm.servlets.pagetwo;

import com.google.gson.Gson;
import logic.users.User;
import logic.users.UserManager;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/user-type-and-name")
public class UserTypeAndNameServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        User user = userManager.getUserByName(SessionUtils.getUsername(request));

        try(PrintWriter out = response.getWriter())
        {
            Gson gson = new Gson();
            String userInJson = gson.toJson(user);
            out.println(userInJson);
            out.flush();
        }catch (Exception ignored){
        }

       /* if(SessionUtils.getUserType(request).equals(Constants.SELLER))
        {
            userRole = Constants.SELLER;
        }
        else if(SessionUtils.getUserType(request).equals(Constants.BUYER))
        {
            userRole = Constants.BUYER;
        }*/


    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        processRequest(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        processRequest(request, response);
    }
}
