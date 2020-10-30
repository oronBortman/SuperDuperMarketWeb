package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.users.Account;
import logic.users.User;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static sdm.general.GeneralMethods.getUserByRequestAndServletContext;


@WebServlet("/charge-money")
public class ChargeMoneyToCustomerServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            ServletContext servletContext = getServletContext();
            String date = request.getParameter("date");
            String amountOfMoneyToCharge = request.getParameter("amountOfMoneyToCharge");
            System.out.println(date + amountOfMoneyToCharge);
            Double amountOfMoneyToChargeDouble = Double.parseDouble(amountOfMoneyToCharge);
            User user = getUserByRequestAndServletContext(servletContext, request);
            Account account = user.getAccount();
            account.chargingMoney(date, amountOfMoneyToChargeDouble);

            Gson gson = new Gson();
            String json = gson.toJson(account);
            out.println(json);
            out.flush();
        }
        catch(Exception e)
        {
            System.out.println("There was an error!\n" + e.getMessage());
        }
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
