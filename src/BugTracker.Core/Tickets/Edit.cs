using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using BugTracker.Domain.Tickets;
using BugTracker.Persistence;
using MediatR;

namespace BugTracker.Core.Tickets
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Ticket Ticket { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ApplicationDbContext context;
            private readonly IMapper mapper;

            public Handler(ApplicationDbContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var ticket = await context.Tickets.FindAsync(request.Ticket.Id);
                mapper.Map(request.Ticket, ticket);

                await context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}