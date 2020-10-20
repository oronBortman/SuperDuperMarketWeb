package sdm.servlets.pagethree;

import com.google.gson.Gson;
import javafx.scene.layout.BorderPane;
import logic.AvailableItemInStore;
import logic.Store;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.order.StoreOrder.OpenedStoreOrder;
import logic.order.itemInOrder.OrderedItem;
import logic.order.itemInOrder.OrderedItemFromSale;
import logic.order.itemInOrder.OrderedItemFromStore;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
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
import static sdm.general.GeneralMethods.getCurrentOrderByRequest;
import static sdm.general.GeneralMethods.getZoneByRequest;

@WebServlet("/get-store-orders-for-order-summery")
public class GetStoreOrdersForOrderSummeryServlet extends HttpServlet {
    DecimalFormat decimalFormat = new DecimalFormat("#.00");

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML

        response.setContentType("application/json");
       // System.out.println("In GetStoreOrdersForOrderSummeryServlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            OpenedCustomerOrder openedCustomerOrder = getCurrentOrderByRequest(servletContext, request);
            if(openedCustomerOrder != null)
            {
                List<OpenedStoreOrder> openedStoreOrderList = openedCustomerOrder.getListOfOpenedStoreOrder();
                JSONArray jsonArray = readingFromStoresListToJsonObject(openedStoreOrderList, openedCustomerOrder);
                String json = gson.toJson(jsonArray);
                out.println(json);
           //     System.out.println("This is the list of stores!!\n\n\n");
           //     System.out.println(json);
                out.flush();
            }
            else
            {
                System.out.println("zoneName is null!!");
            }
        }
    }

    /*
0:
    serialNumber:1
    name: baba store
    ownerName:
    PPK:
    distanceToCustomer:
    deliveryCost
    date:

    itemsList{
        var serialID = itemInOrder["serialID"];
         var itemName = itemInOrder["itemName"];
        var measureType = itemInOrder["measureType"];
        var amount = itemInOrder["amount"];
        var pricePerUnit = itemInOrder["pricePerUnit"];
        var totalPrice = itemInOrder["totalPrice"];
        var boughtOnSale = itemInOrder["boughtOnSale"];
    }
 */

    public JSONArray readingFromStoresListToJsonObject(List<OpenedStoreOrder> openedStoreOrderList, OpenedCustomerOrder openedCustomerOrder)
    {
        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(OpenedStoreOrder openedStoreOrder : openedStoreOrderList)
        {
            Store store = openedStoreOrder.getStoreUsed();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("serialNumber", store.getSerialNumber());
            jsonObject.put("name", store.getName());
            jsonObject.put("ownerName", store.getStoreOwner().getUserName());
            jsonObject.put("PPK", store.getPPK());
            jsonObject.put("distanceToCustomer", decimalFormat.format(store.getLocation().getAirDistanceToOtherLocation(openedCustomerOrder.getCustomerLocation())));
            jsonObject.put("deliveryCost", decimalFormat.format(openedStoreOrder.calcTotalDeliveryPrice()));
            jsonObject.put("date",openedStoreOrder.getDateStr());
            JSONArray itemsInStoreOrder= readingItemsFromStoreToJsonObject(openedStoreOrder.generateListOfGeneralOrderedItems());
            jsonObject.put("itemsList", itemsInStoreOrder);
            jsonArray.add(i,jsonObject);
            i++;
        }
        return jsonArray;
    }

    public JSONArray readingItemsFromStoreToJsonObject(List<OrderedItem> orderedItemList)
    {
       /* itemsList{
        var serialID = itemInOrder["serialID"];
        var itemName = itemInOrder["itemName"];
        var measureType = itemInOrder["measureType"];
        var amount = itemInOrder["amount"];
        var pricePerUnit = itemInOrder["pricePerUnit"];
        var totalPrice = itemInOrder["totalPrice"];
        var boughtOnSale = itemInOrder["boughtOnSale"];
    }*/
        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(OrderedItem orderedItem : orderedItemList)
        {
            JSONObject jsonObject = new JSONObject();
            Boolean boughtOnSale = orderedItem instanceof OrderedItemFromSale;
            jsonObject.put("serialID", orderedItem.getSerialNumber());
            jsonObject.put("itemName", orderedItem.getName());
            jsonObject.put("measureType", orderedItem.getTypeOfMeasureStr());
            jsonObject.put("amount", orderedItem.getTotalAmountOfItemOrderedByTypeOfMeasure());
            jsonObject.put("pricePerUnit", orderedItem.getTotalPriceOfItemOrderedByUnits());
            jsonObject.put("totalPrice", orderedItem.getTotalPriceOfItemOrderedByTypeOfMeasure());
            jsonObject.put("boughtOnSale", boughtOnSale.toString());

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
