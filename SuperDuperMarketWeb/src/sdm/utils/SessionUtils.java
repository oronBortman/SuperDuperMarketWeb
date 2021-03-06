package sdm.utils;

import sdm.constants.Constants;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import static sdm.constants.Constants.ZONENAME;

public class SessionUtils {

    public static String getUsername (HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Object sessionAttribute = session != null ? session.getAttribute(Constants.USERNAME) : null;
        return sessionAttribute != null ? sessionAttribute.toString() : null;
    }

    public static String getUserType(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Object sessionAttribute = session != null ? session.getAttribute(Constants.USERTYPE) : null;
        return sessionAttribute != null ? sessionAttribute.toString() : null;
    }

    public static String getZoneName (HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Object sessionAttribute = session != null ? session.getAttribute(ZONENAME) : null;
        return sessionAttribute != null ? sessionAttribute.toString() : null;
    }

    public static void clearSession (HttpServletRequest request) {
        request.getSession().invalidate();
    }
}