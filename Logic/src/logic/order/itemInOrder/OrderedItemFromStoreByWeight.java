package logic.order.itemInOrder;

import logic.AvailableItemInStore;

import java.util.Objects;

public class OrderedItemFromStoreByWeight extends OrderedItemFromStore implements OrderedItem{
    private double amountOfItemOrderedByWeight;
    private static final double amountOfItemOrderedByUnitsInItemWithWeight = 1;
    public OrderedItemFromStoreByWeight(Integer serialNumber, String name, int price, double amountOfItemOrderedByWeight) {
        super(serialNumber, name, TypeOfMeasure.Weight, price, amountOfItemOrderedByUnitsInItemWithWeight);
        this.amountOfItemOrderedByWeight = amountOfItemOrderedByWeight;

    }

    public OrderedItemFromStoreByWeight(AvailableItemInStore availableItemInStore, double amountOfItemOrderedByWeight) {
        super(availableItemInStore, amountOfItemOrderedByUnitsInItemWithWeight);
        this.amountOfItemOrderedByWeight = amountOfItemOrderedByWeight;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        OrderedItemFromStoreByWeight that = (OrderedItemFromStoreByWeight) o;
        return Double.compare(that.amountOfItemOrderedByWeight, amountOfItemOrderedByWeight) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), amountOfItemOrderedByWeight);
    }

    @Override
    public void addQuantity(Double quantity) {
        this.amountOfItemOrderedByWeight += quantity;
    }

    OrderedItemFromStoreByWeight(Integer serialNumber, String name, double amountOfItemOrderedByWeight) {
        super(serialNumber, name, TypeOfMeasure.Weight, amountOfItemOrderedByUnitsInItemWithWeight);
        this.amountOfItemOrderedByWeight = amountOfItemOrderedByWeight;

    }

    @Override
    public Double getTotalPriceOfItemOrderedByTypeOfMeasure()
    {
        return amountOfItemOrderedByWeight * getPricePerUnit();
    }

    @Override
    public Double getTotalAmountOfItemOrderedByTypeOfMeasure()
    {
        return amountOfItemOrderedByWeight;
    }

    public void increaseAmountOfItemOrderedByWeight(double weightToAdd)
    {
        amountOfItemOrderedByWeight += weightToAdd;
    }

    public double getAmountOfItemOrderedByWeight()
    {
        return amountOfItemOrderedByWeight;
    }
}
