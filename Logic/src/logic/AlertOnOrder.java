package logic;

import logic.order.StoreOrder.ClosedStoreOrder;

public class AlertOnOrder implements Alert {
    ClosedStoreOrder closedStoreOrder;
    public AlertOnOrder(ClosedStoreOrder closedStoreOrder)
    {
        this.closedStoreOrder = closedStoreOrder;
    }
    public ClosedStoreOrder getClosedStoreOrder() {
        return closedStoreOrder;
    }
}
