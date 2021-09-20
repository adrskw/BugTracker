using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using BugTracker.Domain.Tickets;
using BugTracker.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Core.Tickets
{
    public class List
    {
        public class Query : IRequest<List<Ticket>> { }

        public class Handler : IRequestHandler<Query, List<Ticket>>
        {
            private readonly ApplicationDbContext context;

            public Handler(ApplicationDbContext context)
            {
                this.context = context;
            }

            public async Task<List<Ticket>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Tickets.ToListAsync();
            }
        }
    }
}