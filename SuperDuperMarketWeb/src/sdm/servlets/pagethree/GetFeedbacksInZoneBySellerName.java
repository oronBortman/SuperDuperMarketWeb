package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.AvailableItemInStore;
import logic.Store;
import logic.order.CustomerOrder.Feedback;
import logic.users.User;
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
import java.util.List;

import static sdm.constants.Constants.ZONENAME;

@WebServlet("/get-feedbacks-in-zone-by-seller-name")
public class GetFeedbacksInZoneBySellerName extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        System.out.println("In GetFeedbacksInZoneBySellerName");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            ZoneManager zoneManager = ServletUtils.getZoneManager(getServletContext());
            String zoneName = request.getParameter(ZONENAME);
            Zone zone = zoneManager.getZoneByName(zoneName);
            if(zoneName != null)
            {
                User user = GeneralMethods.getUserByRequestAndServletContext(servletContext, request);
                List<Feedback> feedbackList = zone.getListOfFeedbacksByStoreOwnerName(user.getUserName());
                JSONArray jsonArray = readingFromFeedbacksListToJsonObject(feedbackList);
                String json = gson.toJson(jsonArray);
                out.println(json);
                System.out.println("This is the list of feedbacks!!");
                System.out.println(json);
                out.flush();
            }
            else
            {
                System.out.println("zoneName is null!!");
            }
        }
        catch (Exception e)
        {
            System.out.println("Error in get store in zone\n" + e);
        }
    }

    public JSONArray readingFromFeedbacksListToJsonObject(List<Feedback> feedbackList)
    {
        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(Feedback feedback : feedbackList)
        {
            /*
                this.customerName = customerName;
                this.orderDate = orderDate;
                this.rating = rating;
                this.feedbackText = feedbackText;
             */
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("customerName", feedback.getCustomerName());
            jsonObject.put("orderDate", feedback.getOrderDate());
            jsonObject.put("rating",feedback.getRating());
            jsonObject.put("feedbackText", feedback.getFeedbackText());
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
