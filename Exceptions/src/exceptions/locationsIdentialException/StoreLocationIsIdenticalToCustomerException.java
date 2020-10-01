package exceptions.locationsIdentialException;

import logic.Customer;
import logic.Store;

import javax.xml.stream.Location;

public class StoreLocationIsIdenticalToCustomerException extends IdentialLocationException {

    public StoreLocationIsIdenticalToCustomerException(Store store, Customer customer)
    {
        super(store, customer);
    }

}
