package exceptions.locationsIdentialException;

import logic.Customer;
import logic.SDMLocation;
import logic.Store;

import javax.xml.stream.Location;

public class CustomerLocationIsIdenticalToStoreException extends Exception {

    Store store;
    Customer customer;
    SDMLocation locationOfCustomer;

    public CustomerLocationIsIdenticalToStoreException(Customer customer, SDMLocation locationOfCustomer,  Store store)
    {
        this.store = store;
        this.customer = customer;
        this.locationOfCustomer = locationOfCustomer;
    }

}
