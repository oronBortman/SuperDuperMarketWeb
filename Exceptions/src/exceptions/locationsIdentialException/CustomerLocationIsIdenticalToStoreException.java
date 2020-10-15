package exceptions.locationsIdentialException;

import logic.Customer;
import logic.SDMLocation;
import logic.Store;

public class CustomerLocationIsIdenticalToStoreException extends Exception {

    Integer storeSerialID;
    String storeName;
    String customerName;
    Integer coordinateXOfCustomer;
    Integer coordinateYOfCustomer;

    public CustomerLocationIsIdenticalToStoreException(String customerName, Integer coordinateXOfCustomer, Integer coordinateYOfCustomer,Integer storeSerialID,  String storeName)
    {
        this.storeSerialID = storeSerialID;
        this.storeName = storeName;
        this.customerName = customerName;
        this.coordinateXOfCustomer = coordinateXOfCustomer;
        this.coordinateYOfCustomer = coordinateYOfCustomer;
    }

    public String getStoreName() {
        return storeName;
    }

    public Integer getStoreSerialID() {
        return storeSerialID;
    }

    public Integer getCoordinateXOfCustomer() {
        return coordinateXOfCustomer;
    }

    public Integer getCoordinateYOfCustomer() {
        return coordinateYOfCustomer;
    }

    public String getCustomerName() {
        return customerName;
    }


}
