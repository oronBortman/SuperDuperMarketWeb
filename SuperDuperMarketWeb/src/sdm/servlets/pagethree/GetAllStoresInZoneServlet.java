package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.AvailableItemInStore;
import logic.Store;
import logic.order.StoreOrder.ClosedStoreOrder;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sdm.general.GeneralMethods;
import sdm.utils.ServletUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.List;

import static sdm.constants.Constants.ZONENAME;

@WebServlet("/stores-in-zone-list")
public class GetAllStoresInZoneServlet extends HttpServlet {
    DecimalFormat decimalFormat = new DecimalFormat("#.00");

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ZoneManager zoneManager = ServletUtils.getZoneManager(getServletContext());
            String zoneName = request.getParameter(ZONENAME);
            Zone zone = zoneManager.getZoneByName(zoneName);
            if(zoneName != null)
            {
                List<Store> storeList = zone.getStoresList();
                JSONArray jsonArray = readingFromStoresListToJsonObject(storeList);
                String json = gson.toJson(jsonArray);
                out.println(json);
                out.flush();
            }
            else
            {
                System.out.println("zoneName is null!!");
            }
        }
        catch(Exception error)
        {
            System.out.println("There was exception in GetAllStoresInZoneServlet!" + error.getMessage());
        }
    }

    public JSONArray readingFromStoresListToJsonObject(List<Store> storeList)
    {
        ServletContext servletContext = getServletContext();

        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(Store store : storeList)
        {
            List<ClosedStoreOrder> closedStoreOrderList = GeneralMethods.getClosedStoreOrderListByIDListOfOrders(servletContext,store);
            System.out.println("\n\n\n\n\n\nThese are the number of orders from store " + store.getSerialNumber() + ":" + closedStoreOrderList.size());
            for(ClosedStoreOrder closedStoreOrder : closedStoreOrderList)
            {
                System.out.println("StoreOrder ID:" + closedStoreOrder.getSerialNumber());
                System.out.println("total price of items: " + closedStoreOrder.calcTotalPriceOfItems() + " total delivery price: " + closedStoreOrder.calcTotalDeliveryPrice());
            }
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("serialNumber", store.getSerialNumber());
            jsonObject.put("name", store.getName());
            jsonObject.put("ownerName", store.getStoreOwner().getUserName());
            jsonObject.put("totalOrdersFromStore", store.calcTotalOrdersFromStore(closedStoreOrderList));
            jsonObject.put("totalProfitOfSoledItems", decimalFormat.format(store.calcTotalProfitOfSoledItems(closedStoreOrderList)));
            jsonObject.put("PPK", store.getPPK());
            jsonObject.put("totalProfitOfDeliveris",decimalFormat.format(store.calcProfitOfDelivers(closedStoreOrderList)));
            JSONArray itemsInStore = readingItemsFromStoreToJsonObject(store.getAvailableItemsList(), store, closedStoreOrderList);
            jsonObject.put("availableItemsList", itemsInStore);
            jsonArray.add(i,jsonObject);
            i++;
        }
        return jsonArray;
    }

    public JSONArray readingItemsFromStoreToJsonObject(List<AvailableItemInStore> availableItemInStoreList, Store store, List<ClosedStoreOrder> closedStoreOrderList)
    {
        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(AvailableItemInStore availableItemInStore : availableItemInStoreList)
        {
            int itemSerialId = availableItemInStore.getSerialNumber();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("serialNumber", availableItemInStore.getSerialNumber());
            jsonObject.put("name", availableItemInStore.getName());
            jsonObject.put("typeToMeasureBy", availableItemInStore.getTypeOfMeasureStr());
            jsonObject.put("pricePerUnit", availableItemInStore.getPricePerUnit());
            jsonObject.put("totalSoledItemsFromStore", decimalFormat.format(store.getAmountOfItemSoledByTypeOfMeasure(closedStoreOrderList, itemSerialId)));

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
