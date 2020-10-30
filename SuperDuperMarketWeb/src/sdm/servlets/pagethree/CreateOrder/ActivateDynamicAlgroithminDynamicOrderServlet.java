package sdm.servlets.pagethree.CreateOrder;

import com.google.gson.Gson;
import logic.Item;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.zones.Zone;

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
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            Zone zone = getZoneByRequest(servletContext,request);
            OpenedCustomerOrder openedCustomerOrder = getCurrentOrderByRequest(servletContext, request);
            zone.updateItemsWithAmountAndCreateOpenedDynamicCustomerOrder(openedCustomerOrder);
           String json = gson.toJson(openedCustomerOrder.generateListsOfItemNotFromSale());

            out.println(json);
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
