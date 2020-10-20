package sdm.servlets;

import com.google.gson.Gson;
import logic.AvailableItemInStore;
import logic.Item;
import logic.users.User;
import logic.users.UserManager;
import logic.zones.Zone;
import logic.zones.ZoneManager;
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

import static sdm.constants.Constants.USERNAME;
@WebServlet("/get-item-from-store")
public class GetItemFromStoreServlet extends HttpServlet {

    // urls that starts with forward slash '/' are considered absolute
    // urls that doesn't start with forward slash '/' are considered relative to the place where this servlet request comes from
    // you can use absolute paths, but then you need to build them from scratch, starting from the context path
    // ( can be fetched from request.getContextPath() ) and then the 'absolute' path from it.
    // Each method with it's pros and cons...
    //private final String SDM_MAIN_PAGE_URL = "../sdmmainpage/sdm-main-stores-page.html";

    private final String SIGN_UP_URL = "../signup/signup.html";
    //  private final String LOGIN_ERROR_URL = "/pages/loginerror/login_attempt_after_error.html";  // must start with '/' since will be used in request dispatcher...

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
      //  System.out.println("In GetItemFromStore");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ZoneManager zoneManager = ServletUtils.getZoneManager(getServletContext());
            String itemSerialID = request.getParameter("itemID");
            String storeID = request.getParameter("storeID");
            Integer itemSerialIDInt = Integer.parseInt(itemSerialID);
            Integer storeIDInt = Integer.parseInt(storeID);
            Zone zone = zoneManager.getZoneByName(SessionUtils.getZoneName(request));
            if (zone != null) {
                AvailableItemInStore availableItemInStore = zone.getStoreBySerialID(storeIDInt).getItemBySerialID(itemSerialIDInt);
                String json = gson.toJson(availableItemInStore);
                out.println(json);
             //   System.out.println("This is the item!!");
                System.out.println(json);
                out.flush();
            } else {
                System.out.println("zoneName is null!!");
            }
        } catch (Exception e) {
            System.out.println("Error in get item from store\n" + e);
        }
    }

// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
