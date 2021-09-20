using AutoMapper;
using BugTracker.Domain.Tickets;

namespace BugTracker.Core.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Ticket, Ticket>();
        }
    }
}