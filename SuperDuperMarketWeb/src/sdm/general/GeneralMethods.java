package sdm.general;

import logic.order.CustomerOrder.OpenedCustomerOrder;
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
}
