package sdm.servlets.pagethree.discounts;

import com.google.gson.Gson;
import logic.order.CustomerOrder.OpenedCustomerOrder;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static sdm.general.GeneralMethods.getCurrentOrderByRequest;

@WebServlet("/initialize-discounts-in-order")
public class InitializeDiscountsInOrderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        //{"discountName":discountName};
        response.setContentType("application/json");
        System.out.println("In ApplyAllOrNothingDiscountServlet");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            ServletContext servletContext = getServletContext();
            OpenedCustomerOrder openedCustomerOrder = getCurrentOrderByRequest(servletContext, request);
            openedCustomerOrder.initializeAvailableDiscountMapInOpenedStoreOrders();
            openedCustomerOrder.initializeItemsAmountLeftToUseInSalesMapInOpenedStoreOrders();
            String json = gson.toJson(openedCustomerOrder);
            out.println(json);
            System.out.println(json);
            out.flush();
        }
        catch (Exception e)
        {
            System.out.println("There was an error in InitializeDiscountsInOrderServlet:\n" + e.getMessage());
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
