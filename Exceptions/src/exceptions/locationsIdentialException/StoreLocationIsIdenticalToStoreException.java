package exceptions.locationsIdentialException;

import logic.Store;

public class StoreLocationIsIdenticalToStoreException extends Exception{

    Integer firstStoreSerialID;
    Integer secondStoreSerialID;
    String firstStoreName;
    String secondStoreName;

    public StoreLocationIsIdenticalToStoreException( Integer firstStoreSerialID, String firstStoreName, Integer secondStoreSerialID, String secondStoreName)
    {
       this.firstStoreSerialID = firstStoreSerialID;
       this.firstStoreName = firstStoreName;
       this.secondStoreSerialID = secondStoreSerialID;
       this.secondStoreName = secondStoreName;
    }

    public Integer getFirstStoreSerialID() {
        return firstStoreSerialID;
    }

    public Integer getSecondStoreSerialID() {
        return secondStoreSerialID;
    }

    public String getFirstStoreName() {
        return firstStoreName;
    }

    public String getSecondStoreName() {
        return secondStoreName;
    }


}
