package exceptions.notExistException;

import logic.Store;

public class ItemIDInDiscountNotExistInAStoreException extends Exception{
    Store store;
    int serialIdOfItem;
    String discountName;
    public ItemIDInDiscountNotExistInAStoreException(Store store, int serialIdOfItem, String discountName)
    {
        this.store = store;
        this.serialIdOfItem = serialIdOfItem;
        this.discountName = discountName;
    }

    public String getDiscountName() {
        return discountName;
    }

    public Store getStore() {
        return store;
    }

    public int getSerialIdOfItem() {
        return serialIdOfItem;
    }
}
