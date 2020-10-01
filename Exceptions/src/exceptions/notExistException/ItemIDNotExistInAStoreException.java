package exceptions.notExistException;

import logic.Store;

public class ItemIDNotExistInAStoreException extends Exception{
    Store store;
    int serialId;
    public ItemIDNotExistInAStoreException(int serialId, Store store)
    {
        this.serialId = serialId;
        this.store = store;
    }

    public Store getStore() {
        return store;
    }

    public int getSerialId() {
        return serialId;
    }
}
