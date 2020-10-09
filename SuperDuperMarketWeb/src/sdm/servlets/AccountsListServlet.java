package sdm.servlets;

import com.google.gson.Gson;
import logic.users.Account;
import logic.users.ActionOnAccount;
import logic.users.User;
import logic.users.UserManager;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@WebServlet("/accounts-list")
public class AccountsListServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            UserManager userManager = ServletUtils.getUserManager(request.getServletContext());
            User user = userManager.getUserByName(SessionUtils.getUsername(request));
            Set<ActionOnAccount> historyOfActionsOnAccountSet = user.getAccount().getHistoryOfActionsOnAccountSet();
            String json = gson.toJson(historyOfActionsOnAccountSet);
            out.println(json);
            System.out.println(json);
            out.flush();
        }
    }

}
