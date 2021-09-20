using System;
using System.Threading;
using System.Threading.Tasks;
using BugTracker.Domain.Tickets;
using BugTracker.Persistence;
using MediatR;

namespace BugTracker.Core.Tickets
{
    public class Details
    {
        public class Query : IRequest<Ticket>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Ticket>
        {
            private readonly ApplicationDbContext context;

            public Handler(ApplicationDbContext context)
            {
                this.context = context;
            }

            public async Task<Ticket> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Tickets.FindAsync(request.Id);
            }
        }
    }
}