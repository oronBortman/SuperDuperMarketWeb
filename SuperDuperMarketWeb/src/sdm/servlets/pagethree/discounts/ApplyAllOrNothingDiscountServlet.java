package sdm.servlets.pagethree.discounts;

import com.google.gson.Gson;
import logic.AvailableItemInStore;
import logic.Store;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sdm.utils.ServletUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static sdm.constants.Constants.ZONENAME;
import static sdm.general.GeneralMethods.getCurrentOrderByRequest;
import static sdm.general.GeneralMethods.getZoneByRequest;

@WebServlet("/apply-all-or-nothing-discount")
public class ApplyAllOrNothingDiscountServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        //{"discountName":discountName};
        response.setContentType("application/json");
        System.out.println("In ApplyAllOrNothingDiscountServlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            String discountName = request.getParameter("discountName");
            OpenedCustomerOrder openedCustomerOrder = getCurrentOrderByRequest(servletContext, request);
            openedCustomerOrder.applyDiscountAllOrNothing(discountName);
            String json = gson.toJson(openedCustomerOrder);
            out.println(json);
            System.out.println(json);
            out.flush();
        }
        catch (Exception e)
        {
            System.out.println("There was an error in ApplyAllOrNothingDiscountServlet:\n" +e.getMessage());
        }
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
