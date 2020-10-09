package sdm.servlets.pagetwo;

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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet("/charging-money")
public class ChargingMoneyServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try{
            response.setContentType("text/html;charset=UTF-8");
            //Date date=null;
            String chargingMoneyFromParameter = request.getParameter("chargingMoneyTextField");
            String dateStr = request.getParameter("dateOfChargingMoney");
            /*try {
                date =  new SimpleDateFormat("yyyy/MM/dd").parse(dateStr);
            } catch (ParseException e) {
                e.printStackTrace();
            }*/
            Double amountToCharge = Double.parseDouble(chargingMoneyFromParameter);
            UserManager userManager = ServletUtils.getUserManager(request.getServletContext());
            User user = userManager.getUserByName(SessionUtils.getUsername(request));
            user.getAccount().chargingMoney(dateStr, amountToCharge);
        }
        catch(Exception e)
        {
            System.out.println(e);
            System.out.println("There is a problem!!!!!!!!\n\n\n\n\n");
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


