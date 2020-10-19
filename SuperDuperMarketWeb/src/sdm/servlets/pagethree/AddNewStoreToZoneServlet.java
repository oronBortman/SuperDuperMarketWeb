package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.SDMLocation;
import logic.Seller;
import logic.Store;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.users.User;
import logic.users.UserManager;
import logic.zones.Zone;
import org.json.simple.JSONObject;
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
        System.out.println("In AddNewStoreToZoneServlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            String json=null;
            String storeName = request.getParameter("storeName");
            String coordinateX = request.getParameter("coordinateX");
            String coordinateY = request.getParameter("coordinateY");
            String PPK = request.getParameter("PPK");
            String itemsChosenForStoreArray = request.getParameter("itemsChosenForStoreArray");
            Zone zone = getZoneByRequest(servletContext,request);
            UserManager userManager = getUserManagerByServletContext(servletContext);
            User user = userManager.getUserByName(SessionUtils.getUsername(request));

            Integer coordinateXInt = Integer.parseInt(coordinateX);
            Integer coordinateYInt = Integer.parseInt(coordinateY);
            SDMLocation sdmLocation = new SDMLocation(coordinateXInt, coordinateYInt);
            Integer PPKInt = Integer.parseInt(PPK);
            if(user instanceof Seller)
            {
                Boolean storeInUnique = zone.checkIfLocationAlreadyExists(sdmLocation);
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("storeLocationIsUnique", storeInUnique);
                zone.addStore(new Store(zone.getAvailableStoreID(), storeName, PPKInt, sdmLocation, (Seller)user));
                json = gson.toJson(zone);
                out.println(json);
                out.flush();
            }
        }
        catch(Exception e)
        {
            System.out.println("There was an error in AddNewStoreToZoneServlet " + e.getMessage());
        }
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
