using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using BugTracker.Core.CoreModels;
using BugTracker.Domain.Tickets;
using BugTracker.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Core.Tickets
{
    public class List
    {
        public class Query : IRequest<Result<List<Ticket>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Ticket>>>
        {
            private readonly ApplicationDbContext context;

            public Handler(ApplicationDbContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Ticket>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tickets = await context.Tickets.ToListAsync();

                return Result<List<Ticket>>.Success(tickets);
            }
        }
    }
}