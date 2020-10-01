package logic.order.itemInOrder;

import logic.Item;
import logic.AvailableItemInStore;

import java.util.Objects;

public abstract class OrderedItemFromStore extends AvailableItemInStore implements OrderedItem {
    private Double amountOfItemOrderedByUnits;

    /*logic.Orders.orderItems.OrderedItem(Integer serialNumber, String name, TypeOfMeasure purchaseCategory, int price) {
        super(serialNumber, name, purchaseCategory, price);
    }*/

    public OrderedItemFromStore(Integer serialNumber, String name, TypeOfMeasure purchaseCategory, int price, Double amountOfItemOrderedByUnits) {
        super(serialNumber, name, purchaseCategory, price);
        this.amountOfItemOrderedByUnits = amountOfItemOrderedByUnits;
    }

    public OrderedItemFromStore(Integer serialNumber, String name, TypeOfMeasure purchaseCategory, Double amountOfItemOrderedByUnits) {
        super(serialNumber, name, purchaseCategory);
        this.amountOfItemOrderedByUnits = amountOfItemOrderedByUnits;
    }

    public OrderedItemFromStore(Item item, Double amountOfItemOrderedByUnits) {
        super(item);
        this.amountOfItemOrderedByUnits = amountOfItemOrderedByUnits;
    }

    public OrderedItemFromStore(AvailableItemInStore availableItemInStore, Double amountOfItemOrderedByUnits) {
        super(availableItemInStore);
        this.amountOfItemOrderedByUnits = amountOfItemOrderedByUnits;
    }

    public abstract Double getTotalPriceOfItemOrderedByTypeOfMeasure();
    public abstract Double getTotalAmountOfItemOrderedByTypeOfMeasure();

    public Double getAmountOfItemOrderedByUnits()
    {
        return amountOfItemOrderedByUnits;
    }

    public Double getTotalPriceOfItemOrderedByUnits()
    {
        return amountOfItemOrderedByUnits * getPricePerUnit();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderedItemFromStore)) return false;
        OrderedItemFromStore that = (OrderedItemFromStore) o;
        return amountOfItemOrderedByUnits == that.amountOfItemOrderedByUnits;
    }

    @Override
    public int hashCode() {
        return Objects.hash(amountOfItemOrderedByUnits);
    }

    public void setAmountOfItemOrderedByUnits(Double amountOfItemOrderedByUnits)
    {
        this.amountOfItemOrderedByUnits = amountOfItemOrderedByUnits;
    }

    public abstract void addQuantity(Double quantity);


}
