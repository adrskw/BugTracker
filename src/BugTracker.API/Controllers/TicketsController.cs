using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BugTracker.Domain.Tickets;
using BugTracker.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.API.Controllers
{
    public class TicketsController : BaseApiController
    {
        private readonly ApplicationDbContext context;

        public TicketsController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ticket>>> GetTickets()
        {
            return await context.Tickets.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(Guid id)
        {
            // TODO: error handling: 'ticket not exists'
            return await context.Tickets.FindAsync(id);
        }
    }
}