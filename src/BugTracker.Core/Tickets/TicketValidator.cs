using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BugTracker.Domain.Tickets;
using FluentValidation;

namespace BugTracker.Core.Tickets
{
    public class TicketValidator : AbstractValidator<Ticket>
    {
        public TicketValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.CreationDate).NotEmpty();
            RuleFor(x => x.Reporter).NotEmpty();
            RuleFor(x => x.Assignee).NotEmpty();
            RuleFor(x => x.Priority).IsInEnum();
            RuleFor(x => x.Status).IsInEnum();
        }
    }
}