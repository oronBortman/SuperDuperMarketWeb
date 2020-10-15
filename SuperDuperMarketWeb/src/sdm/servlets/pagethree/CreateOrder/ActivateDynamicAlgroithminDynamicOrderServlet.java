package sdm.servlets.pagethree.CreateOrder;

import com.google.gson.Gson;
import logic.Item;
import logic.SDMLocation;
import logic.order.CustomerOrder.OpenedCustomerOrder1;
import logic.users.User;
import logic.users.UserManager;
import logic.zones.Zone;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static sdm.general.GeneralMethods.getCurrentOrderByRequest;
import static sdm.general.GeneralMethods.getZoneByRequest;

@WebServlet("/activate-dynamic-algorithm-in-dynamic-order")
public class ActivateDynamicAlgroithminDynamicOrderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        System.out.println("In create-dynamic-order servlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            Zone zone = getZoneByRequest(servletContext,request);
            OpenedCustomerOrder1 openedCustomerOrder1 = getCurrentOrderByRequest(servletContext, request);
            zone.updateItemsWithAmountAndCreateOpenedDynamicCustomerOrder(openedCustomerOrder1);
            System.out.println("There are the parameters of the order in the dynamic algorithm!!:\n\n\n\n");
            String json = gson.toJson(openedCustomerOrder1.generateListsOfItemNotFromSale());
            for(Item item : openedCustomerOrder1.generateListsOfItemNotFromSale())
            {
                System.out.println("Item with serial id: " + item.getSerialNumber());
            }
            out.println(json);
            System.out.println(json);
            out.flush();
        }
        catch(Exception e)
        {
            System.out.println("Error in creating opedCustomerOrder\n" + e.getMessage());
        }
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
