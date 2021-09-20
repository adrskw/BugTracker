using System;
using System.Threading;
using System.Threading.Tasks;
using BugTracker.Persistence;
using MediatR;

namespace BugTracker.Core.Tickets
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var ticket = await context.Tickets.FindAsync(request.Id);

                context.Remove(ticket);

                await context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}