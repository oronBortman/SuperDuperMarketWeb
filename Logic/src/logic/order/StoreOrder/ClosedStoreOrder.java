package logic.order.StoreOrder;

import logic.Seller;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.zones.Zone;

public class ClosedStoreOrder extends StoreOrder{

    private Integer serialNumber;

    public ClosedStoreOrder(StoreOrder storeOrder, Integer serialNumber) {
        super(storeOrder);
        this.serialNumber = serialNumber;
    }

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


