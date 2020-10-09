package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.AvailableItemInStore;
import logic.Store;
import logic.users.User;
import logic.users.UserManager;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class ShowAllStoresInZoneServlet extends HttpServlet {


    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ZoneManager zoneManager = ServletUtils.getZoneManager(getServletContext());
            Zone zone = zoneManager.getZoneByName(SessionUtils.getZoneName(request));
            List<Store> storeList = zone.getStoresList();
            JSONArray jsonArray = readingFromStoresListToJsonObject(storeList);
            String json = gson.toJson(jsonArray);
            out.println(json);
            System.out.println(json);
            out.flush();
        }
    }

    public JSONArray readingFromStoresListToJsonObject(List<Store> storeList)
    {
        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(Store store : storeList)
        {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("serialNumber", store.getSerialNumber());
            jsonObject.put("name", store.getName());
            jsonObject.put("ownerName", store.getStoreOwner());
            jsonObject.put("totalOrdersFromStore", store.calcTotalOrdersFromStore());
            jsonObject.put("totalProfitOfSoledItems", store.calcTotalProfitOfSoledItems());
            jsonObject.put("PPK", store.getPPK());
            jsonObject.put("totalProfitOfDeliveris",store.calcProfitOfDelivers());
            JSONArray itemsInStore = readingItemsFromStoreToJsonObject(store.getAvailableItemsList(), store);
            jsonObject.put("availableItemsList", itemsInStore);
            jsonArray.add(i,jsonObject);
            i++;
        }
        return jsonArray;
    }

    public JSONArray readingItemsFromStoreToJsonObject(List<AvailableItemInStore> availableItemInStoreList, Store store)
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
            jsonObject.put("totalSoledItemsFromStore", store.getAmountOfItemSoledByTypeOfMeasure(itemSerialId));
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
