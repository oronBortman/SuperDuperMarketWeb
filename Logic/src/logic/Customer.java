package logic;

import logic.order.CustomerOrder.ClosedCustomerOrder;
import logic.users.User;

import java.util.HashMap;
import java.util.Map;

public class Customer extends User {

    Map<Integer, ClosedCustomerOrder> mapOfClosedCustomerOrders;
    public Customer(String name)
    {
        super(name, "customer");
        mapOfClosedCustomerOrders = new HashMap<>();
    }

    public void addClosedCustomerOrderToMap(ClosedCustomerOrder closedCustomerOrder)
    {
        mapOfClosedCustomerOrders.put(closedCustomerOrder.getSerialNumber(), closedCustomerOrder);
    }

    public Map<Integer, ClosedCustomerOrder> getMapOfClosedCustomerOrders() {
        return mapOfClosedCustomerOrders;
    }

    public Integer getAmountOfOrders()
    {
        return mapOfClosedCustomerOrders.size();
    }
    public Double getAverageOrderPrice()
    {
        return (mapOfClosedCustomerOrders.values().stream().mapToDouble(x->x.getTotalOrderPrice()).sum()) / getAmountOfOrders();
    }
    public Double getAverageDeliveryPrice()
    {
        return (mapOfClosedCustomerOrders.values().stream().mapToDouble(x->x.getTotalDeliveryPriceInOrder()).sum()) / getAmountOfOrders();

    }


}
