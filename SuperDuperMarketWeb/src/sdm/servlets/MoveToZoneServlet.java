package sdm.servlets;

import com.google.gson.Gson;
import logic.Item;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sdm.constants.Constants;
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

@WebServlet("/move-to-zone")
public class MoveToZoneServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        final String SDM_MAIN_STORES_PAGE_URL = request.getContextPath() + "/pages/mainstorescreen/sdm-main-stores-page.html";
        System.out.println("In move to zone servlet");
        String zoneName = request.getParameter(ZONENAME);
        System.out.println("Zone name=" + zoneName);
        request.getSession(true).setAttribute(ZONENAME, zoneName);
        System.out.println("C");
       // response.sendRedirect(SDM_MAIN_STORES_PAGE_URL);
        System.out.println("D" + zoneName);

        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ZoneManager sdManager = ServletUtils.getZoneManager(getServletContext());
            Zone zone = sdManager.getZoneByName(zoneName);
            System.out.println(zone.getZoneName() + "????");
            String json = gson.toJson(zone);
            System.out.println(json + "!!!!");
            out.println(json);
            out.flush();
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
