package sdm.servlets.pagetwo;

import com.google.gson.Gson;
import logic.users.ActionOnAccount;
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
import java.util.List;

@WebServlet("/accounts-list")
public class AccountsListServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            UserManager userManager = ServletUtils.getUserManager(request.getServletContext());
            User user = userManager.getUserByName(SessionUtils.getUsername(request));
            List<ActionOnAccount> historyOfActionsOnAccountSet = user.getAccount().getHistoryOfActionsOnAccountList();
            String json = gson.toJson(historyOfActionsOnAccountSet);
            out.println(json);
            out.flush();
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request,response);
    }

}
