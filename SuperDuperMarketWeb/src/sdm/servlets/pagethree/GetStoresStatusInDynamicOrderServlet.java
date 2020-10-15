package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.AvailableItemInStore;
import logic.SDMLocation;
import logic.Store;
import logic.order.CustomerOrder.OpenedCustomerOrder1;
import logic.order.StoreOrder.OpenedStoreOrder;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sdm.utils.ServletUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static sdm.constants.Constants.ZONENAME;
import static sdm.general.GeneralMethods.getCurrentOrderByRequest;

@WebServlet("/get-stores-status-in-dynamic-order")
public class GetStoresStatusInDynamicOrderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        System.out.println("In GetStoresStatusInDynamicOrderServlet :)))))");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            OpenedCustomerOrder1 openedCustomerOrder1 = getCurrentOrderByRequest(getServletContext(), request);
            List<OpenedStoreOrder> listOfOpenedStoreOrder = openedCustomerOrder1.getListOfOpenedStoreOrder();
            if(openedCustomerOrder1 != null)
            {
                JSONArray jsonArray = readingFromStoresListToJsonObject(listOfOpenedStoreOrder, openedCustomerOrder1);
                String json = gson.toJson(jsonArray);
                out.println(json);
                System.out.println("This is the list of stores!!\n\n\n\n\n\n");
                System.out.println(json);
                out.flush();

            }
            else
            {
                System.out.println("openedCustomerOrder is null!!");
            }
        }
    }

    public JSONArray readingFromStoresListToJsonObject(List<OpenedStoreOrder> openedStoreList, OpenedCustomerOrder1 openedCustomerOrder1)
    {

        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(OpenedStoreOrder openedStoreOrder : openedStoreList)
        {
            System.out.println(i +" !!!!!!");
            Store store = openedStoreOrder.getStoreUsed();
            SDMLocation locationOfStore = store.getLocation();
            Integer coordinateX=locationOfStore.getX();
            Integer coordinateY=locationOfStore.getY();

            JSONObject jsonObject = new JSONObject();

            jsonObject.put("storeID", store.getSerialNumber());
            jsonObject.put("storeName", store.getName());
            jsonObject.put("storeOwner", store.getStoreOwner().getUserName());
            jsonObject.put("location", "(" + coordinateX + "," + coordinateY + ")");
            jsonObject.put("distanceFromCustomer", store.getLocation().getAirDistanceToOtherLocation(openedCustomerOrder1.getLocationOfCustomer()));
            jsonObject.put("PPK", store.getPPK());
            jsonObject.put("deliveryCost",openedStoreOrder.calcTotalDeliveryPrice());
            jsonObject.put("amountOfItemsPurchased", openedStoreOrder.calcTotalAmountOfItemsByMeasureType());
            jsonObject.put("totalPriceOfItems", openedStoreOrder.calcTotalPriceOfItemsNotFromSale());
            System.out.println("!!!!!!!");
            System.out.println(jsonObject);
            jsonArray.add(i,jsonObject);
            i++;
        }
        return jsonArray;
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
