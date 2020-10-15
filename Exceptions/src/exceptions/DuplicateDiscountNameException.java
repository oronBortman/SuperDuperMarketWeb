package exceptions;

import logic.Store;

public class DuplicateDiscountNameException extends Exception{
    String discountName=null;
    Integer storeID;
    String storeName;
    public DuplicateDiscountNameException(String discountName, Integer storeID, String storeName)
    {
        this.discountName = discountName;
        this.storeID = storeID;
        this.storeName = storeName;
    }

    public String getDiscountName() {
        return discountName;
    }

    public String getStoreName() {
        return storeName;
    }

    public Integer getStoreID() {
        return storeID;
    }
}
