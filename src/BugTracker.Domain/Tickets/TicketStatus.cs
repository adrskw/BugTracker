namespace BugTracker.Domain.Tickets
{
    public enum TicketStatus
    {
        New = 0,
        Open = 1,
        InProgress = 2,
        Resolved = 3,
        Closed = 4,
        AdditionalInformationRequired = 5,
        ReOpened = 6
    }
}
