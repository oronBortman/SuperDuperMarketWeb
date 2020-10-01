package logic.order.StoreOrder;

import logic.BusinessLogic;

public class ClosedStoreOrder extends StoreOrder{

    private Integer serialNumber;
    private double deliveryPrice;
    private double totalPriceOfOrder;
    private Double totalAmountOfItemsByUnit;
    private int totalAmountOfItemTypes;
    private double totalPriceOfItems;


    public ClosedStoreOrder(StoreOrder storeOrder) {
        super(storeOrder);
        this.serialNumber = BusinessLogic.getCurrentOrderSerialIDInSDK();
    }

    public void setSerialNumber(Integer serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Integer getSerialNumber() {
        return serialNumber;
    }

}


