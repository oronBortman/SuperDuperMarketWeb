package logic.order;

public abstract class Order {

    private String date;
    private boolean isOrderStatic;
    private boolean isOrderDynamic;


    public Order(String date, boolean isOrderStatic)
    {
        this.date = date;
        this.isOrderStatic = isOrderStatic;
        this.isOrderDynamic = !isOrderStatic;

    }
    public String getDate()
    {
        return date;
    }

    public boolean isOrderDynamic() {
        return isOrderDynamic;
    }

    public boolean isOrderStatic() {
        return isOrderStatic;
    }

    public abstract boolean checkIfItemAlreadyExistsInOrder(int serialIDOfItem);
}
