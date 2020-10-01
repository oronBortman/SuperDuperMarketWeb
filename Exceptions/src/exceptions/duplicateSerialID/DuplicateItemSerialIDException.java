package exceptions.duplicateSerialID;

public class DuplicateItemSerialIDException  extends DuplicateSerialIDExceptionInSDM{

    public DuplicateItemSerialIDException(int serialId, String name)
    {
        super(serialId, name);
    }

}
