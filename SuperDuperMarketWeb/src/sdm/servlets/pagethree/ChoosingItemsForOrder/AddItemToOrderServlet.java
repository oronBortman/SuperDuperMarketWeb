package sdm.servlets.pagethree.ChoosingItemsForOrder;

import com.google.gson.Gson;
import logic.Item;
import logic.order.CustomerOrder.OpenedCustomerOrder1;
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
import static sdm.general.GeneralMethods.getCurrentOrderByRequest;

@WebServlet("/add-item-to-order")
public class AddItemToOrderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        System.out.println("In AddItemToOrderServlet");

        try (PrintWriter out = response.getWriter()) {
           // Gson gson = new Gson();
            String orderType = request.getParameter("orderType");
            String serialIDOfItem = request.getParameter("serialIDOfItem");
            String amountOfItem = request.getParameter("amountOfItem");
           // String typeToMeasureBy = request.getParameter("typeToMeasureBy");

           Integer serialIdOfItemInt = Integer.parseInt(serialIDOfItem);
            Double amountOfItemDouble = Double.parseDouble(amountOfItem);

            OpenedCustomerOrder1 openedCustomerOrder1 = getCurrentOrderByRequest(getServletContext(), request);
            if(openedCustomerOrder1 != null)
            {
                if(orderType.equals("static"))
                {
                    openedCustomerOrder1.addItemForStoreOrderInStaticOrder(serialIdOfItemInt,amountOfItemDouble);

                }
                else if(orderType.equals("dynamic"))
                {
                    openedCustomerOrder1.addItemToItemsChosenForDynamicOrderMap(serialIdOfItemInt, amountOfItemDouble);
                }

            }
            else
            {
                System.out.println("Zone name is null!");
            }
        }
        catch (Exception error)
        {
            System.out.println("There is error in AddItemToOrderServler:\n" + error.getMessage());
        }
    }

    public JSONArray readingFromItemsListToJsonObject(List<Item> itemsList, Zone zone)
    {
        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(Item item : itemsList)
        {
            Integer itemSerialNumber = item.getSerialNumber();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("serialNumber", item.getSerialNumber());
            jsonObject.put("name", item.getName());
            jsonObject.put("typeOfMeasureBy", item.getTypeOfMeasureStr());
            jsonObject.put("howManyShopsSellesAnItem", zone.getHowManyShopsSellesAnItem(itemSerialNumber));
            jsonObject.put("avgPriceOfItemInSK", zone.getAvgPriceOfItemInSDK(itemSerialNumber));
            jsonObject.put("howMuchTimesTheItemHasBeenOrdered", zone.getHowMuchTimesTheItemHasBeenOrdered(itemSerialNumber));
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
