using System;

namespace BugTracker.Domain.Tickets
{
    public class Ticket
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Reporter { get; set; }
        public string Assignee { get; set; }
        public TicketPriority Priority { get; set; }
        public TicketStatus Status { get; set; }
        public DateTimeOffset CreationDate { get; set; }
    }
}