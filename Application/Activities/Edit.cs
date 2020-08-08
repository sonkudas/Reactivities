using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
         public class Command : IRequest
                {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime ? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
                   
                }
        
                public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                       _context = context;
                    }
        
                    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                       
                        var activity = await _context.Ativities.FindAsync(request.Id);
                        if (activity==null )
                        throw new Exception("Could not found activity");

                         activity.Title = request.Title?? request.Title;
                         activity.City = request.City??request.City;
                         activity.Venue = request.Venue??request.Venue;
                         activity.Date = request.Date ?? request.Date;
                         activity.Description = request.Description??request.Description;
                         activity.Category = request.Category??request.Category;
                        

                       // handler logic here
                        var success =await _context.SaveChangesAsync() > 0; 
                        if(success) return Unit.Value ;
        
                        throw new Exception("Problem saving Activities ");
        
                    }
                }
    }
}