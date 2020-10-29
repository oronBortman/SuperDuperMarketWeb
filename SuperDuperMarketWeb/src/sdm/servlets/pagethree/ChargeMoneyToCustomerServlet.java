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
        System.out.println("In charge-money-servlet :)))))");
        try (PrintWriter out = response.getWriter()) {
            System.out.println("A1");
            ServletContext servletContext = getServletContext();
            System.out.println("A2");
            String date = request.getParameter("date");
            System.out.println("A3");
            String amountOfMoneyToCharge = request.getParameter("amountOfMoneyToCharge");
            System.out.println(date + amountOfMoneyToCharge);
            System.out.println("A4");
            Double amountOfMoneyToChargeDouble = Double.parseDouble(amountOfMoneyToCharge);
            System.out.println("A5");
            User user = getUserByRequestAndServletContext(servletContext, request);
            System.out.println("A6");
            Account account = user.getAccount();
            System.out.println("A7");
            account.chargingMoney(date, amountOfMoneyToChargeDouble);
            System.out.println("A8");

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
