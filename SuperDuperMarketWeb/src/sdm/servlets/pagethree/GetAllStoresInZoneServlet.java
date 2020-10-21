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
     //   System.out.println("In showAllStoresInZoneServlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ZoneManager zoneManager = ServletUtils.getZoneManager(getServletContext());
            String zoneName = request.getParameter(ZONENAME);
            Zone zone = zoneManager.getZoneByName(zoneName);
            if(zoneName != null)
            {
                List<Store> storeList = zone.getStoresList();
                //System.out.println("A1");
                JSONArray jsonArray = readingFromStoresListToJsonObject(storeList);
             //   System.out.println("A2");
                String json = gson.toJson(jsonArray);
              //  System.out.println("A3");
                out.println(json);
              //  System.out.println("This is the list of stores!!");
            //    System.out.println(json);
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
          //  System.out.println("B1");
            List<ClosedStoreOrder> closedStoreOrderList = GeneralMethods.getClosedStoreOrderListByIDListOfOrders(servletContext,store.getListOrdersSerialID());
           // System.out.println("B2");

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("serialNumber", store.getSerialNumber());
            jsonObject.put("name", store.getName());
            jsonObject.put("ownerName", store.getStoreOwner().getUserName());
          //  System.out.println("B3");
            jsonObject.put("totalOrdersFromStore", store.calcTotalOrdersFromStore(closedStoreOrderList));
         //   System.out.println("B4");
            jsonObject.put("totalProfitOfSoledItems", decimalFormat.format(store.calcTotalProfitOfSoledItems(closedStoreOrderList)));
         //   System.out.println("B5");
            jsonObject.put("PPK", store.getPPK());
            jsonObject.put("totalProfitOfDeliveris",decimalFormat.format(store.calcProfitOfDelivers(closedStoreOrderList)));
         //   System.out.println("B6");
            JSONArray itemsInStore = readingItemsFromStoreToJsonObject(store.getAvailableItemsList(), store, closedStoreOrderList);
          //  System.out.println("B7");
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
           // System.out.println("C1");
            jsonObject.put("totalSoledItemsFromStore", decimalFormat.format(store.getAmountOfItemSoledByTypeOfMeasure(closedStoreOrderList, itemSerialId)));
         //   System.out.println("C2");

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
