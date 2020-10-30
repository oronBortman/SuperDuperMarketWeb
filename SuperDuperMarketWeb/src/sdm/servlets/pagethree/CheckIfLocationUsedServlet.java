package sdm.servlets.pagethree;

import com.google.gson.Gson;
import logic.*;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONObject;
import sdm.general.GeneralMethods;
import sdm.utils.ServletUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static sdm.constants.Constants.ZONENAME;

@WebServlet("/check-if-location-used")
public class CheckIfLocationUsedServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
     //   System.out.println("In AddNewStoreToZoneServlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();

            Zone zone = GeneralMethods.getZoneByRequest(servletContext, request);

            String coordinateX = request.getParameter("coordinateX");
            String coordinateY = request.getParameter("coordinateY");
            Integer coordinateXInt = Integer.parseInt(coordinateX);
            Integer coordinateYInt = Integer.parseInt(coordinateY);
            SDMLocation sdmLocation = new SDMLocation(coordinateXInt, coordinateYInt);

            Boolean thereIsAlreadyStoreInLocation = zone.checkIfLocationAlreadyExists(sdmLocation);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("thereIsAlreadyStoreInLocation", thereIsAlreadyStoreInLocation.toString());
            out.println(jsonObject);
            out.flush();
        }
        catch(Exception e)
        {
            System.out.println("There was an error in checkIfLocationUsedServlet " + e.getMessage());
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
