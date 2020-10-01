package exceptions.duplicateSerialID;

public class DuplicateSerialIDExceptionInSDM extends Exception{
    String name=null;
    int serialId;
    public DuplicateSerialIDExceptionInSDM(int serialId)
    {
        this.serialId = serialId;
    }
    public DuplicateSerialIDExceptionInSDM(int serialId, String name)
    {
        this.serialId = serialId;
        this.name = name;
    }

    public int getSerialId() {
        return serialId;
    }

    public String getName() {
        return name;
    }
}
