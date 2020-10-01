package exceptions;

public class TaskIsCanceledException extends Exception {
    Exception exception;
    public TaskIsCanceledException(Exception otherException)
    {
        this.exception = otherException;
    }

    public TaskIsCanceledException()
    {

    }

    public Exception getException() {
        return exception;
    }
}
