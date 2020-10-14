package logic.order.CustomerOrder;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import logic.AvailableItemInStore;
import logic.SDMLocation;
import logic.Store;
import logic.discount.Discount;
import logic.discount.Offer;
import logic.order.Order;
import logic.order.StoreOrder.ClosedStoreOrder;
import logic.order.StoreOrder.OpenedStoreOrder;
import logic.order.itemInOrder.OrderedItemFromSale;
import logic.order.itemInOrder.OrderedItemFromStore;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class OpenedCustomerOrder1 extends Order {

    Map<Store, OpenedStoreOrder> openedStoresOrderMap;
    SDMLocation locationOfCustomer;
    String customerName;
    //Map<Integer, Integer> itemsAmountLeftToUseInSalesMap;
    //Map<String, Discount> availableDiscountsMap;

    public OpenedCustomerOrder1(String date, String customerName, boolean isOrderStatic, SDMLocation locationOfCustomer) {
        super(date, isOrderStatic);
        this.customerName = customerName;
        this.locationOfCustomer = locationOfCustomer;
        openedStoresOrderMap = new HashMap<>();
        //itemsAmountLeftToUseInSalesMap = new HashMap<Integer, Integer>() ;
        //availableDiscountsMap = new HashMap<String, Discount>();
    }

    public void generateListOfSales()
    {

    }

    @FXML
    private Label LabelTotalItemsCost;
    @FXML private Label LabelTotalDeliveryPrice;
    @FXML private Label LabelTotalOrderPrice;

    public Double calcTotalItemsCost()
    {
        Double totalItemsCost=0.0;
        for(OpenedStoreOrder openedStoreOrder : openedStoresOrderMap.values())
        {
            totalItemsCost+=openedStoreOrder.calcTotalPriceOfItemsFromSale();
            totalItemsCost+=openedStoreOrder.calcTotalPriceOfItemsNotFromSale();
        }
        return totalItemsCost;
    }

    public Double calcTotalDeliveryPrice()
    {
        Double totalDeliveryPrice=0.0;
        for(OpenedStoreOrder openedStoreOrder : openedStoresOrderMap.values())
        {
            totalDeliveryPrice+=openedStoreOrder.calcTotalDeliveryPrice();
        }
        return totalDeliveryPrice;
    }
    public Double calcTotalOrderPrice()
    {
        return calcTotalItemsCost() + calcTotalDeliveryPrice();
    }

    public List<OrderedItemFromSale>  generateListOfOrderedItemFromSaleWithDiscountName()
    {
        List<OrderedItemFromSale> orderedItemFromSaleListWithDiscountNames = new ArrayList<>();
        for(OpenedStoreOrder openedStoreOrder : openedStoresOrderMap.values())
        {
            orderedItemFromSaleListWithDiscountNames = Stream.concat(orderedItemFromSaleListWithDiscountNames.stream(), openedStoreOrder.generateListOfOrderedItemFromSaleWithDiscountName().stream()).collect(Collectors.toList());
        }
        return orderedItemFromSaleListWithDiscountNames;
    }

    public List<OrderedItemFromStore> generateListsOfItemNotFromSale()
    {
        List<OrderedItemFromStore> orderedItemNotFromSaleFromStoresList = new ArrayList<OrderedItemFromStore>();
        for(OpenedStoreOrder openedStoreOrder : openedStoresOrderMap.values())
        {
            List<OrderedItemFromStore> orderedItemFromStoreListNotFromSale = openedStoreOrder.generateListOfOrdereItemsNotFromSale();
            orderedItemNotFromSaleFromStoresList = Stream.concat(orderedItemNotFromSaleFromStoresList.stream(), orderedItemFromStoreListNotFromSale.stream()).collect(Collectors.toList());;
        }
        return orderedItemNotFromSaleFromStoresList;
    }

    public List<AvailableItemInStore> generateListsOfItemsInStoreThatAreNotInOrderAndNotFromSale(Integer serialIDOfStore)
    {
        List<AvailableItemInStore> availableItemInStoreList = null;
        for(OpenedStoreOrder openedStoreOrder : openedStoresOrderMap.values())
        {
            Store store = openedStoreOrder.getStoreUsed();
            if(store.getSerialNumber() == serialIDOfStore)
            {
                Map<Integer, AvailableItemInStore> availableItemInStoreMap = new HashMap<>(store.getItemsSerialIDMap());
                List<OrderedItemFromStore> orderedItemFromStoreList = generateListsOfItemNotFromSale();
                for(OrderedItemFromStore orderedItemFromStore : orderedItemFromStoreList)
                {
                    Integer serialIDOfOrderedItemFromStore = orderedItemFromStore.getSerialNumber();
                    if(availableItemInStoreMap.containsKey(serialIDOfOrderedItemFromStore))
                    {
                        availableItemInStoreMap.remove(serialIDOfOrderedItemFromStore);
                    }
                }
                availableItemInStoreList = new ArrayList<>(availableItemInStoreMap.values());
            }
        }
        return availableItemInStoreList;
    }

    public void initializeAvailableDiscountMapInOpenedStoreOrders()
    {
        for(Map.Entry<Store, OpenedStoreOrder> openedStoreOrderEntry : openedStoresOrderMap.entrySet())
        {
            openedStoreOrderEntry.getValue().initializeDiscountInStoresThatValidInOrder();
        }
    }

    public void initializeItemsAmountLeftToUseInSalesMapInOpenedStoreOrders()
    {
        for(Map.Entry<Store, OpenedStoreOrder> openedStoreOrderEntry : openedStoresOrderMap.entrySet())
        {
            openedStoreOrderEntry.getValue().initializeItemsAmountLeftToUseInStoresThatValidInOrder();
        }
    }

    public OpenedStoreOrder getOpenedStoreOrderThatContainsDiscountByName(String discountName)
    {
        OpenedStoreOrder openedStoreOrder = null;
        for(Map.Entry<Store, OpenedStoreOrder> openedStoreOrderEntry : openedStoresOrderMap.entrySet())
        {
            List<Discount> listOfDiscountsFromCertainStore = openedStoreOrderEntry.getValue().generateDiscountsFromStoreByOrderedItems();
            for(Discount discount : listOfDiscountsFromCertainStore)
            {
                if(discount.getName().equals(discountName))
                {
                    openedStoreOrder = openedStoreOrderEntry.getValue();
                }
            }
        }
        return openedStoreOrder;
    }

    public void applyDiscountOneOf(String discountName, Offer offer)
    {
        OpenedStoreOrder openedStoreOrder = getOpenedStoreOrderThatContainsDiscountByName(discountName);
        openedStoreOrder.applyOneOfDiscountOnStore(discountName, offer);
    }

    public void applyDiscountAllOrNothing(String discountName)
    {
        OpenedStoreOrder openedStoreOrder = getOpenedStoreOrderThatContainsDiscountByName(discountName);
        openedStoreOrder.applyAllOrNothingDiscountOnStore(discountName);
    }


    public List<Discount> generateListOfDiscounts()
    {
        List<Discount> listOfDiscounts = new ArrayList<Discount>();
        for(Map.Entry<Store, OpenedStoreOrder> openedStoreOrderEntry : openedStoresOrderMap.entrySet())
        {
            List<Discount> listOfDiscountsFromCertainStore = openedStoreOrderEntry.getValue().generateListOfDiscountsInStoresThatAreValidInOrder();
            for(Discount discount : listOfDiscountsFromCertainStore)
                listOfDiscounts.add(discount);
        }
        return listOfDiscounts;
    }


    public Map<Store, OpenedStoreOrder> getOpenedStoresOrderMap() {
        return openedStoresOrderMap;
    }

    public List<OpenedStoreOrder> getListOfOpenedStoreOrder()
    {
        ArrayList<OpenedStoreOrder> listOfValues
                = openedStoresOrderMap.values().stream().collect(
                Collectors.toCollection(ArrayList::new));
        return listOfValues;
    }
    public SDMLocation getCustomerLocation() {
        return locationOfCustomer;
    }

    public String getCustomerName()
    {
        return customerName;
    }
    /*public Double calcTotalPriceOfItemsNotFromSale() {
        return 0.0;
    }*/
    /*public Double calcTotalAmountOfItemsNotFromSaleByUnit() {
        return 0.0;
    }*/
    public boolean checkIfItemAlreadyExistsInOrder(int serialIDOfItem) {
        return false;
    }
    /*public Integer calcTotalAmountOfItemsTypeNotFromSale() {
        return 0;
    }*/

    public ClosedCustomerOrder closeCustomerOrder()
    {
        Map<Integer, ClosedStoreOrder> closedStoresOrderMapByStoreSerialID = new HashMap<>();

        for(OpenedStoreOrder openedStoreOrder : openedStoresOrderMap.values())
        {
            int serialNumber = openedStoreOrder.getStoreUsed().getSerialNumber();
            ClosedStoreOrder closedStoreOrder = openedStoreOrder.closeOrder();
            closedStoresOrderMapByStoreSerialID.put(serialNumber, closedStoreOrder);
        }

        ClosedCustomerOrder closedCustomerOrder = new ClosedCustomerOrder(getDateStr(), closedStoresOrderMapByStoreSerialID, isOrderStatic(), customerName,locationOfCustomer);
        return closedCustomerOrder;
    }

    public void addStoreOrder(OpenedStoreOrder openedStoreOrder)
    {
        openedStoresOrderMap.put(openedStoreOrder.getStoreUsed(), openedStoreOrder);
    }
}
