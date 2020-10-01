package exceptions.locationsIdentialException;

import logic.Store;

import javax.xml.stream.Location;

public class StoreLocationIsIdenticalToStoreException extends IdentialLocationException {


    public StoreLocationIsIdenticalToStoreException(Store firstStore, Store secondStore)
    {
       super(firstStore, secondStore);
    }

}
