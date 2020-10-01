package logic.order;

import java.time.LocalDate;
import java.util.Date;

public abstract class Order {

    private LocalDate date;
    private boolean isOrderStatic;
    private boolean isOrderDynamic;


    public Order(LocalDate date, boolean isOrderStatic)
    {
        this.date = date;
        this.isOrderStatic = isOrderStatic;
        this.isOrderDynamic = !isOrderStatic;

    }
    public LocalDate getDate()
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
