package exceptions.InvalidCoordinateException;

public class InvalidCoordinateException extends Exception{
    String name=null;
    int coord;
    Integer serialID;

    public InvalidCoordinateException(int coord, String name, Integer serialID)
    {
        this.coord = coord;
        this.name = name;
        this.serialID = serialID;
    }

    public String getName() {
        return name;
    }

    public int getCoord() {
        return coord;
    }

    public Integer getSerialID() {
        return serialID;
    }
}
