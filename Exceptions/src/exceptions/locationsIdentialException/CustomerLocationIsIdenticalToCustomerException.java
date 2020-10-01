package exceptions.locationsIdentialException;

import logic.Customer;

import javax.xml.stream.Location;

public class CustomerLocationIsIdenticalToCustomerException extends IdentialLocationException {

    public CustomerLocationIsIdenticalToCustomerException(Customer firstCustomer, Customer secondCustomer)
    {
        super(firstCustomer,secondCustomer);
    }

}
