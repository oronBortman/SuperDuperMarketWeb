package logic.order;

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
    //Map<Integer, ClosedStoreOrder> closedStoreOrderMap;

    public OrderManager()
    {
        closedCustomerOrderMap = new HashMap<>();
    //    closedStoreOrderMap = new HashMap<>();
    }

    public synchronized Map<Integer, ClosedCustomerOrder> getClosedCustomerOrderMap() {
        return closedCustomerOrderMap;
    }

   /* public synchronized Map<Integer, ClosedStoreOrder> getClosedStoreOrderMap() {
        return closedStoreOrderMap;
    }*/

    public synchronized List<ClosedStoreOrder> getClosedStoreOrderListByIDListOfOrders(List<Integer> orderSerialIdList)
    {
        List<ClosedStoreOrder> closedStoreOrderList = new ArrayList<>();
       // System.out.println("E1");
        if(orderSerialIdList != null)
        {
            for(Integer orderSerialID : orderSerialIdList)
            {
               // System.out.println("E2");
                if(closedCustomerOrderMap.containsKey(orderSerialID))
                {
                  //  System.out.println("E3");
                    ClosedCustomerOrder closedCustomerOrder = closedCustomerOrderMap.get(orderSerialID);
                  //  System.out.println("E4");
                    closedStoreOrderList = Stream.concat(closedStoreOrderList.stream(), closedCustomerOrder.getListOfClosedStoreOrders().stream()).collect(Collectors.toList());
                }
            }
        }
      //  System.out.println("E5");

        return closedStoreOrderList;

    }

    public void addClosedCustomerOrderToHistory(ClosedCustomerOrder closedCustomerOrder)
    {
        closedCustomerOrderMap.put(closedCustomerOrder.getSerialNumber(),closedCustomerOrder);
    }
}

