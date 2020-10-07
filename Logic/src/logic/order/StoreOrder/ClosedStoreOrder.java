package logic.order.StoreOrder;

import logic.zones.Zone;

public class ClosedStoreOrder extends StoreOrder{

    private Integer serialNumber;
    private double deliveryPrice;
    private double totalPriceOfOrder;
    private Double totalAmountOfItemsByUnit;
    private int totalAmountOfItemTypes;
    private double totalPriceOfItems;


    public ClosedStoreOrder(StoreOrder storeOrder) {
        super(storeOrder);
        //TODO
        //Check if serial id is by zone or by all of the system
        this.serialNumber = Zone.getCurrentOrderSerialIDInSDK();
    }

    public void setSerialNumber(Integer serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Integer getSerialNumber() {
        return serialNumber;
    }

}


