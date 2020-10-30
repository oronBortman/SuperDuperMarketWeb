package sdm.general;

import logic.Customer;
import logic.Seller;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.order.OrderManager;
import logic.order.StoreOrder.ClosedStoreOrder;
import logic.users.User;
import logic.users.UserManager;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

public class GeneralMethods {

    public static UserManager getUserManagerByServletContext(ServletContext servletContext)
    {
        return ServletUtils.getUserManager(servletContext);
    }

    public static OrderManager getOrderManagerByServletContext(ServletContext servletContext)
    {
        return ServletUtils.getOrderManager(servletContext);
    }

    public static List<ClosedStoreOrder> getClosedStoreOrderListByIDListOfOrders(ServletContext servletContext, List<Integer> listOfSerialIDOfClosedStoreOrders)
    {
        List<ClosedStoreOrder> closedStoreOrderList = new ArrayList<>();
        OrderManager orderManager = getOrderManagerByServletContext(servletContext);
       // System.out.println("D1");
        if(orderManager == null)
        {
            System.out.println("Order manager is null!!");
        }
        else
        {
           // System.out.println("D2");
            closedStoreOrderList = orderManager.getClosedStoreOrderListByIDListOfOrders(listOfSerialIDOfClosedStoreOrders);
           // System.out.println("D3");
        }
        return closedStoreOrderList;
    }

    public static OpenedCustomerOrder getCurrentOrderByRequest(ServletContext servletContext, HttpServletRequest request)
    {
        UserManager userManager = getUserManagerByServletContext(servletContext);
        return userManager.getUserByName(SessionUtils.getUsername(request)).getCurrentOrder();
    }

    public static Zone getZoneByRequest(ServletContext servletContext, HttpServletRequest request)
    {
        String zoneName = SessionUtils.getZoneName(request);
        ZoneManager zoneManager = ServletUtils.getZoneManager(servletContext);
        return zoneManager.getZoneByName(zoneName);
    }

    public static Customer getCustomerByRequestAndServletContext(ServletContext servletContext, HttpServletRequest request)
    {
        User user = getUserByRequestAndServletContext(servletContext, request);

        if(user instanceof Customer)
        {
            return (Customer)user;
        }
        else
        {
            return null;
        }
    }

    public static Seller getSellerByRequestAndServletContext(ServletContext servletContext, HttpServletRequest request)
    {
        User user = getUserByRequestAndServletContext(servletContext, request);
        if(user instanceof Seller)
        {
            return (Seller)user;
        }
        else
        {
            return null;
        }
    }

    public static User getUserByRequestAndServletContext(ServletContext servletContext, HttpServletRequest request)
    {
        UserManager userManager = ServletUtils.getUserManager(servletContext);
        String userName = SessionUtils.getUsername(request);
        return userManager.getUserByName(userName);
    }
}
