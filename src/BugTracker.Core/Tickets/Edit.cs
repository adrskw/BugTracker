using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using BugTracker.Core.CoreModels;
using BugTracker.Domain.Tickets;
using BugTracker.Persistence;
using FluentValidation;
using MediatR;

namespace BugTracker.Core.Tickets
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Ticket Ticket { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Ticket).SetValidator(new TicketValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ApplicationDbContext context;
            private readonly IMapper mapper;

            public Handler(ApplicationDbContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var ticket = await context.Tickets.FindAsync(request.Ticket.Id);

                if (ticket == null)
                    return null;

                mapper.Map(request.Ticket, ticket);
                bool isSuccess = await context.SaveChangesAsync() > 0;

                if (!isSuccess)
                    return Result<Unit>.Failure("Failed to update the ticket");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}