package exceptions.InvalidCoordinateException;

public class InvalidCoordinateXOfStoreException extends InvalidCoordinateInStoreException {

    public InvalidCoordinateXOfStoreException(int coord, String name, Integer serialID)
    {
        super(coord, name, serialID);
    }
}
