package exceptions.InvalidCoordinateException;

public class InvalidCoordinateInStoreException extends InvalidCoordinateException{

    public InvalidCoordinateInStoreException(int coord, String name, Integer serialID)
    {
        super(coord, name, serialID);
    }


}
