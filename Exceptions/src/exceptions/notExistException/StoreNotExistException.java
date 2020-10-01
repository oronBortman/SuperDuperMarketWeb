package exceptions.notExistException;

public class StoreNotExistException extends Exception{
    String name=null;
    int serialId;
    public StoreNotExistException(int serialId)
    {
        this.serialId = serialId;
    }
    public StoreNotExistException(int serialId, String name)
    {
        this.serialId = serialId;
        this.name = name;
    }

    public String getName() {
        return name;
    }
    public boolean hasName() {return name != null;};

    public int getSerialId() {
        return serialId;
    }
}
