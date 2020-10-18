package logic.order.itemInOrder;

public interface OrderedItem {

    public abstract Double getTotalPriceOfItemOrderedByTypeOfMeasure();
    public abstract Double getTotalAmountOfItemOrderedByTypeOfMeasure();

    public Double getAmountOfItemOrderedByUnits();

    public Double getTotalPriceOfItemOrderedByUnits();

    public String getName();

    public Integer getSerialNumber();
    public String getTypeOfMeasureStr();

    public Integer getPricePerUnit();

}
