package sdm.servlets.pagethree.discounts;

import com.google.gson.Gson;
import logic.AvailableItemInStore;
import logic.Store;
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

@WebServlet("/apply-all-or-nothing-discount")
public class ApplyAllOrNothingDiscountServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        //{"discountName":discountName};
        response.setContentType("application/json");
        System.out.println("In ApplyAllOrNothingDiscountServlet");
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
                System.out.println("This is the list of stores!!");
                System.out.println(json);
                out.flush();
            }
            else
            {
                System.out.println("zoneName is null!!");
            }
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
            jsonObject.put("ownerName", store.getStoreOwner().getUserName());
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
