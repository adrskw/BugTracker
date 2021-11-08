using System;
using System.Threading;
using System.Threading.Tasks;
using BugTracker.Core.CoreModels;
using BugTracker.Persistence;
using MediatR;

namespace BugTracker.Core.Tickets
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var ticket = await context.Tickets.FindAsync(request.Id);

                if (ticket == null)
                    return null;

                context.Remove(ticket);
                bool isSuccess = await context.SaveChangesAsync() > 0;

                if (!isSuccess)
                    return Result<Unit>.Failure("Failed to delete the ticket");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}