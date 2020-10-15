package exceptions.locationsIdentialException;

import logic.Customer;
import logic.SDMLocation;

import javax.xml.stream.Location;

public class CustomerLocationIsIdenticalToCustomerException extends Exception{

    String  firstCustomerName;
    Integer firstCustomerCoordinateX;
    Integer firstCustomerCoordinateY;
    String  secondCustomerName;
    Integer secondCustomerCoordinateX;
    Integer secondtCustomerCoordinateY;

    public CustomerLocationIsIdenticalToCustomerException(String firstCustomerName, Integer firstCustomerCoordinateX, Integer firstCustomerCoordinateY, String secondCustomerName, Integer secondCustomerCoordinateX, Integer secondtCustomerCoordinateY)
    {
        this.firstCustomerName = firstCustomerName;
        this.firstCustomerCoordinateX = firstCustomerCoordinateX;
        this.firstCustomerCoordinateY = firstCustomerCoordinateY;

        this.secondCustomerName = secondCustomerName;
        this.secondCustomerCoordinateX = secondCustomerCoordinateX;
        this.secondtCustomerCoordinateY = secondtCustomerCoordinateY;
    }

    public Integer getFirstCustomerCoordinateX() {
        return firstCustomerCoordinateX;
    }

    public Integer getFirstCustomerCoordinateY() {
        return firstCustomerCoordinateY;
    }

    public Integer getSecondCustomerCoordinateX() {
        return secondCustomerCoordinateX;
    }

    public Integer getSecondtCustomerCoordinateY() {
        return secondtCustomerCoordinateY;
    }

    public String getFirstCustomerName() {
        return firstCustomerName;
    }

    public String getSecondCustomerName() {
        return secondCustomerName;
    }
}
