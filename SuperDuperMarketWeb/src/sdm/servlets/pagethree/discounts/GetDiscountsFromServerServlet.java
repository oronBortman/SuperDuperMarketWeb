package sdm.servlets.pagethree.discounts;

import com.google.gson.Gson;
import logic.discount.Discount;
import logic.discount.IfYouBuySDM;
import logic.discount.Offer;
import logic.discount.ThenYouGetSDM;
import logic.order.CustomerOrder.OpenedCustomerOrder;
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
import java.util.List;

import static sdm.constants.Constants.ZONENAME;
import static sdm.general.GeneralMethods.getCurrentOrderByRequest;
import static sdm.general.GeneralMethods.getZoneByRequest;

@WebServlet("/get-discounts-from-server")
public class GetDiscountsFromServerServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        System.out.println("In GetDiscountsFromServerServlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            Zone zone = getZoneByRequest(servletContext, request);
            OpenedCustomerOrder openedCustomerOrder = getCurrentOrderByRequest(servletContext, request);
            List<Discount> discountList = openedCustomerOrder.generateListOfDiscounts();

            JSONArray jsonArray = readingFromDiscountsListToJsonObject(discountList, zone);
            String json = gson.toJson(jsonArray);
            out.println(json);
            System.out.println("This is the list of discounts!!");
            System.out.println(json);
            out.flush();

        } catch (Exception e) {
            System.out.println("There was an error in get discounts from server: \n" + e.getMessage());
        }
    }

    public JSONArray readingFromDiscountsListToJsonObject(List<Discount> discountsList, Zone zone)
    {
        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(Discount discount : discountsList)
        {
            IfYouBuySDM ifYouBuySDM = discount.getIfYouBuySDM();
            ThenYouGetSDM thenYouGetSDM = discount.getThenYouGet();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("discountName", discount.getName());
            jsonObject.put("ifYouBuy", readingIfYouBuySDMToJsonObject(ifYouBuySDM, zone));
            jsonObject.put("thenYouGet", readingThenYouGetToJsonObject(thenYouGetSDM, zone));
            jsonArray.add(i,jsonObject);
            i++;
        }
        return jsonArray;
    }

    public JSONObject readingThenYouGetToJsonObject(ThenYouGetSDM thenYouGetSDM, Zone zone)
    {
        JSONObject jsonObject = new JSONObject();
        String operator = thenYouGetSDM.getOperator();
        List<Offer> offerList = thenYouGetSDM.getOfferList();
        jsonObject.put("operator", operator);
        jsonObject.put("offerList", readingOffersListToJSONArray(offerList, zone));
        return jsonObject;
    }

    public JSONArray readingOffersListToJSONArray(List<Offer> offerList, Zone zone)
    {
        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(Offer offer : offerList)
        {
            Integer itemSerialId = offer.getItemId();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("itemId", itemSerialId);
            jsonObject.put("quantity", offer.getQuantity());
            jsonObject.put("forAdditional", offer.getForAdditional());
            jsonObject.put("itemName", zone.getItemBySerialID(itemSerialId).getName());
            jsonArray.add(i,jsonObject);
            i++;
        }
        return jsonArray;
    }

    public JSONObject readingIfYouBuySDMToJsonObject(IfYouBuySDM ifYouBuySDM, Zone zone)
    {
        JSONObject jsonObject = new JSONObject();
        Integer itemSerialID = ifYouBuySDM.getItemId();
        jsonObject.put("itemID", itemSerialID);
        jsonObject.put("quantity", ifYouBuySDM.getQuantity());
        jsonObject.put("itemName", zone.getItemBySerialID(itemSerialID).getName());
        return jsonObject;
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
