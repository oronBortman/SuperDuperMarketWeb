package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.AlertOnFeedback;
import logic.Seller;
import logic.Store;
import logic.order.CustomerOrder.Feedback;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.users.User;
import logic.users.UserManager;
import logic.zones.Zone;
import sdm.utils.SessionUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;

import static sdm.general.GeneralMethods.*;

@WebServlet("/add-feedback")
public class AddFeedbackServlet extends HttpServlet {
    DecimalFormat decimalFormat = new DecimalFormat("#.00");
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();

            Zone zone = getZoneByRequest(servletContext,request);
            UserManager userManager = getUserManagerByServletContext(servletContext);
            User user = userManager.getUserByName(SessionUtils.getUsername(request));
            OpenedCustomerOrder openedCustomerOrder = getCurrentOrderByRequest(servletContext,request);

            String storeIDStr = request.getParameter("storeID");
            String feedbackText = request.getParameter("feedbackText");
            String gradeStr = request.getParameter("grade");

            Integer gradeInt = Integer.parseInt(gradeStr);
            Integer storeIDInt = Integer.parseInt(storeIDStr);
            Store store = zone.getStoreBySerialID(storeIDInt);
            if(store == null)
            {
                System.out.println("store is null!!");
            }
            else if(user == null)
            {
                System.out.println("user is null!!");

            }
            else if(openedCustomerOrder == null)
            {
                System.out.println("openedCustomerOrder is null!!");
            }
            else
            {
                Feedback feedback = new Feedback(user.getUserName(),openedCustomerOrder.getDateStr(), gradeInt, feedbackText);
                store.addFeedback(feedback);
                //Add feedback alert to seller
                Seller storeOwner = store.getStoreOwner();
                storeOwner.addAlertToList(new AlertOnFeedback(feedback, store));
            }



            String json = gson.toJson(zone);
            out.println(json);
            out.flush();
        }
        catch(Exception e)
        {
            System.out.println("There was an error in AddFeedbackServlet " + e.getMessage());
        }
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
