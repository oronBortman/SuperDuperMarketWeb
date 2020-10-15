package logic.order;

public abstract class Order {

    private String dateStr;
    private boolean isOrderStatic;
    private boolean isOrderDynamic;

    public Order(String date, boolean isOrderStatic)
    {
        this.dateStr = date;
        this.isOrderStatic = isOrderStatic;
        this.isOrderDynamic = !isOrderStatic;

    }
    public String getDateStr()
    {
        return dateStr;
    }

    public boolean isOrderDynamic() {
        return isOrderDynamic;
    }

    public boolean isOrderStatic() {
        return isOrderStatic;
    }

    public abstract boolean checkIfItemAlreadyExistsInOrder(int serialIDOfItem);
}
