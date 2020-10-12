package sdm.servlets.pagetwo;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import logic.Seller;
import logic.users.User;
import logic.users.UserManager;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONArray;
import sdm.utils.ServletUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import org.json.simple.JSONObject;

@WebServlet("/zones-list")
public class ZonesListServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ZoneManager zoneManager = ServletUtils.getZoneManager(getServletContext());
            Set<Zone> zonesList = zoneManager.getZonesMap().values().stream().collect(Collectors.toCollection(HashSet<Zone>::new));
            JSONArray jsonArray = readingFromZonesListToJsonObject(zonesList);
            out.println(jsonArray);
            //System.out.println(jsonArray);
            out.flush();
        }
    }

    public JSONArray readingFromZonesListToJsonObject(Set<Zone> zoneslist)
    {
        JSONArray jsonArray = new JSONArray();
        int i=0;
        for(Zone zone : zoneslist)
        {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("zoneOwner", zone.getZoneOwner().getUserName());
            jsonObject.put("zoneName", zone.getZoneName());
            jsonObject.put("totalItemsTypesInZone", zone.calcTotalItemsTypeInZone());
            jsonObject.put("totalStoresInZone", zone.calcTotalStoresInZone());
            jsonObject.put("totalOrdersInZone", zone.calcTotalOrdersInZone());
            jsonObject.put("avgOfOrdersNotIncludingDeliveries",zone.calcAvgOfOrdersNotIncludingDeliveries());
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
