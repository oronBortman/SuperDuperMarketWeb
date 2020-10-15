package exceptions.notExistException;

import logic.Store;

public class ItemIDInDiscountNotExistInSDMException extends Exception{
    Integer storeSerialID;
    String storeName;
    int serialIdOfItem;
    String discountName;
    public ItemIDInDiscountNotExistInSDMException(Integer storeSerialID, String storeName, int serialIdOfItem, String discountName)
    {
        this.storeSerialID = storeSerialID;
        this.storeName = storeName;
        this.serialIdOfItem = serialIdOfItem;
        this.discountName = discountName;
    }

    public String getStoreName() {
        return storeName;
    }

    public Integer getStoreSerialID() {
        return storeSerialID;
    }

    public String getDiscountName() {
        return discountName;
    }

    public int getSerialIdOfItem() {
        return serialIdOfItem;
    }
}
