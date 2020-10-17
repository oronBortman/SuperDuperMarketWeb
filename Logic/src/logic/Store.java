package logic;

import exceptions.DuplicateDiscountNameException;
import exceptions.notExistException.ItemIDInDiscountNotExistInAStoreException;
import exceptions.notExistException.ItemIDNotExistInAStoreException;
import jaxb.schema.generated.*;
import logic.discount.Discount;
import logic.discount.IfYouBuySDM;
import logic.discount.ThenYouGetSDM;
import logic.order.CustomerOrder.Feedback;
import logic.order.GeneralMethods;
import logic.order.StoreOrder.ClosedStoreOrder;
import logic.order.StoreOrder.StoreOrder;

import java.util.*;
import java.util.stream.Collectors;

public class Store extends SDMObjectWithUniqueLocationAndUniqueSerialID {

    private Map<Integer, AvailableItemInStore> ItemsSerialIDMap;
    private Map<Integer, ClosedStoreOrder> ordersSerialIDMap;
    private Map<String, Discount> discountNameDMap;
    private Seller storeOwner;
    private Integer PPK;
    private List<Feedback> feedbackList;

    public Store(Integer serialNumber, String name, int PPK, SDMLocation SDMLocationOfShop, Seller storeOwner)
    {
        super(serialNumber, name, SDMLocationOfShop);
        this.storeOwner =  storeOwner;
        ItemsSerialIDMap = new HashMap<>();
        ordersSerialIDMap = new HashMap<>();
        discountNameDMap = new HashMap<>();
        feedbackList = new ArrayList<>();

        this.PPK = PPK;
    }

    public Store(Integer serialNumber, String name, int PPK, SDMLocation SDMLocationOfShop, Map<Integer, AvailableItemInStore> itemsSerialIDMap, Seller storeOwner)
    {
        super(serialNumber, name, SDMLocationOfShop);
        this.storeOwner =  storeOwner;

        this.ItemsSerialIDMap = itemsSerialIDMap;
        ordersSerialIDMap = new HashMap<Integer, ClosedStoreOrder>();
        discountNameDMap = new HashMap<String, Discount>();

        this.PPK = PPK;
    }

    public Store(SDMStore shop, Seller storeOwner)
    {
        super(shop.getId(), shop.getName(), new SDMLocation(shop.getLocation()));
        this.storeOwner = storeOwner;
        ItemsSerialIDMap = new HashMap();
        ordersSerialIDMap = new HashMap();
        discountNameDMap = new HashMap();
        this.PPK = shop.getDeliveryPpk();
    }

    public List<Feedback> getFeedbackList() {
        return feedbackList;
    }

    public void addFeedback(String customerName, String orderDate, Integer grade, String feedbackText)
    {
        //String customerName, String orderDate, Integer rating, String feedbackText
        feedbackList.add(new Feedback(customerName,orderDate,grade,feedbackText));
    }

    public Seller getStoreOwner() {
        return storeOwner;
    }

    public void addDiscountToStoreFromXML(SDMDiscount discountFromXML) throws DuplicateDiscountNameException, ItemIDNotExistInAStoreException, ItemIDInDiscountNotExistInAStoreException {
        IfYouBuy ifYouBuy = discountFromXML.getIfYouBuy();
        String discountName = discountFromXML.getName();
        ThenYouGet thanYouGet = discountFromXML.getThenYouGet();
        if(checkIfDiscountHasUniqueName(discountName) == false)
        {
            throw new DuplicateDiscountNameException(discountName, this);
        }
        else if(checkIfItemIdExists(ifYouBuy.getItemId()) == false)
        {
            throw new ItemIDInDiscountNotExistInAStoreException(this, ifYouBuy.getItemId(), discountName );
        }
        else
        {
            IfYouBuySDM ifYouBuySDM = new IfYouBuySDM(ifYouBuy);
            ThenYouGetSDM thenYouGetSDM = addOffersToThenYouGet(thanYouGet, discountName);
            discountNameDMap.put(discountName, new Discount(discountName, ifYouBuySDM, thenYouGetSDM));
        }
    }

    public List<Discount> generateListOfDiscountsThatContainsItemsFromList(Collection<Integer> listOfItemsSerialID)
    {
        return (discountNameDMap.values().stream().filter(x -> x.checkIfDiscountContainsItemFromListOfItems(listOfItemsSerialID)).collect(Collectors.toList()));
    }

    public Discount getDiscountFromStoreByName(String discountName)
    {
        return discountNameDMap.get(discountName);
    }

    public ThenYouGetSDM addOffersToThenYouGet(ThenYouGet thenYouGet, String discountName) throws ItemIDNotExistInAStoreException, ItemIDInDiscountNotExistInAStoreException {
        ThenYouGetSDM thenYouGetSDM = new ThenYouGetSDM(thenYouGet);
        List<SDMOffer> sdmOfferList = thenYouGet.getSDMOffer();
        for(SDMOffer sdmOffer : sdmOfferList)
        {
            if(checkIfItemIdExists(sdmOffer.getItemId()) == false)
            {
                throw new ItemIDInDiscountNotExistInAStoreException(this, sdmOffer.getItemId(), discountName);
            }
            else
            {
                thenYouGetSDM.addOfferToListFromSDMOffer(sdmOffer);
            }
        }
        return thenYouGetSDM;
    }

    public boolean checkIfDiscountHasUniqueName(String nameOfDiscount)
    {
        return !discountNameDMap.containsKey(nameOfDiscount);
    }

    public List<AvailableItemInStore> getAvailableItemsList()
    {
        return new ArrayList<AvailableItemInStore>(ItemsSerialIDMap.values());
    }

    public List<Item> getItemsList()
    {
       /* List<Item> list = new ArrayList<Item>();
        for(AvailableItemInStore itemInStore : ItemsSerialIDMap.values())
        {
            list.add(itemInStore);
        }
        return list;*/
        return ItemsSerialIDMap.values().stream().collect(Collectors.toCollection(ArrayList::new));

    }


    private void addItemToShop(AvailableItemInStore availableItemInStore)
    {
        ItemsSerialIDMap.put(availableItemInStore.getSerialNumber(), availableItemInStore);
    }

    public Set<Integer> getSetOfItemsSerialID()
    {
        return GeneralMethods.<Integer, AvailableItemInStore>getSetOfDictionary(ItemsSerialIDMap);

    }

    public Set<Integer> getSetOfOrdersSerialID()
    {
        return GeneralMethods.<Integer, ClosedStoreOrder>getSetOfDictionary(ordersSerialIDMap);

    }

    public boolean checkIfItemIdIsUnique(String serialNumber)
    {
        return ItemsSerialIDMap.containsKey(serialNumber) ;
    }

    public double calcProfitOfDelivers()
    {
        return ordersSerialIDMap.values().stream().mapToDouble(ClosedStoreOrder::calcTotalDeliveryPrice).sum();
    }


    public AvailableItemInStore getItemBySerialID(Integer serialID)
    {
        return ItemsSerialIDMap.get(serialID);
    }

    public ClosedStoreOrder getOrderBySerialID(Integer serialID)
    {
        return ordersSerialIDMap.get(serialID);
    }

    public Integer getPPK() {
        return this.PPK;
    }

    public boolean checkIfItemIdExists(int itemSerialNumber)
    {
        return ItemsSerialIDMap.containsKey(itemSerialNumber);
    }

    public void addItemToItemSSerialIDMap(AvailableItemInStore item)
    {
        ItemsSerialIDMap.put(item.getSerialNumber(), item);
    }

    public Integer calcTotalOrdersFromStore()
    {
        return ordersSerialIDMap.size();
    }

    public Double calcTotalProfitOfSoledItems()
    {
        return ordersSerialIDMap.values().stream().mapToDouble(StoreOrder::calcTotalPriceOfItems).sum();
    }

    public void addClosedOrderToHistory(ClosedStoreOrder order)
    {
        ordersSerialIDMap.put(order.getSerialNumber(), order);
    }

    public int getAmountOfOrder()
    {
        return ordersSerialIDMap.size();
    }
    public Map<Integer, AvailableItemInStore> getStoresSerialIDMap()
    {
        return ItemsSerialIDMap;
    }
    public double getAmountOfItemSoledByUnit(Integer itemID)
    {
        return ordersSerialIDMap.values().stream().mapToDouble(closedStoreOrder -> closedStoreOrder.calcAmountOfCertainItemByUnit(itemID)).sum();
    }
    public double getAmountOfItemSoledByTypeOfMeasure(Integer itemID)
    {
        return ordersSerialIDMap.values().stream().mapToDouble(closedStoreOrder -> closedStoreOrder.calcAmountOfCertainItemByTypeOfMeasure(itemID)).sum();
    }

    public boolean checkIfItemIsTheOnlyOneInStore(Integer itemID)
    {
        return ItemsSerialIDMap.size() == 1 && checkIfItemIdExists(itemID);
    }
    public void removeItemFromStore(int itemID)
    {
        ItemsSerialIDMap.remove(itemID);
    }
    public void addItemToStore(Item item, int priceOfItem)
    {
        ItemsSerialIDMap.put(item.getSerialNumber(), new AvailableItemInStore(item, priceOfItem));
    }
    public void addItemToStore(AvailableItemInStore availableItemInStore)
    {
        ItemsSerialIDMap.put(availableItemInStore.getSerialNumber(), availableItemInStore);
    }

    public Map<Integer, AvailableItemInStore> getItemsSerialIDMap() {
        return ItemsSerialIDMap;
    }

    public void updatePriceOfItem(int itemID, int priceOfItem)
    {
        ItemsSerialIDMap.get(itemID).setPricePerUnit(priceOfItem);
    }

    public List<ClosedStoreOrder> getOrdersList() {
        /*List<ClosedStoreOrder> list = new ArrayList<ClosedStoreOrder>();
        for( ClosedStoreOrder closedStoreOrder: ordersSerialIDMap.values())
        {
            list.add(closedStoreOrder);
        }
        return list;*/
        return ordersSerialIDMap.values().stream().collect(Collectors.toCollection(ArrayList::new));

        //srcCollection.stream().collect(toCollection(ArrayList::new));
    }

    public List<Discount> getDiscountsList()
    {
        return discountNameDMap.values().stream().collect(Collectors.toCollection(ArrayList::new));
    }

    public void addDiscountToStore(Discount discount) {
        discountNameDMap.put(discount.getName(), discount);
    }
}

