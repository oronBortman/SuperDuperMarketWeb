package exceptions.locationsIdentialException;

import logic.Customer;
import logic.SDMLocation;
import logic.Store;

public class StoreLocationIsIdenticalToCustomerException extends Exception{

    Store store;
    Customer customer;
    SDMLocation locationOfCustomer;
    public StoreLocationIsIdenticalToCustomerException(Store store, Customer customer, SDMLocation locationOfCustomer)
    {
        this.store = store;
        this.customer = customer;
        this.locationOfCustomer = locationOfCustomer;
       // super(store, locationOfCustomer);
    }

}
