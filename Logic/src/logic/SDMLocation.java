package logic;

import jaxb.schema.generated.Location;
import java.util.Objects;
import java.util.Set;

public class SDMLocation {
    private Integer x;
    private Integer y;

    public SDMLocation(int coordinateX, int coordinateY) {
        this.x = coordinateX;
        this.y = coordinateY;
    }


    public SDMLocation(Location location)
    {
        x = location.getX();
        y = location.getY();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SDMLocation that = (SDMLocation) o;
        return x == that.x &&
                y == that.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }

    private boolean checkCoordinateIsInRange(int coordinate)
    {
        return(coordinate >= 1 && coordinate <= 50);
    }
    
    public Integer getX(){
        return this.x;
    }
    public Integer getY(){
        return this.y;
    }

    public static boolean checkIfLocationCoordinatesIsValid(int coord)
    {
        return ((coord >= 1 && coord <= 50));
    }

    int differenceBetweenXCoordinates(int coordinateXOfOtherLocation)
    {
        return x - coordinateXOfOtherLocation;
    }

    int differenceBetweenYCoordinates(int coordinateYOfOtherLocation)
    {
        return y - coordinateYOfOtherLocation;
    }

    public Double getAirDistanceToOtherLocation(SDMLocation secondLocation)
    {
        int pow = 2;
        int differenceBetweenXCoordinates = differenceBetweenXCoordinates(secondLocation.getX());
        double powOfDifferenceBetweenXCoordinates = Math.pow(differenceBetweenXCoordinates, pow);
        int differenceBetweenYCoordinates = differenceBetweenYCoordinates(secondLocation.getY());
        double powOfDifferenceBetweenYCoordinates = Math.pow(differenceBetweenYCoordinates, pow);
        double sumOfPowOfCooridnateDifferences = powOfDifferenceBetweenXCoordinates + powOfDifferenceBetweenYCoordinates;
        return(Math.sqrt(sumOfPowOfCooridnateDifferences));
    }

    public boolean checkIfCoordinatesMatchToLocation(int coordinateX, int cooridnateY)
    {
        return(x == coordinateX && y == cooridnateY);
    }

    public boolean checkIfCoordinatesMatchToListOfLocations(Set<SDMLocation> setOfLocations)
    {
        boolean coordinateMatches = false;
        for(SDMLocation location : setOfLocations)
        {
            if(checkIfCoordinatesMatchToLocation(location.getX(), location.getY()) == true)
            {
                coordinateMatches = true;
            }
        }
        return coordinateMatches;
    }
}
