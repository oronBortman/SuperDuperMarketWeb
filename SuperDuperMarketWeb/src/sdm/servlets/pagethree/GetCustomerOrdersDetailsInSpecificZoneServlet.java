package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.Customer;
import logic.SDMLocation;
import logic.Store;
import logic.order.CustomerOrder.ClosedCustomerOrder;
import logic.order.StoreOrder.ClosedStoreOrder;
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

import static sdm.general.GeneralMethods.getUserByRequestAndServletContext;
import static sdm.general.GeneralMethods.getZoneByRequest;


@WebServlet("/get-customer-orders-details")
public class GetCustomerOrdersDetailsInSpecificZoneServlet extends HttpServlet {
    DecimalFormat decimalFormat = new DecimalFormat("#.00");
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
       // System.out.println("In GetCustomerOrdersDetailsServlet :)))))");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            User user = getUserByRequestAndServletContext(servletContext, request);
            Zone zone = getZoneByRequest(servletContext, request);
            List<ClosedCustomerOrder> closedCustomerOrdersList = zone.getListOfClosedCustomerOrderByCustomerName(user.getUserName());
            if(closedCustomerOrdersList != null)
            {
                JSONArray jsonArray = readListOfClosedCustomersOrderToJSONObject(closedCustomerOrdersList);
                String json = gson.toJson(jsonArray);
                out.println(json);
              //  System.out.println("This is the details on the ClosedCustomerOrder!!\n\n\n\n\n\n");
              // System.out.println(json);
                out.flush();
            }
            else
            {
                System.out.println("openedCustomerOrder is null!!");
            }
        }
        catch(Exception e)
        {
            System.out.println("There was an error!\n" + e.getMessage());
        }
    }


    public JSONArray readListOfClosedCustomersOrderToJSONObject(List<ClosedCustomerOrder> closedCustomerOrderList)
    {
        JSONArray jsonArray = new JSONArray();
        for(ClosedCustomerOrder closedCustomerOrder : closedCustomerOrderList)
        {
            int i=0;
            jsonArray.add(i,readingFromClosedCustomerOrderToJsonObject(closedCustomerOrder));
            i++;
        }
        return jsonArray;
    }

    public JSONObject readingFromClosedCustomerOrderToJsonObject(ClosedCustomerOrder closedCustomerOrder)
    {
        JSONObject jsonObject = new JSONObject();
        SDMLocation locationOfCustomer = closedCustomerOrder.getLocationOfCustomer();
        Integer coordinateX = locationOfCustomer.getX();
        Integer coordinateY = locationOfCustomer.getY();
        jsonObject.put("serialID", closedCustomerOrder.getSerialNumber());
        jsonObject.put("date", closedCustomerOrder.getDateStr());
        jsonObject.put("location", "(" + coordinateX + "," + coordinateY + ")");
        jsonObject.put("totalStores", closedCustomerOrder.getTotalAmountOfStoresInOrder());
        jsonObject.put("totalItemsInOrder", closedCustomerOrder.getTotalItemsInOrder());
        jsonObject.put("totalItemsPriceInOrder", decimalFormat.format(closedCustomerOrder.getTotalItemCostInOrder()));
        jsonObject.put("totalDeliveryPrice", decimalFormat.format(closedCustomerOrder.getTotalDeliveryPriceInOrder()));
        jsonObject.put("totalOrderPrice", decimalFormat.format(closedCustomerOrder.getTotalOrderPrice()));
        jsonObject.put("itemsListInOrder", readingListOfItems(closedCustomerOrder));
        return jsonObject;
    }

    public JSONArray readingListOfItems(ClosedCustomerOrder closedCustomerOrder)
    {
        JSONArray jsonArray = new JSONArray();
        List<ClosedStoreOrder> closedStoreOrderList = closedCustomerOrder.getListOfClosedStoreOrders();
        for(ClosedStoreOrder closedStoreOrder : closedStoreOrderList)
        {
            int i=0;
            List<OrderedItem> orderedItemList = closedStoreOrder.generateListOfGeneralOrderedItems();
            Store store = closedStoreOrder.getStoreUsed();
            for(OrderedItem orderedItem : orderedItemList)
            {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("storeID", store.getSerialNumber());
                jsonObject.put("storeName", store.getName());
                jsonObject.put("typeToMeasureBy", orderedItem.getTypeOfMeasureStr());
                jsonObject.put("pricePerUnit", orderedItem.getPricePerUnit());
                jsonObject.put("serialID", orderedItem.getSerialNumber());
                jsonObject.put("nameOfItem", orderedItem.getName());
                jsonObject.put("AmountOfItemPurchased", decimalFormat.format(orderedItem.getTotalAmountOfItemOrderedByTypeOfMeasure()));
                jsonObject.put("totalPriceOfItem", decimalFormat.format(orderedItem.getTotalPriceOfItemOrderedByTypeOfMeasure()));
                jsonObject.put("FromDiscount", orderedItem instanceof OrderedItemFromSale);
                jsonArray.add(i,jsonObject);
                i++;
            }
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
