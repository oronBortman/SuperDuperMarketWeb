package logic.order;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.InputStream;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class GeneralMethods {
    private final static String JAXB_XML_GAME_PACKAGE_NAME = "jaxb.schema.generated";
    public static <K, V> Set<K> getSetOfDictionary(Map<K, V> mapToCreateSetFrom)
    {
        Set<K> setOfKeys = new HashSet<K>();
        for(K key : mapToCreateSetFrom.keySet())
        {
            setOfKeys.add(key);
        }
        return setOfKeys;
    }

    public static <K> K deserializeFrom(InputStream in) throws JAXBException {
        JAXBContext jc = JAXBContext.newInstance(JAXB_XML_GAME_PACKAGE_NAME);
        Unmarshaller u = jc.createUnmarshaller();
        return (K) u.unmarshal(in);
    }
}
