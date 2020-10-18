package sdm.general;

import logic.Customer;
import logic.Seller;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.users.User;
import logic.users.UserManager;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

public class GeneralMethods {

    public static UserManager getUserManagerByServletContext(ServletContext servletContext)
    {
        return ServletUtils.getUserManager(servletContext);
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
