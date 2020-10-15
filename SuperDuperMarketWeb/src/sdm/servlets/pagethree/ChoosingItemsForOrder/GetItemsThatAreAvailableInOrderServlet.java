package sdm.servlets.pagethree.ChoosingItemsForOrder;

import com.google.gson.Gson;
import logic.AvailableItemInStore;
import logic.Item;
import logic.order.CustomerOrder.OpenedCustomerOrder1;
import logic.zones.Zone;
import logic.zones.ZoneManager;
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
import java.util.Map;

import static sdm.general.GeneralMethods.getCurrentOrderByRequest;
import static sdm.general.GeneralMethods.getZoneByRequest;

@WebServlet("/get-items-that-are-available-in-order")
public class GetItemsThatAreAvailableInOrderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        System.out.println("In get-items-that-are-available-in-order\n\n\n\n\n\n\n");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            String json="";
            String orderType = request.getParameter("orderType");
            OpenedCustomerOrder1 openedCustomerOrder1 = getCurrentOrderByRequest(getServletContext(), request);
            System.out.println("A5");
            if(openedCustomerOrder1 == null)
            {
                System.out.println("openedCustomerOrder1 NULL!!!");
            }
            else if(orderType == null)
            {
                System.out.println("orderType NULL!!!");

            }
            else if(orderType.equals("static"))
            {
                List<AvailableItemInStore> availableItemInStoreList = openedCustomerOrder1.generateListsOfItemsInStoreThatAreNotInOrderAndNotFromSale();
                System.out.println("A6");
                json = gson.toJson(availableItemInStoreList);
                System.out.println("About to print Available item list");
                for(AvailableItemInStore availableItemInStore : availableItemInStoreList)
                {
                    System.out.println("Available item id: " + availableItemInStore.getSerialNumber());
                };
            }
            else if(orderType.equals("dynamic"))
            {
                System.out.println("A7");
                Zone zone = getZoneByRequest(getServletContext(), request);
                System.out.println("A8");
                Map<Integer, Item> itemsMap = zone.getItemsSerialIDMap();
                System.out.println("A9");
                List<Item> itemInZoneList = openedCustomerOrder1.generateListsOfItemsThatAreNotInOrderAndNotFromSale(itemsMap);
                System.out.println("A10");
                json = gson.toJson(itemInZoneList);
            }
            out.println(json);
            System.out.println(json);
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
