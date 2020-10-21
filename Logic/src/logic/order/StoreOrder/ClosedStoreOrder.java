package logic.order.StoreOrder;

import logic.Seller;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.zones.Zone;

public class ClosedStoreOrder extends StoreOrder{

    private Integer serialNumber;
    private double totalDeliveryPrice;
    private double totalPriceOfOrder;
    private double totalDistanceToCustomer;
  //  private Seller storeOwner;
    //private Double totalAmountOfItemsByUnit;
   // private int totalAmountOfItemTypes;
  //  private double totalPriceOfItems;


    public ClosedStoreOrder(StoreOrder storeOrder) {
        super(storeOrder);
        //TODO
        //Check if serial id is by zone or by all of the system
        this.serialNumber = Zone.getCurrentOrderSerialIDInSDK();
    }

    /*public ClosedStoreOrder(Double totalDeliveryPrice, Double totalPriceOfOrder, Double totalDistanceToCustomer, OpenedStoreOrder openedStoreOrder) {
        super(openedStoreOrder);
        this.totalDeliveryPrice = totalDeliveryPrice;
        this.totalPriceOfOrder = totalPriceOfOrder;
        this.totalDistanceToCustomer = totalDistanceToCustomer;
        //Check if serial id is by zone or by all of the system
        this.serialNumber = Zone.getCurrentOrderSerialIDInSDK();
        this.storeOwner = openedStoreOrder.getStoreUsed().getStoreOwner();
    }
*/

    public void setSerialNumber(Integer serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Integer getSerialNumber() {
        return serialNumber;
    }

    public Seller getStoreOwner() {
        return getStoreUsed().getStoreOwner();
    }
}


