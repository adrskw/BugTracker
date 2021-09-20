using System.Threading;
using System.Threading.Tasks;
using BugTracker.Domain.Tickets;
using BugTracker.Persistence;
using MediatR;

namespace BugTracker.Core.Tickets
{
    public class Create
    {
        public class Command : IRequest {
            public Ticket Ticket { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ApplicationDbContext context;

            public Handler(ApplicationDbContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Tickets.Add(request.Ticket);

                await context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}