package sdm.utils;

//import engine.chat.ChatManager;
import logic.zones.ZoneManager;
import logic.users.UserManager;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import static sdm.constants.Constants.INT_PARAMETER_ERROR;

public class ServletUtils {

	private static final String USER_MANAGER_ATTRIBUTE_NAME = "userManager";
	private static final String ZONE_MANAGER_ATTRIBUTE_NAME = "zoneManager";

	/*
	Note how the synchronization is done only on the question and\or creation of the relevant managers and once they exists -
	the actual fetch of them is remained un-synchronized for performance POV
	 */
	private static final Object userManagerLock = new Object();
	private static final Object chatManagerLock = new Object();

	public static UserManager getUserManager(ServletContext servletContext) {

		synchronized (userManagerLock) {
			if (servletContext.getAttribute(USER_MANAGER_ATTRIBUTE_NAME) == null) {
				servletContext.setAttribute(USER_MANAGER_ATTRIBUTE_NAME, new UserManager());
			}
		}
		return (UserManager) servletContext.getAttribute(USER_MANAGER_ATTRIBUTE_NAME);
	}

	public static ZoneManager getZoneManager(ServletContext servletContext) {

		synchronized (userManagerLock) {
			if (servletContext.getAttribute(ZONE_MANAGER_ATTRIBUTE_NAME) == null) {
				servletContext.setAttribute(ZONE_MANAGER_ATTRIBUTE_NAME, new ZoneManager());
			}
		}
		return (ZoneManager) servletContext.getAttribute(ZONE_MANAGER_ATTRIBUTE_NAME);
	}

	/*public static ChatManager getChatManager(ServletContext servletContext) {
		synchronized (chatManagerLock) {
			if (servletContext.getAttribute(CHAT_MANAGER_ATTRIBUTE_NAME) == null) {
				servletContext.setAttribute(CHAT_MANAGER_ATTRIBUTE_NAME, new ChatManager());
			}
		}
		return (ChatManager) servletContext.getAttribute(CHAT_MANAGER_ATTRIBUTE_NAME);
	}*/

	public static int getIntParameter(HttpServletRequest request, String name) {
		String value = request.getParameter(name);
		if (value != null) {
			try {
				return Integer.parseInt(value);
			} catch (NumberFormatException numberFormatException) {
			}
		}
		return INT_PARAMETER_ERROR;
	}
}
