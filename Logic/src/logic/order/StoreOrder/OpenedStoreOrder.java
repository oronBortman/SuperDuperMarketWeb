package logic.order.StoreOrder;

import logic.*;
import logic.discount.Discount;
import logic.discount.IfYouBuySDM;
import logic.discount.Offer;
import logic.order.itemInOrder.*;

import java.time.LocalDate;
import java.util.*;

import static java.util.stream.Collectors.toCollection;

public class OpenedStoreOrder extends StoreOrder{

    Map<String, Discount> discountsInStoresThatAreValidInOrder = new HashMap<>();
    Map<Integer, Double> itemsAmountLeftToUseInSalesMap = new HashMap<>();

    public OpenedStoreOrder(Store store, String date, boolean isOrderStatic, SDMLocation customerLocation, String customerName)
    {
        super(date, isOrderStatic, customerLocation, customerName, store);

    }

    public List<Discount> generateListOfDiscountsInStoresThatAreValidInOrder() {
        return discountsInStoresThatAreValidInOrder.values().stream().collect(toCollection(ArrayList::new));
    }

    public void addToOrderedItemFromOfferList(String discountName) {
        for(Offer offer : getDiscountByName(discountName).getThenYouGet().getOfferList())
        {
            addToOrderedItemsFromSale(discountName, offer);
        }
    }

    public void addToOrderedItemsFromSale(String discountName, Offer offer)
    {
        Integer itemID = offer.getItemId();
        Integer price = offer.getForAdditional();
        Double quantity = offer.getQuantity();
        AvailableItemInStore availableItemInStore = new AvailableItemInStore(storeUsed.getItemBySerialID(itemID));
        availableItemInStore.setPricePerUnit(price);
        Map<String, Map<Integer, OrderedItemFromStore>> orderedItemFromStoreByDiscountNameMap = getOrderedItemsFromSale();
        OrderedItemFromStore orderedItemFromStore = null;

         if(availableItemInStore.getTypeOfMeasure() == Item.TypeOfMeasure.Quantity)
         {
             orderedItemFromStore = new OrderedItemFromStoreByQuantity(availableItemInStore, quantity);
         }
         else if(availableItemInStore.getTypeOfMeasure() == Item.TypeOfMeasure.Weight) {
             orderedItemFromStore = new OrderedItemFromStoreByWeight(availableItemInStore, quantity);
         }

        if(orderedItemFromStoreByDiscountNameMap.containsKey(discountName))
        {
            Map<Integer,OrderedItemFromStore> orderedItemFromStoreMap = getOrderedItemsMapFromSaleByDiscountName(discountName);
            if(orderedItemFromStoreMap != null)
            {
                if(orderedItemFromStoreMap.containsKey(itemID))
                {
                    orderedItemFromStore = orderedItemFromStoreMap.get(itemID);
                    orderedItemFromStore.addQuantity(quantity);
                }
                else
                {
                    orderedItemFromStoreMap.put(itemID, orderedItemFromStore);
                }
            }
        }
        else
        {
            addingNewOrderMapToMap(discountName, orderedItemFromStore);
        }
    }

    public void addingNewOrderMapToMap(String discountName, OrderedItemFromStore orderedItemFromStore) {
        Map<Integer, OrderedItemFromStore> orderedItemFromStoreMap = new HashMap<Integer, OrderedItemFromStore>();
        orderedItemFromStoreMap.put(orderedItemFromStore.getSerialNumber(), orderedItemFromStore);
        getOrderedItemsFromSale().put(discountName, orderedItemFromStoreMap);
    }


    public void initializeDiscountInStoresThatValidInOrder()
    {
        List<Discount> discountsFromStore = generateDiscountsFromStoreByOrderedItems();
        for(Discount discount : discountsFromStore)
        {
            discountsInStoresThatAreValidInOrder.put(discount.getName(), discount);
        }
    }

    public void initializeItemsAmountLeftToUseInStoresThatValidInOrder()
    {
        List<Discount> discountsFromStore = generateDiscountsFromStoreByOrderedItems();
        for(Discount discount : discountsFromStore)
        {
            IfYouBuySDM ifYouBuySDM = discount.getIfYouBuySDM();
            Integer itemSerialID = ifYouBuySDM.getItemId();
            Double itemQuantity = getOrderedItemsNotFromSale().get(itemSerialID).getTotalAmountOfItemOrderedByTypeOfMeasure();
            itemsAmountLeftToUseInSalesMap.put(itemSerialID,itemQuantity);
        }
    }


    public void applyOneOfDiscountOnStore(String discountName, Offer offer)
    {
        addToOrderedItemsFromSale(discountName, offer);
        applyDiscountInformationWithChangesAfterDiscountApply(discountName);
    }

    public void applyAllOrNothingDiscountOnStore(String discountName)
    {
        addToOrderedItemFromOfferList(discountName);
        applyDiscountInformationWithChangesAfterDiscountApply(discountName);
    }

    public void applyDiscountInformationWithChangesAfterDiscountApply(String discountName)
    {
        Discount discount = discountsInStoresThatAreValidInOrder.get(discountName);
        if(checkIfSaleCanBeApplyed(discount))
        {
            updateQuantityInOrderedItem(discount);
            if(checkIfSaleCanBeApplyed(discount) == false)
            {
                itemsAmountLeftToUseInSalesMap.remove(discount.getIfYouBuySDM().getItemId());
                discountsInStoresThatAreValidInOrder.remove(discountName);
            }
        }
    }

    public boolean checkIfSaleCanBeApplyed(Discount discount)
    {
        IfYouBuySDM ifYouBuySDM = discount.getIfYouBuySDM();
        Double quantityFromSale = ifYouBuySDM.getQuantity();
        Integer itemSerialID = ifYouBuySDM.getItemId();
        Double currentQuantityFromOrder = itemsAmountLeftToUseInSalesMap.get(itemSerialID);
        Double newQuantity = currentQuantityFromOrder - quantityFromSale;
        return newQuantity >= 0;
    }

    public void updateQuantityInOrderedItem(Discount discount)
    {
        IfYouBuySDM ifYouBuySDM = discount.getIfYouBuySDM();
        Double quantityFromSale = ifYouBuySDM.getQuantity();
        Integer itemSerialID = ifYouBuySDM.getItemId();
        Double currentQuantityFromOrder = itemsAmountLeftToUseInSalesMap.get(itemSerialID);
        Double newQuantity = currentQuantityFromOrder - quantityFromSale;
        itemsAmountLeftToUseInSalesMap.put(itemSerialID, newQuantity);
    }

    public Discount getDiscountByName(String discountName)
    {
        return discountsInStoresThatAreValidInOrder.get(discountName);
    }

    public List<Discount> generateDiscountsFromStoreByOrderedItems()
    {
        return storeUsed.generateListOfDiscountsThatContainsItemsFromList(getOrderedItemsNotFromSale().keySet());
    }


    public void addItemToItemsMapOfOrder(OrderedItemFromStore orderedItemFromStore)
    {
        getOrderedItemsNotFromSale().put(orderedItemFromStore.getSerialNumber(), orderedItemFromStore);
    }


    public Double calcTotalAmountOfItemsFromSaleByUnit()
    {
        Map<String, Map<Integer, OrderedItemFromStore>> orderedItemsFromSale = getOrderedItemsFromSale();
        Double totalAmount=0.0;
        for(Map<Integer, OrderedItemFromStore> orderedItemFromStoreMap : orderedItemsFromSale.values())
        {
            totalAmount+=orderedItemFromStoreMap.values().stream().mapToDouble(OrderedItemFromStore::getAmountOfItemOrderedByUnits).sum();
        }
        return totalAmount;
    }



    public Integer calcTotalAmountOfItemsTypeFromSale()
    {
        Map<String, Map<Integer, OrderedItemFromStore>> orderedItemsFromSale = getOrderedItemsFromSale();
        Integer totalAmount=0;
        for(Map<Integer, OrderedItemFromStore> orderedItemFromStoreMap : orderedItemsFromSale.values())
        {
            totalAmount+=orderedItemFromStoreMap.size();
        }
        return totalAmount;
    }


    public ClosedStoreOrder closeOrder()
    {
        ClosedStoreOrder closedStoreOrder = new ClosedStoreOrder(this);
        getStoreUsed().addClosedOrderToHistory(closedStoreOrder);
        return closedStoreOrder;
    }
}
