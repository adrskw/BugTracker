using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BugTracker.Core.Tickets;
using BugTracker.Domain.Tickets;
using BugTracker.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.API.Controllers
{
    public class TicketsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Ticket>>> GetTickets()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(Guid id)
        {
            // TODO: error handling: 'ticket not exists'
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket(Ticket ticket)
        {
            return Ok(await Mediator.Send(new Create.Command { Ticket = ticket }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTicket(Guid id, Ticket ticket)
        {
            ticket.Id = id;

            return Ok(await Mediator.Send(new Edit.Command { Ticket = ticket }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}