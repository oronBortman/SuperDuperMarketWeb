package exceptions.locationsIdentialException;

import logic.Customer;
import logic.SDMLocation;
import logic.Store;

public class StoreLocationIsIdenticalToCustomerException extends Exception{

    Integer storeSerialID;
    String storeName;
    String customerName;
    Integer coordinateXOfCustomer;
    Integer coordinateYOfCustomer;
    public StoreLocationIsIdenticalToCustomerException(Integer storeSerialID,  String storeName, String customerName, Integer coordinateXOfCustomer, Integer coordinateYOfCustomer)
    {
        this.storeSerialID = storeSerialID;
        this.storeName = storeName;
        this.customerName = customerName;
        this.coordinateXOfCustomer = coordinateXOfCustomer;
        this.coordinateYOfCustomer = coordinateYOfCustomer;
    }

    public Integer getCoordinateYOfCustomer() {
        return coordinateYOfCustomer;
    }

    public String getCustomerName() {
        return customerName;
    }

    public Integer getCoordinateXOfCustomer() {
        return coordinateXOfCustomer;
    }

    public Integer getStoreSerialID() {
        return storeSerialID;
    }

    public String getStoreName() {
        return storeName;
    }


}

