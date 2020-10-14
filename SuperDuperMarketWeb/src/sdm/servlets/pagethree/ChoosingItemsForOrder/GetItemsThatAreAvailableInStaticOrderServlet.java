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
        System.out.println("In show all items in zone servlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            String storeID = request.getParameter("storeID");
            Integer storeIDInt = Integer.parseInt(storeID);
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            OpenedCustomerOrder1 openedCustomerOrder1 = userManager.getUserByName(SessionUtils.getUsername(request)).getCurrentOrder();
            List<AvailableItemInStore> availableItemInStoreList = openedCustomerOrder1.generateListsOfItemsInStoreThatAreNotInOrderAndNotFromSale(storeIDInt);
            String json = gson.toJson(availableItemInStoreList);
            out.println(json);
            System.out.println(json);
            out.flush();
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
