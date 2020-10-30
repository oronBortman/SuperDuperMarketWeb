package sdm.servlets.pagethree.CreateOrder;

import com.google.gson.Gson;
import logic.SDMLocation;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.users.User;
import logic.users.UserManager;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/create-dynamic-order")
public class CreateDynamicOrderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            User user = userManager.getUserByName(SessionUtils.getUsername(request));
            String date = request.getParameter("date");
            String coordinateX = request.getParameter("coordinateX");
            String coordinateY = request.getParameter("coordinateY");

            if(date != null && coordinateX != null && coordinateY != null)
            {
                int coordinateXInt = Integer.parseInt(coordinateX);
                int coordinateYInt = Integer.parseInt(coordinateY);

                //LocalDate date, Customer customer, boolean isOrderStatic, SDMLocation locationOfCustomer
                //TODO
                //Need to check if there is no store in this coordinates
                OpenedCustomerOrder openedCustomerOrder = new OpenedCustomerOrder(date, user.getUserName(), false, new SDMLocation(coordinateXInt, coordinateYInt));
                user.setCurrentOpenedOrder(openedCustomerOrder);
                String json = gson.toJson(openedCustomerOrder);
                out.println(json);
                out.flush();
            }
            else
            {
                System.out.println("one of the parameters is null");
            }
        }
        catch(Exception e)
        {
            System.out.println("Error in creating opedCustomerOrder\n" + e.getMessage());
        }
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
