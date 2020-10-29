package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.*;
import logic.order.CustomerOrder.Feedback;
import logic.order.StoreOrder.ClosedStoreOrder;
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

@WebServlet("/get-alerts")
public class GetAlertsOfOwnerServlet extends HttpServlet {
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
            if(user instanceof Seller)
            {
                Seller seller = (Seller) user;
                List<Alert> alertList = seller.getAlertsList();
                JSONArray jsonArray = readAlertsJSONObject(alertList);
                String json = gson.toJson(jsonArray);
                out.println(json);
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


    public JSONArray readAlertsJSONObject(List<Alert> alertList)
    {
        JSONArray jsonArray = new JSONArray();
        for(Alert alert : alertList)
        {
            int i=0;
            JSONObject jsonObject=null;
            if(alert instanceof AlertOnOrder)
            {
                jsonObject=readingFromOrderAlertJsonObject((AlertOnOrder)alert);
            }
            else if(alert instanceof AlertOnFeedback)
            {
                jsonObject=readingFromFeedbackAlertJsonObject((AlertOnFeedback) alert);
            }
            else if(alert instanceof AlertOnNewStoreInZone)
            {
                jsonObject=readingFromNewStoreAlertJsonObject((AlertOnNewStoreInZone) alert);
            }
            jsonArray.add(i,jsonObject);
            i++;
        }
        return jsonArray;
    }

    public JSONObject readingFromOrderAlertJsonObject(AlertOnOrder alertOnOrder)
    {
        /*
           // var orderId = orderAlert["orderId"]
    var customerName = orderAlert["customerName"];
    var totalItemsBought = orderAlert["totalItemsBought"];
    var totalPriceOfTtems = orderAlert["totalPriceOfTtems"];
    var totalDeliveryPrice = orderAlert["totalDeliveryPrice"];
    var storeName = orderAlert["storeName"];
    var storeSerialID = orderAlert["storeSerialID"];
         */
        JSONObject jsonObject = new JSONObject();
        ClosedStoreOrder closedStoreOrder = alertOnOrder.getClosedStoreOrder();
        Store store = closedStoreOrder.getStoreUsed();
        jsonObject.put("alertType", "order");
        jsonObject.put("orderId", closedStoreOrder.getSerialNumber());
        jsonObject.put("customerName", closedStoreOrder.getCustomerName());
        jsonObject.put("totalItemsBought", closedStoreOrder.calcTotalAmountOfItemsByUnit());
        jsonObject.put("totalPriceOfTtems", decimalFormat.format(closedStoreOrder.calcTotalPriceOfItems()));
        jsonObject.put("totalDeliveryPrice", decimalFormat.format(closedStoreOrder.calcTotalDeliveryPrice()));
        jsonObject.put("storeName", store.getName());
        jsonObject.put("storeSerialID", store.getSerialNumber());

        return jsonObject;
    }

    public JSONObject readingFromFeedbackAlertJsonObject(AlertOnFeedback alertOnFeedback)
    {
        /*
            var customerName = feedbackAlert["customerName"];
    var orderDate = feedbackAlert["orderDate"];
    var rating = feedbackAlert["rating"];
    var feedbackText = feedbackAlert["feedbackText"];
    var storeName = feedbackAlert["storeName"];
    var storeSerialID = feedbackAlert["storeSerialID"];
         */
        Feedback feedback = alertOnFeedback.getFeedback();
        Store store = alertOnFeedback.getStore();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("alertType", "feedback");
        jsonObject.put("customerName", store.getSerialNumber());
        jsonObject.put("orderDate", feedback.getOrderDate());
        jsonObject.put("rating", feedback.getRating());
        jsonObject.put("feedbackText", feedback.getFeedbackText());
        jsonObject.put("storeName", store.getName());
        jsonObject.put("storeSerialID", store.getSerialNumber());
        return jsonObject;
    }

    public JSONObject readingFromNewStoreAlertJsonObject(AlertOnNewStoreInZone alertOnNewStoreInZone)
    {
        /*
            var storeOwner = newStoreAlert["storeOwner"];
    var storeName = newStoreAlert["storeName"];
    var storeLocation = newStoreAlert["storeLocation"];
    var totalItemsStoreSells = newStoreAlert["totalItemsStoreSells"];
    var totalItemsInZone = newStoreAlert["totalItemsInZone"];
         */
        Store store = alertOnNewStoreInZone.getStore();
        Integer totalItemsInZone = alertOnNewStoreInZone.getTotalItemsInZone();
        Integer totalItemsStoreSells = alertOnNewStoreInZone.getTotalItemsStoreSells();

        JSONObject jsonObject = new JSONObject();
        SDMLocation locationOfStore = store.getLocation();
        Integer coordinateX = locationOfStore.getX();
        Integer coordinateY = locationOfStore.getY();

        jsonObject.put("alertType", "newStore");
        jsonObject.put("storeOwner", store.getStoreOwner().getUserName());
        jsonObject.put("storeName", store.getName());
        jsonObject.put("storeLocation", "(" + coordinateX + "," + coordinateY + ")");
        jsonObject.put("totalItemsInZone", decimalFormat.format(totalItemsInZone));
        jsonObject.put("totalItemsStoreSells", decimalFormat.format(totalItemsStoreSells));
        return jsonObject;
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
