package sdm.servlets.pagethree.ChoosingItemsForOrder;

import com.google.gson.Gson;
import logic.AvailableItemInStore;
import logic.Item;
import logic.order.CustomerOrder.OpenedCustomerOrder1;
import logic.users.UserManager;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
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

import static sdm.constants.Constants.ZONENAME;

@WebServlet("/get-items-that-are-available-in-static-order")
public class GetItemsThatAreAvailableInStaticOrderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        System.out.println("In get-items-that-are-available-in-static-order\n\n\n\n\n\n\n");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            System.out.println("A1");
            String storeID = request.getParameter("storeID");
            System.out.println(storeID);
            System.out.println("A2");
            Integer storeIDInt = Integer.parseInt(storeID);
            System.out.println("A3");
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            System.out.println("A4");
            OpenedCustomerOrder1 openedCustomerOrder1 = userManager.getUserByName(SessionUtils.getUsername(request)).getCurrentOrder();
            System.out.println("A5");
            List<AvailableItemInStore> availableItemInStoreList = openedCustomerOrder1.generateListsOfItemsInStoreThatAreNotInOrderAndNotFromSale(storeIDInt);
            System.out.println("A6");
            String json = gson.toJson(availableItemInStoreList);
            System.out.println("About to print Available item list");
            for(AvailableItemInStore availableItemInStore : availableItemInStoreList)
            {
                System.out.println("Available item id: " + availableItemInStore.getSerialNumber());
            };
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
