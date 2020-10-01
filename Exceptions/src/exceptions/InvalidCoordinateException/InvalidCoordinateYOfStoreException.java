package exceptions.InvalidCoordinateException;

public class InvalidCoordinateYOfStoreException extends InvalidCoordinateInStoreException {

    public InvalidCoordinateYOfStoreException(int coord, String name, Integer serialID)
    {
        super(coord, name, serialID);
    }
}
