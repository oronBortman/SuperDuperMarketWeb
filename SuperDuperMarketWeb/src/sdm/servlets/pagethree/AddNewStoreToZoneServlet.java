package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.*;
import org.json.simple.JSONArray;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.users.User;
import logic.users.UserManager;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;

import static sdm.constants.Constants.ZONENAME;
import static sdm.general.GeneralMethods.*;

@WebServlet("/add-a-new-store-to-zone")
public class AddNewStoreToZoneServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        //             data: {"storeName":storeName, "coordinateX":coordinateX, "coordinateY":coordinateY, "PPK":PPK, "itemsChosenForStoreArray": itemsChosenForStoreArray },
        //              itemsChosenForStoreArray:       item["serialID"] = serialID;
        //                                              item["price"] = price;
        //response:["storeNameIsUnique"] != "true"
        response.setContentType("application/json");
     //   System.out.println("In AddNewStoreToZoneServlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();

            ZoneManager zoneManager = ServletUtils.getZoneManager(getServletContext());
            String zoneName = request.getParameter(ZONENAME);
            Zone zone = zoneManager.getZoneByName(zoneName);

            String storeName = request.getParameter("storeName");
            String coordinateX = request.getParameter("coordinateX");
            String coordinateY = request.getParameter("coordinateY");
            String PPK = request.getParameter("PPK");
            String itemsChosenForStoreArray = request.getParameter("itemsChosenForStoreArray");
            UserManager userManager = getUserManagerByServletContext(servletContext);
            User user = userManager.getUserByName(SessionUtils.getUsername(request));

            System.out.println(itemsChosenForStoreArray);
            JSONParser parser = new JSONParser();
            System.out.println("A1");
            if(parser == null)
            {
                System.out.println("parser is null!!");
            }
            JSONArray itemsChosenForStoreArrayJSON = (JSONArray)  parser.parse(itemsChosenForStoreArray);
            System.out.println("A2");

            Integer coordinateXInt = Integer.parseInt(coordinateX);
            Integer coordinateYInt = Integer.parseInt(coordinateY);
            SDMLocation sdmLocation = new SDMLocation(coordinateXInt, coordinateYInt);
            Integer PPKInt = Integer.parseInt(PPK);

            if(user instanceof Seller)
            {
                Boolean thereIsAlreadyStoreInLocation = zone.checkIfLocationAlreadyExists(sdmLocation);
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("thereIsAlreadyStoreInLocation", thereIsAlreadyStoreInLocation.toString());
                if(!thereIsAlreadyStoreInLocation)
                {
                    Store store = new Store(zone.getAvailableStoreID(), storeName, PPKInt, sdmLocation, (Seller)user);
                    zone.addStore(store);
                    addingItemsFromJSON(itemsChosenForStoreArrayJSON, zone, store.getSerialNumber());
                    // store.addItemToStore();
                   /* for(Store storeInLoop : zone.getStoresList())
                    {
                        System.out.println("Store name : " + storeInLoop.getName() +
                                " storeOwner:" + storeInLoop.getStoreOwner() +
                                " store serialNumber:" + storeInLoop.getSerialNumber() +
                                " ppk:" + storeInLoop.getPPK() +
                                " location: (" + storeInLoop.getLocation().getX() + "," + storeInLoop.getLocation().getY() + ")");
                    }*/

                    Seller storeOwner = store.getStoreOwner();
                    Integer totalAvailableItemsInStore = store.getAvailableItemsList().size();
                    Integer totalAvailableItemsInZone = zone.getItemsList().size();
                    Seller zoneOwner = zone.getZoneOwner();
                    if(zoneOwner.getUserName() != storeOwner.getUserName())
                    {
                        zoneOwner.addAlertToList(new AlertOnNewStoreInZone(store,totalAvailableItemsInStore , totalAvailableItemsInZone));
                    }
                }
                System.out.println("AAA");
                out.println(jsonObject);
                out.flush();
            }
        }
        catch(Exception e)
        {
            System.out.println("There was an error in AddNewStoreToZoneServlet " + e.getMessage());
        }
    }


    public void addingItemsFromJSON(JSONArray itemsChosenArrayJSON, Zone zone, Integer storeID)
    {
        for(int i=0; i < itemsChosenArrayJSON.size(); i++ )
        {
            JSONObject jsonObject = (JSONObject) itemsChosenArrayJSON.get(i);
            String serialNumberStr = jsonObject.get("serialNumber").toString();
            String priceStr = jsonObject.get("price").toString();
            Integer serialNumberInt = Integer.parseInt(serialNumberStr);
            Integer priceInt = Integer.parseInt(priceStr);
            System.out.println("serialNumber:" + serialNumberInt + " price: " + priceInt);
            zone.addItemToStore(storeID, serialNumberInt, priceInt);
        }
        for(AvailableItemInStore availableItemInStore : zone.getStoreBySerialID(storeID).getAvailableItemsList())
        {
            System.out.println("Item serial id:" + availableItemInStore.getSerialNumber() + " price:" + availableItemInStore.getPricePerUnit());
        }

    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
