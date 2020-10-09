package sdm.servlets;

import logic.users.User;
import logic.users.UserManager;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet("/charging-money")

public class ChargingMoneyServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        Date date=null;
        String chargingMoneyFromParameter = request.getParameter("chargingMoneyTextField");
        String dateStr = request.getParameter("dateOfChargingMoney");
        try {
            date =  new SimpleDateFormat("dd/MM/yyyy").parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Double amountToCharge = Double.parseDouble(chargingMoneyFromParameter);
        UserManager userManager = ServletUtils.getUserManager(request.getServletContext());
        User user = userManager.getUserByName(SessionUtils.getUsername(request));
        user.getAccount().chargingMoney(date, amountToCharge);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request,response);
    }

}


