package sdm.servlets.pagethree.CreateOrder;

import com.google.gson.Gson;
import logic.Customer;
import logic.Item;
import logic.SDMLocation;
import logic.Store;
import logic.order.CustomerOrder.OpenedCustomerOrder1;
import logic.order.StoreOrder.OpenedStoreOrder;
import logic.users.User;
import logic.users.UserManager;
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
import java.util.List;

import static sdm.constants.Constants.ZONENAME;

@WebServlet("/create-static-order")
public class CreateStaticOrderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        System.out.println("In create-static-order servlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();

            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            User user = userManager.getUserByName(SessionUtils.getUsername(request));
            String date = request.getParameter("date");
            String coordinateX = request.getParameter("coordinateX");
            String coordinateY = request.getParameter("coordinateY");
            String storeIDSelected = request.getParameter("storeIDSelected");

            System.out.println("There are the parameters of the order:");
            System.out.println(date);
            System.out.println(coordinateX);
            System.out.println(coordinateY);
            System.out.println(storeIDSelected);
            System.out.println("\n\n\n\n\n\n\n");

            if (date != null && coordinateX != null && coordinateY != null) {
                int coordinateXInt = Integer.parseInt(coordinateX);
                int coordinateYInt = Integer.parseInt(coordinateY);
                int storeIDSelectedInt = Integer.parseInt(storeIDSelected);

                System.out.println("After parsing:" + date + " " + coordinateX + " " + coordinateY + " " + storeIDSelectedInt);
                //LocalDate date, Customer customer, boolean isOrderStatic, SDMLocation locationOfCustomer
                //TODO
                //Need to check if there is no store in this coordinates
                SDMLocation orderLocation = new SDMLocation(coordinateXInt, coordinateYInt);
                OpenedCustomerOrder1 openedCustomerOrder1 = new OpenedCustomerOrder1(date, user.getUserName(), true, orderLocation);
                ZoneManager zoneManager = ServletUtils.getZoneManager(getServletContext());
                Zone zone = zoneManager.getZoneByName(SessionUtils.getZoneName(request));
                Store storeSelected = zone.getStoreBySerialID(storeIDSelectedInt);
                openedCustomerOrder1.addStoreOrder(new OpenedStoreOrder(storeSelected,date,true,orderLocation));
                user.setCurrentOpenedOrder(openedCustomerOrder1);
                String json = gson.toJson(openedCustomerOrder1);
                out.println(json);
                System.out.println("About to print json of the stqtaic order");
                System.out.println(json);
                out.flush();
            } else {
                System.out.println("one of the parameters is null");
            }
        }
        catch(Exception e)
        {
            System.out.println("Error in creating opedCustomerOrder\n" + e.getMessage());
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
