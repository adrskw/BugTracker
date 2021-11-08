using System.Threading;
using System.Threading.Tasks;
using BugTracker.Core.CoreModels;
using BugTracker.Domain.Tickets;
using BugTracker.Persistence;
using FluentValidation;
using MediatR;

namespace BugTracker.Core.Tickets
{
    public class Create
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

            public Handler(ApplicationDbContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Tickets.Add(request.Ticket);

                bool isSuccess = await context.SaveChangesAsync() > 0;

                if (!isSuccess)
                    return Result<Unit>.Failure("Failed to create ticket");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}