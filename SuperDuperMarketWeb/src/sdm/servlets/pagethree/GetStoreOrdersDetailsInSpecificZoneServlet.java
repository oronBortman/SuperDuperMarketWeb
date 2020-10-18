package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.SDMLocation;
import logic.Seller;
import logic.Store;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.order.StoreOrder.ClosedStoreOrder;
import logic.order.StoreOrder.OpenedStoreOrder;
import logic.order.itemInOrder.OrderedItem;
import logic.order.itemInOrder.OrderedItemFromSale;
import logic.users.User;
import logic.zones.Zone;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

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

import static sdm.general.GeneralMethods.*;

@WebServlet("/get-store-orders-details")
public class GetStoreOrdersDetailsInSpecificZoneServlet extends HttpServlet {
    /*
        storeOrder["serialID"]
        storeOrder["date"];
        storeOrder["customerName"];
        storeOrder["locationOfCustomer"]
        storeOrder["totalItemsInOrder"]
        storeOrder["totalItemsPriceInOrder"]
        storeOrder["totalDeliveryPrice"]
        storeOrder["itemListInOrder"]


        itemInOrder["serialID"]
        itemInOrder["nameOfItem"]
        itemInOrder["typeToMeasureBy"]
        itemInOrder["AmountOfItemPurchased"]
        itemInOrder["pricePerUnit"]
        itemInOrder["totalPriceOfItem"]
        itemInOrder["FromDiscount"]
     */
    DecimalFormat decimalFormat = new DecimalFormat("#.00");

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        System.out.println("In GetStoreOrdersDetailsServlet :)))))");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            User user = getUserByRequestAndServletContext(servletContext, request);
            if(user instanceof Seller)
            {
                Zone zone = getZoneByRequest(servletContext, request);
                String sellerName = user.getUserName();
                List<ClosedStoreOrder> closedStoreOrderList = zone.getListOfClosedStoreOrderByStoreOwnerName(sellerName);
                if(closedStoreOrderList != null)
                {
                    JSONArray jsonArray = readingFromStoreOrderListToJsonObject(closedStoreOrderList);
                    String json = gson.toJson(jsonArray);
                    out.println(json);
                    System.out.println("This is the list of stores!!\n\n\n\n\n\n");
                    System.out.println(json);
                    out.flush();
                }
            }
            else
            {
                System.out.println("openedCustomerOrder is null!!");
            }
        }
    }

    public JSONArray readingFromStoreOrderListToJsonObject(List<ClosedStoreOrder> closedStoreOrderList)
    {

        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(ClosedStoreOrder closedStoreOrder : closedStoreOrderList)
        {
            System.out.println(i +" !!!!!!");
            Store store = closedStoreOrder.getStoreUsed();
            SDMLocation locationOfStore = store.getLocation();
            Integer coordinateX=locationOfStore.getX();
            Integer coordinateY=locationOfStore.getY();

            JSONObject jsonObject = new JSONObject();

            jsonObject.put("serialID",closedStoreOrder.getSerialNumber());
            jsonObject.put("date",closedStoreOrder.getDateStr());
            jsonObject.put("customerName",closedStoreOrder.getCustomerName());
            jsonObject.put("locationOfCustomer","(" + coordinateX + "," + coordinateY + ")");
            jsonObject.put("totalItemsInOrder",closedStoreOrder.calcTotalAmountItemsFromSaleByMeasureType());
            jsonObject.put("totalItemsPriceInOrder",decimalFormat.format(closedStoreOrder.calcTotalPriceOfItems()));
            jsonObject.put("totalDeliveryPrice",decimalFormat.format(closedStoreOrder.calcTotalDeliveryPrice()));
            jsonObject.put("itemListInOrder",readingFromItemsInOrderListToJsonObject(closedStoreOrder.generateListOfGeneralOrderedItems()));
            System.out.println(jsonObject);
            jsonArray.add(i,jsonObject);
            i++;
        }
        return jsonArray;
    }

    public JSONArray readingFromItemsInOrderListToJsonObject(List<OrderedItem> closedStoreOrderList)
    {
        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(OrderedItem orderedItem : closedStoreOrderList)
        {
            System.out.println(i +" !!!!!!");
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("serialID", orderedItem.getSerialNumber());
            jsonObject.put("nameOfItem", orderedItem.getName());
            jsonObject.put("typeToMeasureBy",orderedItem.getTypeOfMeasureStr());
            jsonObject.put("AmountOfItemPurchased",decimalFormat.format(orderedItem.getTotalAmountOfItemOrderedByTypeOfMeasure()));
            jsonObject.put("pricePerUnit",orderedItem.getPricePerUnit());
            jsonObject.put("totalPriceOfItem",decimalFormat.format(orderedItem.getTotalPriceOfItemOrderedByTypeOfMeasure()));
            jsonObject.put("FromDiscount",orderedItem instanceof OrderedItemFromSale);
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
