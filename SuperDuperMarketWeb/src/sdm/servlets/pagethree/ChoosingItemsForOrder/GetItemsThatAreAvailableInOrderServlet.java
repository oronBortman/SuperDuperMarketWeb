package sdm.servlets.pagethree.ChoosingItemsForOrder;

import com.google.gson.Gson;
import logic.AvailableItemInStore;
import logic.Item;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.zones.Zone;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import static sdm.general.GeneralMethods.getCurrentOrderByRequest;
import static sdm.general.GeneralMethods.getZoneByRequest;

@WebServlet("/get-items-that-are-available-in-order")
public class GetItemsThatAreAvailableInOrderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            String json="";
            String orderType = request.getParameter("orderType");
            OpenedCustomerOrder openedCustomerOrder = getCurrentOrderByRequest(getServletContext(), request);
            if(openedCustomerOrder == null)
            {
                System.out.println("openedCustomerOrder1 NULL!!!");
            }
            else if(orderType == null)
            {
                System.out.println("orderType NULL!!!");

            }
            else if(orderType.equals("static"))
            {
                List<AvailableItemInStore> availableItemInStoreList = openedCustomerOrder.generateListsOfItemsInStoreThatAreNotInOrderAndNotFromSale();
                json = gson.toJson(availableItemInStoreList);
            }
            else if(orderType.equals("dynamic"))
            {
                Zone zone = getZoneByRequest(getServletContext(), request);
                Map<Integer, Item> itemsMap = zone.getItemsSerialIDMap();
                List<Item> itemInZoneList = openedCustomerOrder.generateListsOfItemsThatAreNotInOrderAndNotFromSale(itemsMap);
                json = gson.toJson(itemInZoneList);
            }
            out.println(json);
            out.flush();
        }
        catch (Exception e)
        {
            System.out.println("There was an error:\n" + e.getMessage());
        }
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
