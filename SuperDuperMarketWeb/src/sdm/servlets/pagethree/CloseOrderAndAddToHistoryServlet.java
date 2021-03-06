package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.AlertOnOrder;
import logic.Customer;
import logic.Seller;
import logic.Store;
import logic.order.CustomerOrder.ClosedCustomerOrder;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.order.StoreOrder.ClosedStoreOrder;
import logic.order.StoreOrder.OpenedStoreOrder;
import logic.order.itemInOrder.OrderedItem;
import logic.order.itemInOrder.OrderedItemFromSale;
import logic.users.Account;
import logic.users.User;
import logic.users.UserManager;
import logic.zones.Zone;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sdm.general.GeneralMethods;
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
import java.util.List;

import static sdm.constants.Constants.CUSTOMER;
import static sdm.constants.Constants.SELLER;
import static sdm.general.GeneralMethods.*;

@WebServlet("/close-order-and-add-to-history")
public class CloseOrderAndAddToHistoryServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML

        response.setContentType("application/json");
       // System.out.println("In CloseOrderAndAddToHistory");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            Zone zone = getZoneByRequest(servletContext,request);
            User user = getUserByRequestAndServletContext(servletContext,request);
            String userType = SessionUtils.getUserType(request);

            if(userType.equals(CUSTOMER))
            {
                Customer customer = ((Customer)user);
                OpenedCustomerOrder openedCustomerOrder = getCurrentOrderByRequest(servletContext, request);
                if(openedCustomerOrder == null)
                {
                    System.out.println("openCustomerOrder is null!!");
                }
                ClosedCustomerOrder closedCustomerOrder = openedCustomerOrder.closeCustomerOrder();
                zone.addClosedOrderToHistory(closedCustomerOrder);
                customer.addClosedCustomerOrderToMap(closedCustomerOrder);
                Account customerAccount = customer.getAccount();
                String dateOfOrder = closedCustomerOrder.getDateStr();
                Double totalPriceOfOrder = closedCustomerOrder.getTotalOrderPrice();
                customerAccount.transferMoney(dateOfOrder,totalPriceOfOrder);

                for(ClosedStoreOrder closedStoreOrder : closedCustomerOrder.getListOfClosedStoreOrders())
                {
                    Seller storeOwner = closedStoreOrder.getStoreOwner();
                    Double totalPriceOfStoreOrder = closedStoreOrder.calcTotalPriceOfOrder();
                    Account sellerAccount = storeOwner.getAccount();
                    sellerAccount.gettingMoney(dateOfOrder,totalPriceOfStoreOrder);
                    AlertOnOrder alertOnOrder = new AlertOnOrder(closedStoreOrder);
                    storeOwner.addAlertToList(alertOnOrder);
                }
                GeneralMethods.getOrderManagerByServletContext(servletContext).addClosedCustomerOrderToHistory(closedCustomerOrder);
            }

            String json = gson.toJson(zone);
            out.println(json);
            out.flush();
        }
        catch(Exception e)
        {
            System.out.println("There was an error in ClosedOrderAndAddToHistory " + e.getMessage());
        }
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
