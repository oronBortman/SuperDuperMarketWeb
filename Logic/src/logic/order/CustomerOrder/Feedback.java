package logic.order.CustomerOrder;

public class Feedback {
    String customerName;
    String orderDate;
    int rating;
    String feedbackText;

    public Feedback(String customerName, String orderDate, Integer rating, String feedbackText)
    {
        this.customerName = customerName;
        this.orderDate = orderDate;
        this.rating = rating;
        this.feedbackText = feedbackText;
    }

    public int getRating() {
        return rating;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public String getFeedbackText() {
        return feedbackText;
    }
}
