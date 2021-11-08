using System;
using System.Threading;
using System.Threading.Tasks;
using BugTracker.Core.CoreModels;
using BugTracker.Domain.Tickets;
using BugTracker.Persistence;
using MediatR;

namespace BugTracker.Core.Tickets
{
    public class Details
    {
        public class Query : IRequest<Result<Ticket>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Ticket>>
        {
            private readonly ApplicationDbContext context;

            public Handler(ApplicationDbContext context)
            {
                this.context = context;
            }

            public async Task<Result<Ticket>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ticket = await context.Tickets.FindAsync(request.Id);

                return Result<Ticket>.Success(ticket);
            }
        }
    }
}