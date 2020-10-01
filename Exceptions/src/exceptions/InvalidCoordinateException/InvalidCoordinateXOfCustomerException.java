package exceptions.InvalidCoordinateException;

public class InvalidCoordinateXOfCustomerException extends InvalidCoordinateInCustomerException {
    public InvalidCoordinateXOfCustomerException(int coord, String name, Integer serialID)
    {
        super(coord, name, serialID);
    }
}
