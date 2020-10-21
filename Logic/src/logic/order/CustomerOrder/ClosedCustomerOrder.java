package logic.order.CustomerOrder;

import logic.SDMLocation;
import logic.order.Order;
import logic.order.StoreOrder.ClosedStoreOrder;
import logic.order.StoreOrder.StoreOrder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toCollection;

public class ClosedCustomerOrder extends Order {

    SDMLocation locationOfCustomer;
    String customerName;
    Integer serialNumber;
    Map<Integer, ClosedStoreOrder> closedStoresOrderMapByStoreSerialID;
    static Integer generalSerialNumber;

    static
    {
        generalSerialNumber=1;
    }

    public ClosedCustomerOrder(String date, Map<Integer, ClosedStoreOrder> closedStoresOrderMapByStoreSerialID , boolean isOrderStatic, String customerName, SDMLocation locationOfCustomer)
    {
        super(date, isOrderStatic);
        this.closedStoresOrderMapByStoreSerialID = closedStoresOrderMapByStoreSerialID;
        this.customerName = customerName;
        this.locationOfCustomer = locationOfCustomer;
        this.serialNumber = generalSerialNumber;
        closedStoresOrderMapByStoreSerialID.values().stream().forEach(x->x.setSerialNumber(serialNumber));
        generalSerialNumber++;
    }

    public Double getTotalItemsInOrder()
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().mapToDouble(x->x.calcTotalAmountOfItemsByMeasureType()).sum();
    }

    public Integer getTotalAmountOfStoresInOrder()
    {
        return closedStoresOrderMapByStoreSerialID.size();
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

    public List<ClosedStoreOrder> getListOfClosedStoreOrders()
    {
        return new ArrayList<>(closedStoresOrderMapByStoreSerialID.values());
    }

    public void setSerialNumber(Integer serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Double getTotalItemCostInOrder()
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().mapToDouble(StoreOrder::calcTotalPriceOfItems).sum();
    }

    public Double getTotalOrderPriceWithoutDelivery()
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().mapToDouble(StoreOrder::calcTotalPriceOfItems).sum();
    }

    public Double getTotalDeliveryPriceInOrder()
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().mapToDouble(StoreOrder::calcTotalDeliveryPrice).sum();

    }

    public Double getTotalOrderPrice()
    {
        return closedStoresOrderMapByStoreSerialID.values().stream().mapToDouble(StoreOrder::calcTotalPriceOfOrder).sum();

    }

    public String getCustomerName() {
        return customerName;
    }

    public SDMLocation getLocationOfCustomer() {
        return locationOfCustomer;
    }
    

    public Integer getSerialNumber() {
        return serialNumber;
    }

    public boolean checkIfItemAlreadyExistsInOrder(int serialIDOfItem) {
        return false;
    }
}
