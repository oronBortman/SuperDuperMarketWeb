package logic.order.StoreOrder;

import logic.SDMLocation;
import logic.Store;
import logic.order.Order;
import logic.order.itemInOrder.OrderedItem;
import logic.order.itemInOrder.OrderedItemFromSale;
import logic.order.itemInOrder.OrderedItemFromStore;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toCollection;

public class StoreOrder extends Order {

    SDMLocation customerLocation;
    Store storeUsed;
    private Map<Integer, OrderedItemFromStore> orderedItemsNotFromSale;
    private Map<String, Map<Integer, OrderedItemFromStore>> orderedItemsFromSale;

    public StoreOrder(Store store, String date, boolean isOrderStatic, SDMLocation customerLocation){
        super(date, isOrderStatic);
        this.customerLocation = customerLocation;
        this.storeUsed = store;
        orderedItemsNotFromSale = new HashMap<Integer, OrderedItemFromStore>();
        orderedItemsFromSale = new HashMap<String,Map<Integer, OrderedItemFromStore>>();
    }

    /*public StoreOrder(String date, boolean isOrderStatic, SDMLocation customerLocation)
    {
        super(date, isOrderStatic);
        this.customerLocation=customerLocation;
        orderedItemsNotFromSale = new HashMap<Integer, OrderedItemFromStore>();
        orderedItemsFromSale = new HashMap<String,Map<Integer, OrderedItemFromStore>>();
    }*/

    /*public StoreOrder(String date, boolean isOrderStatic) {
        super(date, isOrderStatic);
    }*/
    public StoreOrder(StoreOrder storeOrder)
    {
        super(storeOrder.getDateStr1(), storeOrder.isOrderStatic());
        this.storeUsed = storeOrder.storeUsed;
        this.customerLocation = storeOrder.customerLocation;;
        this.orderedItemsFromSale = storeOrder.orderedItemsFromSale;;
        this.orderedItemsNotFromSale = storeOrder.orderedItemsNotFromSale;
    }

    @Override
    public boolean checkIfItemAlreadyExistsInOrder(int serialIDOfItem)
    {
        boolean itemAlreadyExistsInOrder=false;
        if(orderedItemsNotFromSale != null)
        {
            itemAlreadyExistsInOrder = orderedItemsNotFromSale.containsKey(serialIDOfItem);
        }
        return itemAlreadyExistsInOrder;
    }

    public Map<Integer, OrderedItemFromStore> getOrderedItemsNotFromSale()
    {
        return orderedItemsNotFromSale;
    }

    public Map<String, Map<Integer, OrderedItemFromStore>> getOrderedItemsFromSale() {
        return orderedItemsFromSale;
    }

    public Map<Integer, OrderedItemFromStore> getOrderedItemsMapFromSaleByDiscountName(String discountName)
    {
        return orderedItemsFromSale.get(discountName);
    }

    public OrderedItemFromStore getItemInOrder(int serialIDOfItem) {
        return getOrderedItemsNotFromSale().get(serialIDOfItem);
    }

    public Store getStoreUsed() {
        return storeUsed;
    }


    public List<OrderedItem> generateListOfGeneralOrderedItems()
    {
        return Stream.concat(generateListOfOrderedItemFromSaleWithDiscountName().stream(), generateListOfOrdereItemsNotFromSale().stream()).collect(Collectors.toList());
    }


    public List<OrderedItemFromStore> generateListOfOrdereItemsNotFromSale()
    {
        return getOrderedItemsNotFromSale().values().stream().collect(toCollection(ArrayList::new));
    }


    public List<OrderedItemFromSale> generateListOfOrderedItemFromSaleWithDiscountName()
    {
        List<OrderedItemFromSale> orderedItemFromSaleListWithDiscountNames = new ArrayList<>();
        for(Map.Entry<String, Map<Integer, OrderedItemFromStore>> stringMapEntry : getOrderedItemsFromSale().entrySet())
        {
            Map<Integer, OrderedItemFromStore> orderedItemFromStoreMap = stringMapEntry.getValue();
            String discountName = stringMapEntry.getKey();
            for(Map.Entry<Integer, OrderedItemFromStore> orderedItemFromStoreEntry : orderedItemFromStoreMap.entrySet())
            {
                OrderedItemFromStore orderedItemFromStore = orderedItemFromStoreEntry.getValue();
                orderedItemFromSaleListWithDiscountNames.add(new OrderedItemFromSale(discountName, orderedItemFromStore));
            }
        }
        return orderedItemFromSaleListWithDiscountNames;
    }

    //public Double calcDistanceToCustomer()
    public Double calcTotalDeliveryPrice() {
        SDMLocation storeLocation = storeUsed.getLocation();
        int PPK = storeUsed.getPPK();
        double distanceBetweenTwoLocations = customerLocation.getAirDistanceToOtherLocation(storeLocation);
        return(PPK * distanceBetweenTwoLocations);
    }

    public Double calcTotalPriceOfOrder()
    {
        return  calcTotalPriceOfItems() + calcTotalDeliveryPrice();
    }

    public Double calcTotalPriceOfItems()
    {
       return calcTotalPriceOfItemsNotFromSale() + calcTotalPriceOfItemsFromSale();
    }
    public Double calcTotalPriceOfItemsNotFromSale()
    {
        return getOrderedItemsNotFromSale().values().stream().mapToDouble(OrderedItemFromStore::getTotalPriceOfItemOrderedByTypeOfMeasure).sum();
    }

    public Double calcTotalPriceOfItemsFromSale() {
        Map<String, Map<Integer, OrderedItemFromStore>> orderedItemsFromSale = getOrderedItemsFromSale();
        Double totalPrice = 0.0;
        for (Map<Integer, OrderedItemFromStore> orderedItemFromStoreMap : orderedItemsFromSale.values()) {
            totalPrice += orderedItemFromStoreMap.values().stream().mapToDouble(OrderedItemFromStore::getTotalPriceOfItemOrderedByTypeOfMeasure).sum();
        }
        return totalPrice;
    }

    public Double calcDistanceToCustomer()
    {
        return customerLocation.getAirDistanceToOtherLocation(storeUsed.getLocation());
    }

    public Double calcTotalAmountOfItemsNotFromSaleByUnit()
    {
        return getOrderedItemsNotFromSale().values().stream().mapToDouble(OrderedItemFromStore::getAmountOfItemOrderedByUnits).sum();
    }

    public Double calcTotalAmountOfItemsFromSaleByUnit()
    {
        Double totalAmountOfItemsFromSaleByUnit=0.0;
        for( Map<Integer, OrderedItemFromStore> mapOfOrderedsItems : getOrderedItemsFromSale().values())
        {
            totalAmountOfItemsFromSaleByUnit+=mapOfOrderedsItems.values().stream().mapToDouble(OrderedItemFromStore::getAmountOfItemOrderedByUnits).sum();
        }
        return totalAmountOfItemsFromSaleByUnit;
    }

    public Double calcTotalAmountItemsNotFromSaleByMeasureType()
    {
        return getOrderedItemsNotFromSale().values().stream().mapToDouble(OrderedItemFromStore::getTotalAmountOfItemOrderedByTypeOfMeasure).sum();

    }

    public Double calcTotalAmountItemsFromSaleByMeasureType()
    {
        Double totalAmountOfItemsFromSaleByMeasureType=0.0;
        for( Map<Integer, OrderedItemFromStore> mapOfOrderedsItems : getOrderedItemsFromSale().values())
        {
            totalAmountOfItemsFromSaleByMeasureType+=mapOfOrderedsItems.values().stream().mapToDouble(OrderedItemFromStore::getTotalAmountOfItemOrderedByTypeOfMeasure).sum();
        }
        return totalAmountOfItemsFromSaleByMeasureType;
    }

    public Double calcAmountOfCertainItemByUnit(int serialId)
    {
        Double amountOfCertainItemByUnit;
        if(orderedItemsNotFromSale.containsKey(serialId))
        {
            amountOfCertainItemByUnit = orderedItemsNotFromSale.get(serialId).getAmountOfItemOrderedByUnits();
        }
        else
        {
            amountOfCertainItemByUnit = 0.0;
        }
        return amountOfCertainItemByUnit;
    }

    public Double calcTotalAmountOfItemsByUnit() {
        return calcTotalAmountOfItemsNotFromSaleByUnit() + calcTotalAmountOfItemsFromSaleByUnit();
    }

    public Double calcTotalAmountOfItemsByMeasureType() {
        return calcTotalAmountItemsNotFromSaleByMeasureType() + calcTotalAmountItemsFromSaleByMeasureType();
    }

    public double calcAmountOfCertainItemByTypeOfMeasure(int serialId)
    {
        double amountOfCertainItemByUnit;
        if(orderedItemsNotFromSale.containsKey(serialId))
        {
            amountOfCertainItemByUnit = orderedItemsNotFromSale.get(serialId).getTotalAmountOfItemOrderedByTypeOfMeasure();
        }
        else
        {
            amountOfCertainItemByUnit = 0;
        }
        return amountOfCertainItemByUnit;
    }

}
