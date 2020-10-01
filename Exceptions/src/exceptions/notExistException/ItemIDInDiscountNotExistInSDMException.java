package exceptions.notExistException;

import logic.Store;

public class ItemIDInDiscountNotExistInSDMException extends Exception{
    Store store;
    int serialIdOfItem;
    String discountName;
    public ItemIDInDiscountNotExistInSDMException(Store store, int serialIdOfItem, String discountName)
    {
        this.store = store;
        this.serialIdOfItem = serialIdOfItem;
        this.discountName = discountName;
    }

    public Store getStore() {
        return store;
    }

    public String getDiscountName() {
        return discountName;
    }

    public int getSerialIdOfItem() {
        return serialIdOfItem;
    }
}
