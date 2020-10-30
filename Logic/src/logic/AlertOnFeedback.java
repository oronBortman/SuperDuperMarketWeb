package logic;

import logic.order.CustomerOrder.Feedback;

public class AlertOnFeedback implements Alert {
    Feedback feedback;
    Store store;
    public AlertOnFeedback(Feedback feedback, Store store)
    {
        this.feedback=feedback;
        this.store = store;
    }

    public Feedback getFeedback() {
        return feedback;
    }

    public Store getStore() {
        return store;
    }
}
