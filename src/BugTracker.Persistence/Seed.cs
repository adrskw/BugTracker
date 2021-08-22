using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BugTracker.Domain.Tickets;

namespace BugTracker.Persistence
{
    public class Seed
    {
        public static async Task SeedData(ApplicationDbContext context)
        {
            if (context.Tickets.Any())
                return;

            var ticekts = new List<Ticket>
            {
                new Ticket {
                    Title = "Issue with displaying image",
                    Description = "The image doesn't display properly",
                    Reporter = "John Smith",
                    Assignee = "Great Developer",
                    Priority = TicketPriority.Low,
                    Status = TicketStatus.InProgress,
                    CreationDate = DateTimeOffset.Now.AddDays(-5)
                },
                new Ticket {
                    Title = "Typo",
                    Description = "Typo in home page string",
                    Reporter = "Patrick Mendes",
                    Assignee = "Thomas Clara",
                    Priority = TicketPriority.None,
                    Status = TicketStatus.Closed,
                    CreationDate = DateTimeOffset.Now.AddDays(-57)
                },
                new Ticket {
                    Title = "Page crashes",
                    Description = "Sometimes page crashes randomly",
                    Reporter = "Vishnu Howie",
                    Assignee = "",
                    Priority = TicketPriority.Critical,
                    Status = TicketStatus.New,
                    CreationDate = DateTimeOffset.Now.AddDays(-1)
                },
                new Ticket {
                    Title = "Blank page",
                    Description = "The page is blank",
                    Reporter = "John Smith",
                    Assignee = "",
                    Priority = TicketPriority.Low,
                    Status = TicketStatus.Open,
                    CreationDate = DateTimeOffset.Now.AddDays(-15)
                },
                new Ticket {
                    Title = "Error number 213",
                    Description = "Wrong size of image",
                    Reporter = "Greg Smith",
                    Assignee = "William Blue",
                    Priority = TicketPriority.None,
                    Status = TicketStatus.Closed,
                    CreationDate = DateTimeOffset.Now.AddDays(-28)
                },
                new Ticket {
                    Title = "Typo #2",
                    Description = "Typo in home page string",
                    Reporter = "Rona Jemma",
                    Assignee = "Effie Damian",
                    Priority = TicketPriority.None,
                    Status = TicketStatus.Closed,
                    CreationDate = DateTimeOffset.Now.AddDays(-27)
                },
                new Ticket {
                    Title = "Page crashes #21",
                    Description = "Sometimes page crashes randomly without any reason",
                    Reporter = "Rosemary Lorayne",
                    Assignee = "Bethany Wilson",
                    Priority = TicketPriority.Critical,
                    Status = TicketStatus.Resolved,
                    CreationDate = DateTimeOffset.Now.AddDays(-4)
                },
                new Ticket {
                    Title = "Button not working",
                    Description = "Login button is not working properly",
                    Reporter = "Kevin Sunday",
                    Assignee = "",
                    Priority = TicketPriority.Medium,
                    Status = TicketStatus.Open,
                    CreationDate = DateTimeOffset.Now.AddDays(-11)
                }
            };

            await context.Tickets.AddRangeAsync(ticekts);
            await context.SaveChangesAsync();
        }
    }
}