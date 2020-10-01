package exceptions.notExistException;

public class  SerialIDNotExistException extends Exception{
    String name=null;
    int serialId;
    public SerialIDNotExistException(int serialId)
    {
        this.serialId = serialId;
    }
    public SerialIDNotExistException(int serialId, String name)
    {
        this.serialId = serialId;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public int getSerialId() {
        return serialId;
    }
}
