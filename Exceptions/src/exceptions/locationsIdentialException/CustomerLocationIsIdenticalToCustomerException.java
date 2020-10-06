package exceptions.locationsIdentialException;

import logic.Customer;
import logic.SDMLocation;

import javax.xml.stream.Location;

public class CustomerLocationIsIdenticalToCustomerException extends Exception{

    Customer firstCustomer;
    SDMLocation firstCustomerLocation;
    Customer secondCustomer;
    SDMLocation secondCustomerLocation;

    public CustomerLocationIsIdenticalToCustomerException(Customer firstCustomer, SDMLocation firstCustomerLocation, Customer secondCustomer, SDMLocation secondCustomerLocation)
    {
        this.firstCustomer = firstCustomer;
        this.firstCustomerLocation = firstCustomerLocation;
        this.secondCustomer = secondCustomer;
        this.secondCustomerLocation = secondCustomerLocation;
    }

}
