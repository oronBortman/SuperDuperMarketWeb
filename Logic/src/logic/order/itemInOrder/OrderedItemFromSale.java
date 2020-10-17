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

    @Override
    public Double getTotalPriceOfItemOrderedByTypeOfMeasure() {
        return orderedItemFromStore.getTotalPriceOfItemOrderedByTypeOfMeasure();
    }

    @Override
    public Double getTotalAmountOfItemOrderedByTypeOfMeasure() {
        return orderedItemFromStore.getTotalAmountOfItemOrderedByTypeOfMeasure();
    }

    @Override
    public Double getAmountOfItemOrderedByUnits() {
        return orderedItemFromStore.getAmountOfItemOrderedByUnits();
    }

    @Override
    public Double getTotalPriceOfItemOrderedByUnits() {
        return orderedItemFromStore.getTotalPriceOfItemOrderedByUnits();
    }

    @Override
    public String getName() {
        return orderedItemFromStore.getName();
    }

    @Override
    public Integer getSerialNumber() {
        return orderedItemFromStore.getSerialNumber();
    }

    @Override
    public String getTypeOfMeasureStr() {
        return orderedItemFromStore.getTypeOfMeasureStr();
    }
}
