package exceptions.notExistException;

import logic.Store;

public class ItemIDInDiscountNotExistInAStoreException extends Exception{
    Integer storeSerialID;
    String storeName;
    int serialIdOfItem;
    String discountName;
    public ItemIDInDiscountNotExistInAStoreException(Integer storeSerialID, String storeName,  int serialIdOfItem, String discountName)
    {
        this.storeSerialID = storeSerialID;
        this.storeName = storeName;
        this.serialIdOfItem = serialIdOfItem;
        this.discountName = discountName;
    }

    public String getDiscountName() {
        return discountName;
    }

    public Integer getStoreSerialID() {
        return storeSerialID;
    }

    public String getStoreName() {
        return storeName;
    }

    public int getSerialIdOfItem() {
        return serialIdOfItem;
    }
}
