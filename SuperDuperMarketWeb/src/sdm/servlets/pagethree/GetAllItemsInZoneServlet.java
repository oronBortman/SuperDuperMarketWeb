package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.Item;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

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

@WebServlet("/items-in-zone-list")
public class GetAllItemsInZoneServlet extends HttpServlet {
    DecimalFormat decimalFormat = new DecimalFormat("#.00");

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ZoneManager zoneManager = ServletUtils.getZoneManager(getServletContext());
            String zoneName = request.getParameter(ZONENAME);
            if(zoneName != null)
            {
                Zone zone = zoneManager.getZoneByName(zoneName);
                List<Item> itemsList = zone.getItemsList();
                JSONArray jsonArray = readingFromItemsListToJsonObject(itemsList, zone);
                String json = gson.toJson(jsonArray);
                out.println(json);
                out.flush();
            }
            else
            {
                System.out.println("Zone name is null!");
            }
        }
        catch(Exception error)
        {
            System.out.println("There was error while reading zone");
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
            jsonObject.put("avgPriceOfItemInSK", decimalFormat.format(zone.getAvgPriceOfItemInSDK(itemSerialNumber)));
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
