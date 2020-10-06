package sdm.servlets;

import com.google.gson.Gson;
import logic.users.User;
import logic.users.UserManager;
import sdm.utils.ServletUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@WebServlet("/load-xml-file")
public class LoadXmlFile extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        System.out.println("In load xml file servlet");
        /*response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            Set<User> usersList = userManager.getUsersMap().values().stream().collect(Collectors.toCollection(HashSet<User>::new));
            String json = gson.toJson(usersList);
            out.println(json);
            System.out.println(json);
            out.flush();
        }*/
        try (PrintWriter out = response.getWriter()) {
            out.println("a");
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }
}
