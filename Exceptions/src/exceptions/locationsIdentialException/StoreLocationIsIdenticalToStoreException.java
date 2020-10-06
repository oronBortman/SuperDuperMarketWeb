package exceptions.locationsIdentialException;

import logic.Store;

public class StoreLocationIsIdenticalToStoreException extends Exception{

    Store firstStore;
    Store secondStore;
    public StoreLocationIsIdenticalToStoreException(Store firstStore, Store secondStore)
    {
       this.firstStore = firstStore;
       this.secondStore = secondStore;
    }

}
