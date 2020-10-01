package logic.order.itemInOrder;

public class OrderedItemFromSale implements  OrderedItem{
    String saleName;
    OrderedItemFromStore orderedItemFromStore;

    public OrderedItemFromSale(String saleName, OrderedItemFromStore orderedItemFromStore)
    {
        this.saleName = saleName;
        this.orderedItemFromStore = orderedItemFromStore;
    }

    public String getSaleName() {
        return saleName;
    }

    public OrderedItemFromStore getOrderedItemFromStore() {
        return orderedItemFromStore;
    }
}
