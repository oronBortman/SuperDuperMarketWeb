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
import static sdm.general.GeneralMethods.*;

@WebServlet("/get-store-orders-details")
public class GetStoreOrdersDetailsInSpecificZoneServlet extends HttpServlet {
    DecimalFormat decimalFormat = new DecimalFormat("#.00");

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            User user = getUserByRequestAndServletContext(servletContext, request);
            if(user instanceof Seller)
            {
                ZoneManager zoneManager = ServletUtils.getZoneManager(getServletContext());
                String zoneName = request.getParameter(ZONENAME);
                Zone zone = zoneManager.getZoneByName(zoneName);
                String sellerName = user.getUserName();
                List<ClosedStoreOrder> closedStoreOrderList = zone.getListOfClosedStoreOrderByStoreOwnerName(sellerName);
                if(closedStoreOrderList != null)
                {
                    JSONArray jsonArray = readingFromStoreOrderListToJsonObject(closedStoreOrderList);
                    String json = gson.toJson(jsonArray);
                    out.println(json);
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
            SDMLocation locationOfCustomer = closedStoreOrder.getCustomerLocation();
            Integer coordinateX=locationOfCustomer.getX();
            Integer coordinateY=locationOfCustomer.getY();

            JSONObject jsonObject = new JSONObject();

            jsonObject.put("serialID",closedStoreOrder.getSerialNumber());
            jsonObject.put("date",closedStoreOrder.getDateStr());
            jsonObject.put("customerName",closedStoreOrder.getCustomerName());
            jsonObject.put("locationOfCustomer","(" + coordinateX + "," + coordinateY + ")");
            jsonObject.put("totalItemsInOrder",closedStoreOrder.calcTotalAmountOfItemsByUnit());
            jsonObject.put("totalItemsPriceInOrder",decimalFormat.format(closedStoreOrder.calcTotalPriceOfItems()));
            jsonObject.put("totalDeliveryPrice",decimalFormat.format(closedStoreOrder.calcTotalDeliveryPrice()));
            jsonObject.put("itemListInOrder",readingFromItemsInOrderListToJsonObject(closedStoreOrder.generateListOfGeneralOrderedItems()));
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
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("serialID", orderedItem.getSerialNumber());
            jsonObject.put("nameOfItem", orderedItem.getName());
            jsonObject.put("typeToMeasureBy",orderedItem.getTypeOfMeasureStr());
            jsonObject.put("AmountOfItemPurchased",decimalFormat.format(orderedItem.getTotalAmountOfItemOrderedByTypeOfMeasure()));
            jsonObject.put("pricePerUnit",orderedItem.getPricePerUnit());
            jsonObject.put("totalPriceOfItem",decimalFormat.format(orderedItem.getTotalPriceOfItemOrderedByTypeOfMeasure()));
            jsonObject.put("FromDiscount",orderedItem instanceof OrderedItemFromSale);
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
