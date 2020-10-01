package exceptions.duplicateSerialID;

public class DuplicateCustomerSerialIDException  extends DuplicateSerialIDExceptionInSDM{

    public DuplicateCustomerSerialIDException(int serialId, String name)
    {
        super(serialId, name);
    }
}
