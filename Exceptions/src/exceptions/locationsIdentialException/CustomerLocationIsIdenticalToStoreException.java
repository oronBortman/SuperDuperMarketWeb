package exceptions.locationsIdentialException;

import logic.Customer;
import logic.Store;

import javax.xml.stream.Location;

public class CustomerLocationIsIdenticalToStoreException extends IdentialLocationException {

    public CustomerLocationIsIdenticalToStoreException(Customer customer, Store store)
    {
        super(customer, store);
    }

}
