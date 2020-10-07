package logic.zones;

import exceptions.*;
import exceptions.InvalidCoordinateException.InvalidCoordinateXOfStoreException;
import exceptions.InvalidCoordinateException.InvalidCoordinateYOfStoreException;
import exceptions.duplicateSerialID.DuplicateItemSerialIDException;
import exceptions.duplicateSerialID.DuplicateItemSerialIDInStoreException;
import exceptions.duplicateSerialID.DuplicateStoreSerialIDException;
import exceptions.locationsIdentialException.StoreLocationIsIdenticalToStoreException;
import exceptions.notExistException.*;
import jaxb.schema.generated.*;
import logic.Seller;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.*;

import static jdk.nashorn.internal.objects.NativeMath.max;

public class ZoneManager {
    private final static String JAXB_XML_GAME_PACKAGE_NAME = "jaxb.schema.generated";
    Map<String, Zone> zonesMap;
    public ZoneManager()
    {
        zonesMap = new HashMap<>();
    }

    public synchronized void addNewZoneFromXml(InputStream inputStream, Seller zoneOwner) throws DuplicateStoreSerialIDException, InvalidCoordinateYOfStoreException, StoreLocationIsIdenticalToStoreException, InvalidCoordinateXOfStoreException, DuplicateItemSerialIDException, DuplicateItemSerialIDInStoreException, FileNotFoundException, StoreNotExistException, ItemWithSerialIDNotExistInSDMException, JAXBException, ItemIDInDiscountNotExistInAStoreException, ItemIDInDiscountNotExistInSDMException, DuplicateDiscountNameException, ItemIDNotExistInAStoreException, DuplicateZoneName {
        try {
            //InputStream inputStream = new FileInputStream(new File(xmlPath));
            SuperDuperMarketDescriptor superDuperMarketDescriptor = deserializeFrom(inputStream);
            String zoneName = superDuperMarketDescriptor.getSDMZone().getName();
            if(checkIfZoneExists(zoneName))
            {
                throw new DuplicateZoneName(zoneName);
            }
            Zone zone = new Zone(superDuperMarketDescriptor, zoneOwner);
            zonesMap.put(zone.getZoneName(), zone);
        } catch (JAXBException e) {
            e.printStackTrace();
        }
    }
    private synchronized static SuperDuperMarketDescriptor deserializeFrom(InputStream in) throws JAXBException {
        JAXBContext jc = JAXBContext.newInstance(JAXB_XML_GAME_PACKAGE_NAME);
        Unmarshaller u = jc.createUnmarshaller();
        return (SuperDuperMarketDescriptor) u.unmarshal(in);
    }

    public synchronized Map<String, Zone> getZonesMap() {
        return zonesMap;
    }

    public synchronized Zone getZoneByName(String zoneName)
    {
        return zonesMap.get(zoneName);
    }

    public synchronized boolean checkIfZoneExists(String zoneName)
    {
        return zonesMap.containsKey(zoneName);
    }
}

