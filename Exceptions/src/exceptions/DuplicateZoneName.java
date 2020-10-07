package exceptions;

public class DuplicateZoneName extends Exception{
    String zoneName=null;
    public DuplicateZoneName(String zoneName)
    {
        this.zoneName = zoneName;
    }

    public String getZoneName() {
        return zoneName;
    }
}
