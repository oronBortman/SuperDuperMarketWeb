package exceptions.InvalidCoordinateException;

public class InvalidCoordinateInCustomerException extends InvalidCoordinateException{

    public InvalidCoordinateInCustomerException(int coord, String name, Integer serialID)
    {
        super(coord, name, serialID);
    }

}
