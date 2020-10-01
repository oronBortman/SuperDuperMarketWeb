package exceptions.InvalidCoordinateException;

public class InvalidCoordinateYOfCustomerException extends InvalidCoordinateInCustomerException {

    public InvalidCoordinateYOfCustomerException(int coord, String name, Integer serialID)
    {
        super(coord, name, serialID);
    }
}
