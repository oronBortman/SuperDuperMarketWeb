package logic.order.itemInOrder;

import logic.AvailableItemInStore;

public class OrderedItemFromStoreByQuantity extends OrderedItemFromStore implements OrderedItem {

    public OrderedItemFromStoreByQuantity(Integer serialNumber, String name, int price, Double amountOfItemOrderedByUnits) {
        super(serialNumber, name, TypeOfMeasure.Quantity, price, amountOfItemOrderedByUnits);
    }

    public OrderedItemFromStoreByQuantity(Integer serialNumber, String name, Double amountOfItemOrderedByUnits) {
        super(serialNumber, name, TypeOfMeasure.Quantity, amountOfItemOrderedByUnits);
    }

    public OrderedItemFromStoreByQuantity(AvailableItemInStore availableItemInStore, Double amountOfItemOrderedByUnits) {
        super(availableItemInStore, amountOfItemOrderedByUnits);
    }



    @Override
    public Double getTotalPriceOfItemOrderedByTypeOfMeasure()
    {
        return new Double(getAmountOfItemOrderedByUnits() * getPricePerUnit());
    }

    @Override
    public Double getTotalAmountOfItemOrderedByTypeOfMeasure()
    {
        return new Double(getAmountOfItemOrderedByUnits());
    }

    @Override
    public void addQuantity(Double quantity) {
        setAmountOfItemOrderedByUnits(getAmountOfItemOrderedByUnits() + quantity);
    }

    public void increaseAmountOfItemOrderedByUnits(int UnitsToAdd)
    {
        setAmountOfItemOrderedByUnits(getAmountOfItemOrderedByUnits() + UnitsToAdd);
    }

}
