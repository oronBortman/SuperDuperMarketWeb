package sdm.servlets.pagethree.ChoosingItemsForOrder;

import com.google.gson.Gson;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.order.StoreOrder.OpenedStoreOrder;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static sdm.general.GeneralMethods.getCurrentOrderByRequest;

@WebServlet("/add-item-to-order")
public class AddItemToOrderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            ServletContext servletContext = getServletContext();
            Gson gson = new Gson();
            String orderType = request.getParameter("orderType");
            String serialIDOfItem = request.getParameter("serialIDOfItem");
            String amountOfItem = request.getParameter("amountOfItem");

           Integer serialIdOfItemInt = Integer.parseInt(serialIDOfItem);
            Double amountOfItemDouble = Double.parseDouble(amountOfItem);

            OpenedCustomerOrder openedCustomerOrder = getCurrentOrderByRequest(servletContext, request);
            if(openedCustomerOrder != null)
            {
                if(orderType.equals("static"))
                {
                    openedCustomerOrder.addItemForStoreOrderInStaticOrder(serialIdOfItemInt,amountOfItemDouble);
                }
                else if(orderType.equals("dynamic"))
                {
                    openedCustomerOrder.addItemToItemsChosenForDynamicOrderMap(serialIdOfItemInt, amountOfItemDouble);
                }
                RequestDispatcher requestDispatcher = servletContext.getRequestDispatcher("/get-items-that-are-available-in-order");
                requestDispatcher.forward(request, response);

            }
            else
            {
                System.out.println("Zone name is null!");
            }
            String json = gson.toJson(openedCustomerOrder);
            out.println(json);
            System.out.println(json);
            out.flush();
        }
        catch (Exception error)
        {
            System.out.println("There is error in AddItemToOrderServler:\n" + error.getMessage());
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request,response);
    }
}
