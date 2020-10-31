package logic.order;

import logic.Store;
import logic.order.CustomerOrder.ClosedCustomerOrder;
import logic.order.StoreOrder.ClosedStoreOrder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class OrderManager {
    Map<Integer, ClosedCustomerOrder> closedCustomerOrderMap;

    public OrderManager()
    {
        closedCustomerOrderMap = new HashMap<>();
    }

    public synchronized Map<Integer, ClosedCustomerOrder> getClosedCustomerOrderMap() {
        return closedCustomerOrderMap;
    }

    public synchronized List<ClosedStoreOrder> getClosedStoreOrderListByStoreID(Store store)
    {
        List<Integer> orderSerialIdList = store.getListOrdersSerialID();
        System.out.println("Number of orders from store!!!!!:" + store.getSerialNumber() + ":" + orderSerialIdList.size());
        List<ClosedStoreOrder> closedStoreOrderList = new ArrayList<>();
        if(orderSerialIdList != null)
        {
            for(Integer orderSerialID : orderSerialIdList)
            {
                System.out.println("Thee orderSerialID!" + orderSerialID);
                if(closedCustomerOrderMap.containsKey(orderSerialID))
                {
                    ClosedCustomerOrder closedCustomerOrder = closedCustomerOrderMap.get(orderSerialID);
                    closedStoreOrderList = Stream.concat(closedStoreOrderList.stream(), closedCustomerOrder.getListOfClosedStoreOrdersByStoreID(store.getSerialNumber()).stream()).collect(Collectors.toList());
                }
            }

            System.out.println("Number of orders from store$$$$$:" + closedStoreOrderList);
            for(ClosedStoreOrder closedStoreOrder : closedStoreOrderList)
            {
                System.out.println("StoreOrder ID:" + closedStoreOrder.getSerialNumber());
                System.out.println("total price of items: " + closedStoreOrder.calcTotalPriceOfItems() + " total delivery price: " + closedStoreOrder.calcTotalDeliveryPrice());
            }
        }
        return closedStoreOrderList;

    }

    public void addClosedCustomerOrderToHistory(ClosedCustomerOrder closedCustomerOrder)
    {
        closedCustomerOrderMap.put(closedCustomerOrder.getSerialNumber(),closedCustomerOrder);
    }
}

