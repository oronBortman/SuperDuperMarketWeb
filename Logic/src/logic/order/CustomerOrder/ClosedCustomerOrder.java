package logic.order.CustomerOrder;

import logic.Customer;
import logic.SDMLocation;
import logic.order.Order;
import logic.order.StoreOrder.ClosedStoreOrder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toCollection;

public class ClosedCustomerOrder extends Order {

    SDMLocation locationOfCustomer;
    String customerName;
    Integer SerialNumber;
    Map<Integer, ClosedStoreOrder> closedStoresOrderMapByStoreSerialID;

    public ClosedCustomerOrder(String date, Map<Integer, ClosedStoreOrder> closedStoresOrderMapByStoreSerialID , boolean isOrderStatic, String customerName, SDMLocation locationOfCustomer)
    {
        super(date, isOrderStatic);
        this.closedStoresOrderMapByStoreSerialID = closedStoresOrderMapByStoreSerialID;
        this.customerName = customerName;
        this.locationOfCustomer = locationOfCustomer;
    }

    public Map<Integer, ClosedStoreOrder> getClosedStoresOrderMapByStoreSerialID() {
        return closedStoresOrderMapByStoreSerialID;
    }

    public double getDeliveryPriceAfterOrderBySerialIDOfStore(int serialID)
    {
        return closedStoresOrderMapByStoreSerialID.get(serialID).calcTotalDeliveryPrice();
    }

    public double getDeliveryPriceAfterOrderBySerialIDOfItem(int serialIDOfItem)
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().filter(closedStoreOrder -> closedStoreOrder.checkIfItemAlreadyExistsInOrder(serialIDOfItem)).mapToDouble(x->x.calcTotalDeliveryPrice()).sum();

    }

    public double getTotalPriceOfStoreOrderBySerialIDOfStore(int serialID)
    {
        return closedStoresOrderMapByStoreSerialID.get(serialID).calcTotalDeliveryPrice();
    }
    public Double getTotalAmountOfItemTypesOfStoreOrderBySerialIDOfItem(int serialIDOfItem)
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().filter(closedStoreOrder -> closedStoreOrder.checkIfItemAlreadyExistsInOrder(serialIDOfItem)).mapToDouble(x->x.calcTotalAmountOfItemsByUnit()).sum();
    }
    
    public double getTotalPriceOfItemsOfStoreOrderBySerialIDOfItem(int serialIDOfItem)
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().filter(closedStoreOrder -> closedStoreOrder.checkIfItemAlreadyExistsInOrder(serialIDOfItem)).mapToDouble(x->x.calcTotalPriceOfItems()).sum();

    }

    public List<ClosedStoreOrder> generateListOfClosedStoreOrders()
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().collect(toCollection(ArrayList::new));
    }

    public void setSerialNumber(Integer serialNumber) {
        this.SerialNumber = serialNumber;
    }

    public Double getTotalItemCostInOrder()
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().mapToDouble(x->x.calcTotalPriceOfItems()).sum();
    }

    public Double getTotalOrderPriceWithoutDelivery()
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().mapToDouble(x->x.calcTotalPriceOfItems()).sum();
    }

    public Double getTotalDeliveryPriceInOrder()
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().mapToDouble(x->x.calcTotalDeliveryPrice()).sum();

    }

    public Double getTotalOrderPrice()
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().mapToDouble(x->x.calcTotalPriceOfOrder()).sum();

    }

    public String getCustomerName() {
        return customerName;
    }

    public SDMLocation getLocationOfCustomer() {
        return locationOfCustomer;
    }
    

    public Integer getSerialNumber() {
        return SerialNumber;
    }

    public boolean checkIfItemAlreadyExistsInOrder(int serialIDOfItem) {
        return false;
    }
}
