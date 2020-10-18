package logic.zones;

import exceptions.DuplicateDiscountNameException;
import exceptions.InvalidCoordinateException.InvalidCoordinateXOfCustomerException;
import exceptions.InvalidCoordinateException.InvalidCoordinateXOfStoreException;
import exceptions.InvalidCoordinateException.InvalidCoordinateYOfCustomerException;
import exceptions.InvalidCoordinateException.InvalidCoordinateYOfStoreException;
import exceptions.duplicateSerialID.DuplicateItemSerialIDException;
import exceptions.duplicateSerialID.DuplicateItemSerialIDInStoreException;
import exceptions.duplicateSerialID.DuplicateStoreSerialIDException;
import exceptions.locationsIdentialException.StoreLocationIsIdenticalToStoreException;
import exceptions.notExistException.*;
import jaxb.schema.generated.*;
import logic.*;
import logic.discount.Discount;
import logic.order.CustomerOrder.ClosedCustomerOrder;
import logic.order.CustomerOrder.Feedback;
import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.order.GeneralMethods;
import logic.order.StoreOrder.ClosedStoreOrder;
import logic.order.StoreOrder.OpenedStoreOrder;
import logic.order.itemInOrder.OrderedItemFromStoreByQuantity;
import logic.order.itemInOrder.OrderedItemFromStoreByWeight;

import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toCollection;

public class Zone {

    String zoneName;
    private Seller zoneOwner;
    private Map<SDMLocation, Store> storesLocationMap;
    private Map<Integer, Store> storesSerialIDMap;
    private Map<Integer, Item> itemsSerialIDMap;
    private Map<Integer, ClosedCustomerOrder> ordersSerialIDMap;
    private List<Discount> discounts;
    private static Integer currentOrderSerialIDInSDK = 1;

    public Zone(SuperDuperMarketDescriptor superDuperMarketDescriptor, Seller zoneOwner) throws FileNotFoundException, JAXBException, DuplicateItemSerialIDException, DuplicateStoreSerialIDException, InvalidCoordinateYOfStoreException, StoreLocationIsIdenticalToStoreException, InvalidCoordinateXOfStoreException, ItemWithSerialIDNotExistInSDMException, StoreNotExistException, DuplicateItemSerialIDInStoreException, ItemIDInDiscountNotExistInAStoreException, ItemIDInDiscountNotExistInSDMException, DuplicateDiscountNameException, ItemIDNotExistInAStoreException {
        this.zoneOwner = zoneOwner;
        this.zoneName = superDuperMarketDescriptor.getSDMZone1().getName();
        storesLocationMap = new HashMap<>();
        storesSerialIDMap = new HashMap<>();
        itemsSerialIDMap = new HashMap<>();
        ordersSerialIDMap = new HashMap<>();
        discounts = new ArrayList<>();
        currentOrderSerialIDInSDK = 1;
        List<SDMStore> sdmStoreList = superDuperMarketDescriptor.getSDMStores().getSDMStore();
        List<SDMItem> sdmItemList = superDuperMarketDescriptor.getSDMItems().getSDMItem();
        addListOfItemsToItemsSerialIDMapFromXml(sdmItemList);
        addListOfStoreSToStoreSerialIDMapFromXml(sdmStoreList, zoneOwner);
        addListOfItemsToListOfStoreSFromXML(sdmStoreList);
        //TODO
         addListOfDiscountsToListOfStoreSFromXML(sdmStoreList);
    }


    public Map<SDMLocation, Store> getStoresLocationMap() {
        return storesLocationMap;
    }

    public Map<Integer, ClosedCustomerOrder> getOrdersSerialIDMap() {
        return ordersSerialIDMap;
    }

    public Seller getZoneOwner() {
        return zoneOwner;
    }

    public String getZoneName() {
        return zoneName;
    }

    public List<Discount> getDiscounts() {
        return discounts;
    }


    public Integer calcTotalItemsTypeInZone()
    {
        return itemsSerialIDMap.size();
    }

    public Integer calcTotalStoresInZone()
    {
        return storesSerialIDMap.size();
    }
    public Integer calcTotalOrdersInZone()
    {
        return ordersSerialIDMap.size();
    }

    public Double calcAvgOfOrdersNotIncludingDeliveries()
    {
        Double avg = 0.0;
        if(ordersSerialIDMap.size() != 0)
        {
            avg =( ordersSerialIDMap.values().stream().mapToDouble(x->x.getTotalItemCostInOrder()).sum()) / ordersSerialIDMap.size();
        }
        return avg;
    }


    public static Integer getCurrentOrderSerialIDInSDK() {
        return currentOrderSerialIDInSDK;
    }

    public ClosedCustomerOrder getOrderBySerialID(Integer orderSerialID)
    {
        return ordersSerialIDMap.get(orderSerialID);
    }
    public Map<Integer, Store> getStoresSerialIDMap()
    {
        return storesSerialIDMap;
    }
    public Map<Integer, Item> getItemsSerialIDMap()
    {
        return itemsSerialIDMap;
    }

    public Set<Integer> getSetOfStoresSerialID()
    {
        return GeneralMethods.<Integer, Store>getSetOfDictionary(storesSerialIDMap);
    }

    public List<Item> getItemsList()
    {
        return new ArrayList<Item>(itemsSerialIDMap.values());
    }

    public List<Store> getStoresList()
    {
        return new ArrayList<Store>(storesSerialIDMap.values());
    }
    public Set<Integer> getSetOfItemsSerialID()
    {
        return GeneralMethods.<Integer, Item>getSetOfDictionary(itemsSerialIDMap);
    }

    public boolean checkIfLocationIsAsStores(SDMLocation location)
    {
        Set<SDMLocation> setOfLocations = storesLocationMap.keySet();
        return location.checkIfCoordinatesMatchToListOfLocations(setOfLocations);
    }

    public Set<Integer> getSetOfOrdersSerialID()
    {
        return GeneralMethods.<Integer, ClosedCustomerOrder>getSetOfDictionary(ordersSerialIDMap);
    }

    public Item getItemySerialID(Integer serialID)
    {
        return itemsSerialIDMap.get(serialID);
    }

    public Store getStoreBySerialID(Integer shopID)
    {
        return storesSerialIDMap.get(shopID);
    }

    public Item getItemBySerialID(Integer itemID)
    {
        return itemsSerialIDMap.get(itemID);
    }

    public void addClosedOrderToHistory(ClosedCustomerOrder order)
    {
       /* for(ClosedStoreOrder closedStoreOrder : order.getClosedStoresOrderMapByStoreSerialID().values())
        {
            closedStoreOrder.setSerialNumber(currentOrderSerialIDInSDK);
        }
        order.setSerialNumber(currentOrderSerialIDInSDK);*/
        //TODO
        //Need to add closed order to customer
        //order.getCustomerName().addClosedCustomerOrderToMap(order);
        ordersSerialIDMap.put(order.getSerialNumber(), order);
      //  currentOrderSerialIDInSDK++;
    }

    public Integer getHowManyShopsSellesAnItem(Integer itemID)
    {
        int howMuchShopsSellsTheItem=0;
        for(Map.Entry<Integer, Store> entry: storesSerialIDMap.entrySet())
        {
            Store store = entry.getValue();
            if(store.checkIfItemIdExists(itemID))
            {
                howMuchShopsSellsTheItem++;
            }
        }
        return howMuchShopsSellsTheItem;
    }

    public Integer sumAllPricesOfItemInShops(Integer itemID)
    {
        int sumOfAllPricesOfItemInShops=0;
        for(Map.Entry<Integer, Store> entry: storesSerialIDMap.entrySet())
        {
            Store store = entry.getValue();
            if(store.checkIfItemIdExists(itemID))
            {
                sumOfAllPricesOfItemInShops+= store.getItemBySerialID(itemID).getPricePerUnit();
            }
        }
        return sumOfAllPricesOfItemInShops;
    }

    public Integer getAvgPriceOfItemInSDK(Integer itemID)
    {
        int sumOfAllPricesOfItemInShops = sumAllPricesOfItemInShops(itemID);
        int howMuchShopsSellsTheItem = getHowManyShopsSellesAnItem(itemID);
        int aveargePriceOfItemInSDK;

        if(howMuchShopsSellsTheItem != 0)
        {
            aveargePriceOfItemInSDK = sumOfAllPricesOfItemInShops /  howMuchShopsSellsTheItem;
        }
        else
        {
            aveargePriceOfItemInSDK=0;
        }
        return aveargePriceOfItemInSDK;

    }
    final int MIN_PRICE_INITIALIZE = -1;



    public Double getTotalAmountOfSoledItem(Integer itemID)
    {
        return ordersSerialIDMap.values().stream().filter(closedOrder -> closedOrder.checkIfItemAlreadyExistsInOrder(itemID)).mapToDouble(x -> x.getTotalAmountOfItemTypesOfStoreOrderBySerialIDOfItem(itemID)).sum();
    }

    public long getHowMuchTimesTheItemHasBeenOrdered(Integer itemID)
    {
        return ordersSerialIDMap.values().stream().filter(closedOrder -> closedOrder.checkIfItemAlreadyExistsInOrder(itemID)).count();
    }
    public void setStoresSerialIDMap(Map<Integer, Store> shopsSerialIdMap)
    {
        storesSerialIDMap = shopsSerialIdMap;
    }

    public void setStoresLocationMap(Map<SDMLocation, Store> shopsLocationMap)
    {
        storesLocationMap = shopsLocationMap;
    }
    public void setOfItemsSerialID(Map<Integer, Item> itemsSerialIdMap)
    {
        itemsSerialIDMap = itemsSerialIdMap;
    }

    public boolean checkIfItemIdExists(int itemSerialID)
    {
        return itemsSerialIDMap.containsKey(itemSerialID);
    }
    public boolean checkIfStoreExists(int storeSerialID)
    {
        return storesSerialIDMap.containsKey(storeSerialID);
    }

    public void addListOfItemsToItemsSerialIDMapFromXml(List<SDMItem> sdmItemList) throws FileNotFoundException, JAXBException, DuplicateItemSerialIDException {
        for(SDMItem item : sdmItemList)
        {
            addItemToItemsSerialIDMapFromXml(item);
        }
    }

    public void addItemToItemsSerialIDMapFromXml(SDMItem item) throws DuplicateItemSerialIDException, JAXBException, FileNotFoundException {

        if(itemsSerialIDMap != null  && itemsSerialIDMap.containsKey(item.getId()))
        {
            throw new DuplicateItemSerialIDException(item.getId(), item.getName());
        }
        else
        {
            Item itemToAddToMap = new Item(item);
            itemsSerialIDMap.put(item.getId(), itemToAddToMap);
        }

    }

    public void addListOfStoreSToStoreSerialIDMapFromXml(List<SDMStore> storeList, Seller storeOwner) throws DuplicateStoreSerialIDException, InvalidCoordinateYOfStoreException, InvalidCoordinateXOfStoreException, StoreLocationIsIdenticalToStoreException
    {
        for(SDMStore sdmStore : storeList)
        {
            addStoreToStoreSerialIDMapFromXml(sdmStore, storeOwner);
        }
    }


    public void addStoreToStoreSerialIDMapFromXml(SDMStore store, Seller storeOwner ) throws DuplicateStoreSerialIDException, InvalidCoordinateYOfStoreException, InvalidCoordinateXOfStoreException, StoreLocationIsIdenticalToStoreException {

        if(storesSerialIDMap != null  && storesSerialIDMap.containsKey(store.getId()))
        {
            throw new DuplicateStoreSerialIDException(store.getId(), store.getName());
        }
        else
        {
            Store storeToAddToMap = new Store(store, storeOwner);
            SDMLocation storeLocation = storeToAddToMap.getLocation();
            checkIfStoreLocationIsValidAndThrowsExceptionIfNot(storeLocation, storeToAddToMap.getName(), storeToAddToMap.getSerialNumber());
            if(storesLocationMap != null && storesLocationMap.containsKey(storeLocation))
            {

                throw new StoreLocationIsIdenticalToStoreException(storeToAddToMap, storesLocationMap.get(storeLocation));
            }
            /*else if(usersLocationMap != null && usersLocationMap.containsKey(storeLocation))
            {
                throw new StoreLocationIsIdenticalToCustomerException(storeToAddToMap, usersLocationMap.get(storeLocation));
            }*/
            // else
            //{
            storesSerialIDMap.put(store.getId(), storeToAddToMap);
            storesLocationMap.put(storeToAddToMap.getLocation(), storeToAddToMap);
            //}
        }
    }

    public void addListOfDiscountsToListOfStoreSFromXML(List<SDMStore> sdmStoreList) throws ItemIDInDiscountNotExistInAStoreException, ItemIDNotExistInAStoreException, DuplicateDiscountNameException, ItemIDInDiscountNotExistInSDMException {
        for(SDMStore sdmStore : sdmStoreList)
        {
            SDMDiscounts sdmDiscounts = sdmStore.getSDMDiscounts();
            if(sdmDiscounts != null)
            {
                List<SDMDiscount> sdmDiscountList = sdmDiscounts.getSDMDiscount();
                if(sdmDiscountList != null)
                {
                    addListOfDiscountsToStoreFromXML(sdmStore.getId(), sdmStore.getSDMDiscounts().getSDMDiscount());
                }
            }
            else
            {
                System.out.println("There is no discount in store " + sdmStore.getName());
            }
        }

    }

    public void addListOfDiscountsToStoreFromXML(Integer storeID, List<SDMDiscount> sdmDiscounts) throws ItemIDInDiscountNotExistInAStoreException, ItemIDNotExistInAStoreException, DuplicateDiscountNameException, ItemIDInDiscountNotExistInSDMException {
        for(SDMDiscount sdmDiscount : sdmDiscounts)
        {
            addDiscountToStoreFromXML(sdmDiscount, storeID);
        }
    }

    public void addDiscountToStoreFromXML(SDMDiscount sdmDiscount, int storeID) throws DuplicateDiscountNameException, ItemIDNotExistInAStoreException, ItemIDInDiscountNotExistInAStoreException, ItemIDInDiscountNotExistInSDMException {
        Store store = getStoreBySerialID(storeID);
        int itemSerialId = sdmDiscount.getIfYouBuy().getItemId();
        if(itemsSerialIDMap.containsKey(itemSerialId) == false)
        {
            throw new ItemIDInDiscountNotExistInSDMException(storesSerialIDMap.get(storeID),itemSerialId, sdmDiscount.getName());
        }
        else
        {
            store.addDiscountToStoreFromXML(sdmDiscount);
        }
    }

    public void addListOfItemsToListOfStoreSFromXML(List<SDMStore> sdmStoreList) throws ItemWithSerialIDNotExistInSDMException, StoreNotExistException, DuplicateItemSerialIDInStoreException {
        for (SDMStore store : sdmStoreList)
        {
            addListOfItemsToStoreFromXML(store);
        }
    }

        public void addListOfItemsToStoreFromXML(SDMStore sdmStore) throws ItemWithSerialIDNotExistInSDMException, StoreNotExistException, DuplicateItemSerialIDInStoreException {
        SDMPrices pricesInStore = sdmStore.getSDMPrices();
        List<SDMSell> sdmSellList = pricesInStore.getSDMSell();

        for (SDMSell sdmSell : sdmSellList) {
            addItemToStoreFromSDMSell(sdmSell, sdmStore.getId());
        }

    }

    public void addItemToStoreFromSDMSell(SDMSell sdmSell, int storeID) throws ItemWithSerialIDNotExistInSDMException, DuplicateItemSerialIDInStoreException, StoreNotExistException
    {
        int itemID = sdmSell.getItemId();
        Store store = getStoreBySerialID(storeID);

        if(checkIfItemIdExists(itemID) == false)
        {
            throw new ItemWithSerialIDNotExistInSDMException(itemID);
        }
        else if(store == null)
        {
            throw new StoreNotExistException(storeID);
        }
        else if(checkIfItemExistsInStore(storeID, itemID))
        {
            String itemName = getItemBySerialID(itemID).getName();
            throw new DuplicateItemSerialIDInStoreException(storeID, store.getName(), itemID, itemName );
        }
        else
        {
            Item item = getItemBySerialID(itemID);
            int priceOfItem = sdmSell.getPrice();
            addItemToStore(storeID, itemID, priceOfItem);
        }
    }




    public void checkIfCustomerLocationIsValidAndThrowsExceptionIfNot(SDMLocation location, String customerName, Integer serialID) throws InvalidCoordinateXOfCustomerException, InvalidCoordinateYOfCustomerException {
        int coordinateX = location.getX();
        int coordinateY = location.getY();

        if(coordinateX > 50 || coordinateX < 0)
        {
            throw new InvalidCoordinateXOfCustomerException(location.getX(), customerName, serialID);
        }
        else if(coordinateY > 50 || coordinateY < 0)
        {
            throw new InvalidCoordinateYOfCustomerException(location.getY(), customerName, serialID);
        }
    }

    public void checkIfStoreLocationIsValidAndThrowsExceptionIfNot(SDMLocation location, String customerName, Integer serialID) throws InvalidCoordinateYOfStoreException, InvalidCoordinateXOfStoreException {
        if(location.getX() > 50 || location.getX() < 0)
        {
            throw new InvalidCoordinateXOfStoreException(location.getX(), customerName, serialID);

        }
        else if(location.getY() > 50 || location.getY() < 0)
        {
            throw new InvalidCoordinateYOfStoreException(location.getY(), customerName, serialID);
        }
    }

    public List<ClosedCustomerOrder> getClosedCustomerOrderList()
    {
        return ordersSerialIDMap.values().stream().collect(toCollection(ArrayList::new));
    }




    public void checkIfThereIsItemNotInStore() throws ItemNotExistInStoresException {
        for(Map.Entry<Integer, Item> item : itemsSerialIDMap.entrySet())
        {
            if(checkIfItemExistsInStores(item.getKey()) == false)
            {
                throw new ItemNotExistInStoresException(item.getValue());
            }
        }
    }

    public boolean checkIfItemExistsInStores(int itemSerialID)
    {
        boolean itemIsBeingSelled=false;
        for(Store store : storesSerialIDMap.values())
        {
            if(store.checkIfItemIdExists(itemSerialID) == true)
            {
                itemIsBeingSelled=true;
            }
        }
        return itemIsBeingSelled;
    }

    public void addItemToStore(int storeID, int itemID, int priceOfItem)
    {
        storesSerialIDMap.get(storeID).addItemToStore(itemsSerialIDMap.get(itemID), priceOfItem);
    }

    public void removeItemFromStore(int storeID, int itemID)
    {
        storesSerialIDMap.get(storeID).removeItemFromStore(itemID);
    }


    public void updatePriceOfItemInStore(int storeID, int itemID, int priceOfItem)
    {
        storesSerialIDMap.get(storeID).updatePriceOfItem(itemID,priceOfItem);
    }

    public boolean checkIfOnlyCertainStoreSellesItem(int itemID, int storeID)
    {
        boolean onlyInputStoreSellesItem=true;
        for(Map.Entry<Integer, Store> entry : storesSerialIDMap.entrySet())
        {
            if( entry.getKey() != storeID && entry.getValue().checkIfItemIdExists(itemID))
            {
                onlyInputStoreSellesItem=false;
            }
        }
        return onlyInputStoreSellesItem;
    }

    public boolean checkIfItemExistsInStore(int storeID, int itemID)
    {
        return storesSerialIDMap.get(storeID).checkIfItemIdExists(itemID);
    }


    public int getIDOfShopWithCheapestItem(int itemSerialID)
    {
        final int MIN_PRICE_INITIALIZE = -1;
        int minPrice=MIN_PRICE_INITIALIZE;
        int storeSerialIDWithCheapestItem=0;
        for (Map.Entry<Integer, Store> entry : storesSerialIDMap.entrySet())
        {
            int storeSerialId = entry.getKey();
            Store store = entry.getValue();
            AvailableItemInStore item = store.getItemBySerialID(itemSerialID);
            if(item != null)
            {
                int itemPriceInStore = item.getPricePerUnit();
                if(minPrice == MIN_PRICE_INITIALIZE || itemPriceInStore < minPrice)
                {
                    minPrice=itemPriceInStore;
                    storeSerialIDWithCheapestItem = storeSerialId;
                }
            }
        }
        return storeSerialIDWithCheapestItem;
    }

    public Map<Store, List<AvailableItemInStore>> getMapOfShopWithCheapestItemsFromListOfItems(List<Item> listOfItems)
    {
        Store store;
        int storeID;
        HashMap<Store, List<AvailableItemInStore>> mapOfShopsWithCheapestItems = new HashMap<Store, List<AvailableItemInStore>>() ;
        for(Item item : listOfItems)
        {
            if(item != null)
            {
                storeID = getIDOfShopWithCheapestItem(item.getSerialNumber());
                store = storesSerialIDMap.get(storeID);
                AvailableItemInStore itemInStore = store.getItemBySerialID(item.getSerialNumber());
                if(mapOfShopsWithCheapestItems.get(store) == null)
                {
                    mapOfShopsWithCheapestItems.put(store, new ArrayList<AvailableItemInStore>());
                }
                mapOfShopsWithCheapestItems.get(store).add(itemInStore);
            }
        }
        return mapOfShopsWithCheapestItems;
    }

    public ArrayList<Item> addItemsToItemListFromOrderedItemsMap(Map<Integer, Double> orderedItemsListByItemSerialID)
    {
        ArrayList<Item> itemsList = new ArrayList<>();
        for (Map.Entry<Integer, Double> entry : orderedItemsListByItemSerialID.entrySet()) {
            Integer itemSerialID = entry.getKey();
            itemsList.add(getItemBySerialID(itemSerialID));
        }
        return itemsList;
    }
   /*
    public ArrayList<Item> addQuantityItemsToItemListFromOrderedItemsMap(Map<Integer, Integer> orderedItemsListByItemSerialID)
    {
        ArrayList<Item> itemsList = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : orderedItemsListByItemSerialID.entrySet()) {
            Integer itemSerialID = entry.getKey();
            itemsList.add(getItemBySerialID(itemSerialID));
        }
        return itemsList;
    }

    public  ArrayList<Item> addWeightItemsToItemListFromOrderedItemsMap(Map<Integer, Double> orderedItemsListByItemSerialID)
    {
        ArrayList<Item> itemsList = new ArrayList<Item>();
        for (Map.Entry<Integer, Double> entry : orderedItemsListByItemSerialID.entrySet()) {
            Integer itemSerialID = entry.getKey();
            itemsList.add(getItemBySerialID(itemSerialID));
        }
        return itemsList;
    }*/


   /* public OpenedCustomerOrder1 updateItemsWithAmountAndCreateOpenedDynamicCustomerOrder(Customer customer, String date, Map<Integer, Double> orderedItemsListByItemSerialIDAndWeight, Map<Integer, Integer> orderedItemsListByItemSerialIDAndQuantity, SDMLocation locationOfCustomer)
    {
        List<Item> itemsList = new ArrayList<>();
        OpenedCustomerOrder1 openedCustomerOrder = new OpenedCustomerOrder1(date, customer.getUserName(), false, locationOfCustomer);
        ArrayList<Item> itemsListFromQuantityList = addQuantityItemsToItemListFromOrderedItemsMap(orderedItemsListByItemSerialIDAndQuantity);
        ArrayList<Item> itemsListFromWeightList = addWeightItemsToItemListFromOrderedItemsMap(orderedItemsListByItemSerialIDAndWeight);
        itemsList = Stream.concat(itemsList.stream(), itemsListFromQuantityList.stream()).collect(Collectors.toList());;
        itemsList = Stream.concat(itemsList.stream(), itemsListFromWeightList.stream()).collect(Collectors.toList());;
        Map<Store, List<AvailableItemInStore>> mapOfShopWithCheapestItems = getMapOfShopWithCheapestItemsFromListOfItems(itemsList);

        for (Map.Entry<Store, List<AvailableItemInStore>> entry : mapOfShopWithCheapestItems.entrySet()) {
            Store storeUsed = entry.getKey();
            List<AvailableItemInStore> availableItemInStoreList = entry.getValue();
            //OpenedStoreOrder openedStoreOrder = new OpenedStoreOrder(storeUsed, date, isOrderStatic, customer.getLocation());
            OpenedStoreOrder openedStoreOrder = new OpenedStoreOrder(storeUsed, date, false, locationOfCustomer);

            for (AvailableItemInStore itemInStore : availableItemInStoreList) {
                if(itemInStore.getTypeOfMeasure() == Item.TypeOfMeasure.Weight) { addWeightItemToOpenedOrder(orderedItemsListByItemSerialIDAndWeight, itemInStore, openedStoreOrder);}
                else if(itemInStore.getTypeOfMeasure() == Item.TypeOfMeasure.Quantity) { addQuantityItemToOpenedOrder(orderedItemsListByItemSerialIDAndQuantity, itemInStore, openedStoreOrder);}
            }
            openedCustomerOrder.addStoreOrder(openedStoreOrder);
        }
        return openedCustomerOrder;
    }*/

    public void updateItemsWithAmountAndCreateOpenedDynamicCustomerOrder(OpenedCustomerOrder openedCustomerOrder)
    {
        Map<Integer, Double> itemsChosenForDynamicOrder = openedCustomerOrder.getItemsChosenForDynamicOrder();
        List<Item> itemsList = addItemsToItemListFromOrderedItemsMap(itemsChosenForDynamicOrder);
        Map<Store, List<AvailableItemInStore>> mapOfShopWithCheapestItems = getMapOfShopWithCheapestItemsFromListOfItems(itemsList);

        for (Map.Entry<Store, List<AvailableItemInStore>> entry : mapOfShopWithCheapestItems.entrySet()) {
            Store storeUsed = entry.getKey();
            List<AvailableItemInStore> availableItemInStoreList = entry.getValue();
            //OpenedStoreOrder openedStoreOrder = new OpenedStoreOrder(storeUsed, date, isOrderStatic, customer.getLocation());
            OpenedStoreOrder openedStoreOrder = new OpenedStoreOrder(storeUsed, openedCustomerOrder.getDateStr(), false, openedCustomerOrder.getLocationOfCustomer(), openedCustomerOrder.getCustomerName());

            for (AvailableItemInStore itemInStore : availableItemInStoreList) {
                //   addItemToOpenedOrder(orderedItemsListByItemSerialIDAndAmount, itemInStore, openedStoreOrder);
                if(itemInStore.getTypeOfMeasure() == Item.TypeOfMeasure.Weight) { addWeightItemToOpenedOrder(itemsChosenForDynamicOrder, itemInStore, openedStoreOrder);}
                else if(itemInStore.getTypeOfMeasure() == Item.TypeOfMeasure.Quantity) { addQuantityItemToOpenedOrder(itemsChosenForDynamicOrder, itemInStore, openedStoreOrder);}
            }
            openedCustomerOrder.addStoreOrder(openedStoreOrder);
        }
    }
/*    public OpenedCustomerOrder1 updateItemsWithAmountAndCreateOpenedDynamicCustomerOrder(Customer customer, String date, Map<Integer, Double> orderedItemsListByItemSerialIDAndAmount, SDMLocation locationOfCustomer)
    {
        OpenedCustomerOrder1 openedCustomerOrder = new OpenedCustomerOrder1(date, customer.getUserName(), false, locationOfCustomer);
        List<Item> itemsList = addItemsToItemListFromOrderedItemsMap(orderedItemsListByItemSerialIDAndAmount);
        Map<Store, List<AvailableItemInStore>> mapOfShopWithCheapestItems = getMapOfShopWithCheapestItemsFromListOfItems(itemsList);

        for (Map.Entry<Store, List<AvailableItemInStore>> entry : mapOfShopWithCheapestItems.entrySet()) {
            Store storeUsed = entry.getKey();
            List<AvailableItemInStore> availableItemInStoreList = entry.getValue();
            //OpenedStoreOrder openedStoreOrder = new OpenedStoreOrder(storeUsed, date, isOrderStatic, customer.getLocation());
            OpenedStoreOrder openedStoreOrder = new OpenedStoreOrder(storeUsed, date, false, locationOfCustomer);

            for (AvailableItemInStore itemInStore : availableItemInStoreList) {
             //   addItemToOpenedOrder(orderedItemsListByItemSerialIDAndAmount, itemInStore, openedStoreOrder);
                if(itemInStore.getTypeOfMeasure() == Item.TypeOfMeasure.Weight) { addWeightItemToOpenedOrder(orderedItemsListByItemSerialIDAndAmount, itemInStore, openedStoreOrder);}
                else if(itemInStore.getTypeOfMeasure() == Item.TypeOfMeasure.Quantity) { addQuantityItemToOpenedOrder(orderedItemsListByItemSerialIDAndAmount, itemInStore, openedStoreOrder);}
            }
            openedCustomerOrder.addStoreOrder(openedStoreOrder);
        }
        return openedCustomerOrder;
    }*/

    public void addWeightItemToOpenedOrder(Map<Integer, Double> orderedItemsListByItemSerialIDAndAmount, AvailableItemInStore itemInStore, OpenedStoreOrder openedStoreOrder)
    {
        int itemSerialID = itemInStore.getSerialNumber();
        if (orderedItemsListByItemSerialIDAndAmount.containsKey(itemSerialID)) {
            double amountOfItem = orderedItemsListByItemSerialIDAndAmount.get(itemSerialID);
            OrderedItemFromStoreByWeight orderedItemFromStoreByWeight = new OrderedItemFromStoreByWeight(itemInStore, amountOfItem);
            openedStoreOrder.addItemToItemsMapOfOrder(orderedItemFromStoreByWeight);
        }
    }

    public void addQuantityItemToOpenedOrder(Map<Integer, Double> orderedItemsListByItemSerialIDAndAmount, AvailableItemInStore itemInStore, OpenedStoreOrder openedStoreOrder)
    {
        int itemSerialID = itemInStore.getSerialNumber();
        if (orderedItemsListByItemSerialIDAndAmount.containsKey(itemSerialID)) {
            double amountOfItem = orderedItemsListByItemSerialIDAndAmount.get(itemSerialID);
            OrderedItemFromStoreByWeight orderedItemFromStoreByWeight = new OrderedItemFromStoreByWeight(itemInStore, amountOfItem);
            openedStoreOrder.addItemToItemsMapOfOrder(orderedItemFromStoreByWeight);
        }
    }

    public OpenedCustomerOrder updateItemsWithAmountAndCreateOpenedStaticCustomerOrder(Customer customer, String date, Store store, Map<Integer, Double> orderedItemsListByItemSerialIDAndWeight, Map<Integer, Integer> orderedItemsListByItemSerialIDAndQuantity, SDMLocation locationOfCustomer, String customerName) {
        boolean isOrderStatic = true;
        OpenedCustomerOrder openedCustomerOrder = new OpenedCustomerOrder(date, customer.getUserName(), isOrderStatic, locationOfCustomer);
        OpenedStoreOrder openedStoreOrder = new OpenedStoreOrder(store, date, isOrderStatic, locationOfCustomer, customerName);


        for (Map.Entry<Integer, Double> entry : orderedItemsListByItemSerialIDAndWeight.entrySet()) {
            double amountOfItem = entry.getValue();
            int itemSerialID = entry.getKey();
            AvailableItemInStore availableItemInStore = store.getItemBySerialID(itemSerialID);
            if (availableItemInStore.getTypeOfMeasure() == Item.TypeOfMeasure.Weight) {
                OrderedItemFromStoreByWeight orderedItemFromStoreByWeight = new OrderedItemFromStoreByWeight(availableItemInStore, amountOfItem);
                openedStoreOrder.addItemToItemsMapOfOrder(orderedItemFromStoreByWeight);
            }
        }

        for (Map.Entry<Integer, Integer> entry : orderedItemsListByItemSerialIDAndQuantity.entrySet()) {
            double amountOfItem = entry.getValue();
            int itemSerialID = entry.getKey();
            AvailableItemInStore availableItemInStore = store.getItemBySerialID(itemSerialID);
            if (availableItemInStore.getTypeOfMeasure() == Item.TypeOfMeasure.Quantity) {
                OrderedItemFromStoreByQuantity orderedItemFromStoreByQuantity = new OrderedItemFromStoreByQuantity(availableItemInStore, amountOfItem);
                openedStoreOrder.addItemToItemsMapOfOrder(orderedItemFromStoreByQuantity);
            }

        }
        openedCustomerOrder.addStoreOrder(openedStoreOrder);
        return openedCustomerOrder;
    }

    public List<ClosedCustomerOrder> getListOfClosedCustomerOrderByCustomerName(String customerName)
    {
        return ordersSerialIDMap.values().stream().filter(x->x.getCustomerName().equals(customerName)).collect(Collectors.toList());
    }

    public List<ClosedStoreOrder> getListOfClosedStoreOrderByStoreOwnerName(String storeOwnerName)
    {
        List<ClosedStoreOrder> closedStoreOrderList = new ArrayList<>();
        for(ClosedCustomerOrder closedCustomerOrder : ordersSerialIDMap.values()) {
            List<ClosedStoreOrder> closedStoreOrderListFilteredByOwnerName = closedCustomerOrder.getListOfClosedStoreOrders().stream().filter(x -> x.getStoreUsed().getStoreOwner().getUserName().equals(storeOwnerName)).collect(Collectors.toList());
            closedStoreOrderList = Stream.concat(closedStoreOrderList.stream(), closedStoreOrderListFilteredByOwnerName.stream()).collect(Collectors.toList());
        }
        return closedStoreOrderList;
    }

    public List<Feedback> getListOfFeedbacksByStoreOwnerName(String storeOwnerName)
    {
        List<Store> listOfStoresByStoreOwnerName = storesSerialIDMap.values().stream().filter(x->x.getStoreOwner().getUserName().equals(storeOwnerName)).collect(Collectors.toList());
        List<Feedback> feedbackList = new ArrayList<>();
        for(Store store : listOfStoresByStoreOwnerName)
        {
            feedbackList = Stream.concat(feedbackList.stream(), store.getFeedbackList().stream()).collect(Collectors.toList());
        }
        return feedbackList;
    }

    public void addStore(Store newStoreToAdd) {
        storesSerialIDMap.put(newStoreToAdd.getSerialNumber(), newStoreToAdd);
    }

    public void addItem(Item newItemToAdd) {
        itemsSerialIDMap.put(newItemToAdd.getSerialNumber(), newItemToAdd);
    }

    public boolean checkIfLocationAlreadyExists(SDMLocation location) {
        return storesLocationMap.containsKey(location);
    }
}

