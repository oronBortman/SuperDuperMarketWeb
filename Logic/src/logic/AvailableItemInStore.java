package logic;

import javafx.beans.property.SimpleIntegerProperty;

public class AvailableItemInStore extends Item {
    private Integer pricePerUnit;

    public AvailableItemInStore(Integer serialNumber, String name, TypeOfMeasure purchaseCategory, Integer pricePerUnit) {
        super(serialNumber, name, purchaseCategory);
        this.pricePerUnit = pricePerUnit;
    }

   public AvailableItemInStore(Integer serialNumber, String name, TypeOfMeasure purchaseCategory) {
        super(serialNumber, name, purchaseCategory);
    }

    public AvailableItemInStore(Item item, int price) {
        super(item);
        this.pricePerUnit = price;
    }

    public AvailableItemInStore(Item item) {
        super(item);
    }

    public AvailableItemInStore(AvailableItemInStore availableItemInStore) {
        super(availableItemInStore);
        this.pricePerUnit = availableItemInStore.pricePerUnit;
    }

    public Integer getPricePerUnit()
    {
        return pricePerUnit;
    }
    public void setPricePerUnit(Integer pricePerUnit) {this.pricePerUnit = pricePerUnit;}
}
