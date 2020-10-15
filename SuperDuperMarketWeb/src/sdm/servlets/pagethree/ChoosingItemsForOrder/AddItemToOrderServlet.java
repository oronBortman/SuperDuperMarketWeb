package sdm.servlets.pagethree.ChoosingItemsForOrder;

import com.google.gson.Gson;
import javafx.scene.Parent;
import logic.Item;
import logic.order.CustomerOrder.OpenedCustomerOrder1;
import logic.order.StoreOrder.OpenedStoreOrder;
import logic.order.itemInOrder.OrderedItem;
import logic.order.itemInOrder.OrderedItemFromStore;
import logic.zones.Zone;
import logic.zones.ZoneManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sdm.utils.ServletUtils;

import javax.servlet.RequestDispatcher;
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

@WebServlet("/add-item-to-order")
public class AddItemToOrderServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        System.out.println("In AddItemToOrderServlet\n\n\n\n");

        try (PrintWriter out = response.getWriter()) {
            ServletContext servletContext = getServletContext();
            Gson gson = new Gson();
            String orderType = request.getParameter("orderType");
            String serialIDOfItem = request.getParameter("serialIDOfItem");
            String amountOfItem = request.getParameter("amountOfItem");

           Integer serialIdOfItemInt = Integer.parseInt(serialIDOfItem);
            Double amountOfItemDouble = Double.parseDouble(amountOfItem);

            OpenedCustomerOrder1 openedCustomerOrder1 = getCurrentOrderByRequest(servletContext, request);
            if(openedCustomerOrder1 != null)
            {
                if(orderType.equals("static"))
                {
                    openedCustomerOrder1.addItemForStoreOrderInStaticOrder(serialIdOfItemInt,amountOfItemDouble);
                    for(OpenedStoreOrder openedStoreOrder : openedCustomerOrder1.getListOfOpenedStoreOrder())
                    {
                        for(Integer key : openedStoreOrder.getOrderedItemsNotFromSale().keySet())
                        {
                            System.out.println("Added to the order static item: " + key);
                        }
                    }

                }
                else if(orderType.equals("dynamic"))
                {
                    openedCustomerOrder1.addItemToItemsChosenForDynamicOrderMap(serialIdOfItemInt, amountOfItemDouble);
                    for(Integer key : openedCustomerOrder1.getItemsChosenForDynamicOrder().keySet())
                    {
                        System.out.println("Added to the order dynamic item: " + key);
                    }
                }
                RequestDispatcher requestDispatcher = servletContext.getRequestDispatcher("/get-items-that-are-available-in-order");
                requestDispatcher.forward(request, response);

            }
            else
            {
                System.out.println("Zone name is null!");
            }
            String json = gson.toJson(openedCustomerOrder1);
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
