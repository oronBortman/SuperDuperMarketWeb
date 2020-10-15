package exceptions.notExistException;

import logic.Store;

public class ItemIDNotExistInAStoreException extends Exception{
    Integer serialIDOfStore;
    String storeName;
    Integer serialIDOfItem;
    public ItemIDNotExistInAStoreException(Integer serialIDOfItem, Integer serialIDOfStore, String storeName)
    {
        this.serialIDOfItem=serialIDOfItem;
        this.serialIDOfStore=serialIDOfStore;
        this.storeName = storeName;

    }

    public Integer getSerialIDOfItem() {
        return serialIDOfItem;
    }

    public Integer getSerialIDOfStore() {
        return serialIDOfStore;
    }

    public String getStoreName() {
        return storeName;
    }
}
