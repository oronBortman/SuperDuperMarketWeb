package exceptions.notExistException;

public class ItemWithSerialIDNotExistInSDMException extends Exception{
    String name=null;
    int serialId;
    public ItemWithSerialIDNotExistInSDMException(int serialId)
    {
        this.serialId = serialId;
    }
    public ItemWithSerialIDNotExistInSDMException(int serialId, String name)
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
