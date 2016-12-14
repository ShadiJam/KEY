using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public class Employee : HasId {
    [Required]
    public int Id { get; set; }
    public string fName { get; set;}
    public string lName { get; set; }
    public string department { get; set; }
    public string position { get; set; }
    public string phone { get; set; }
    public string email { get; set; } //create actual email property here
    public int AdventId { get; set; }
}
    
    //create function that allows admin user to add employee
    // write logic for downloading file here

public class Advent : HasId {
    [Required]
    public int Id { get; set; }
    public string eventName { get; set; }
    public DateTime startDate { get; set; }
    public DateTime endDate { get; set; }
    public List<Advance> Advances { get; set; } = new List<Advance>();
    public List<EventLocation> EventLocations { get; set; } = new List<EventLocation>();
    public List<Employee> Employees { get; set; } = new List<Employee>();
  
    // write logic for downloading file here
}

public class Advance : HasId {
    [Required]
    public int Id { get; set; }
    public string advanceName { get; set; }
    public bool isAssigned { get; set; } = false;
    public bool isComplete { get; set; } = false;
    public DateTime dueDate { get; set; }
    public int employeeId { get; set; }
    public List<Section> Sections { get; set; } = new List<Section>();
    public List<AdvanceSectionJoin> AdvanceSectionJoins { get; set; } = new List<AdvanceSectionJoin>();
    public int AdventId { get; set; } 
}
  
public class Section : HasId { 
    [Required]
    public int Id { get; set; }
    public string sectionName { get; set; }
    public string sectionDescription { get; set; }
    public int AdvanceId { get; set; }
    public List<Category> Categories { get; set; } = new List<Category>();
    public List<AdvanceSectionJoin> AdvanceSectionJoins { get; set; } = new List<AdvanceSectionJoin>();
}

public class Category : HasId {
    [Required]
    public int Id { get; set; }
    public string categoryName { get; set; }
    public List<Option> Options { get; set; } = new List<Option>();
    public int SectionId { get; set; }
    public List<AdvanceSectionJoin> AdvanceSectionJoins { get; set; } = new List<AdvanceSectionJoin>();
    // create function that allows admin user to approve/deny advance
    // create function that allows employee user to respond to an advance request
}

public class AdvanceSectionJoin : HasId {
    [Required]
    public int Id { get; set; }
    public Advance Advance { get; set; }
    public int AdvanceId {get;set;}
    public Section Section { get; set; }
    public int SectionId {get;set;}
}

public class EventLocation : HasId {
    [Required]
    public int Id {get;set;}
    public string FormattedAddress {get;set;}
    public double Lat {get;set;}
    public double Lng {get;set;}
    public int AdventId {get;set;}

    public static EventLocation From(GoogleAPI.RootObject ro){
        return new EventLocation {
            FormattedAddress = ro.Results?[0]?.formatted_address,
            Lat = ro.Results?[0]?.geometry?.location?.lat ?? 0,
            Lng = ro.Results?[0]?.geometry?.location?.lng ?? 0
        };
    }
}

public class Option : HasId {
    [Required]
    public int Id { get; set; }
    // public List<GoogleAPI.RootObject> ROs { get; set; }
    public string optionName { get; set; }
    public int CategoryId { get; set; }
    
}

public partial class DB : IdentityDbContext<IdentityUser> {
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Advent> Advents { get; set; }
    public DbSet<Advance> Advances { get; set; }
    public DbSet<AdvanceSectionJoin> AdvanceSectionJoins { get; set; }
    public DbSet<Section> Sections { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Option> Options { get; set; }
    public DbSet<EventLocation> EventLocations { get; set; }
}

public partial class Handler {
    public void RegisterRepos(IServiceCollection services){
        // Repo<Employee>.Register(services, "Employees");
        
        Repo<Advent>.Register(services, "Advents",
            d => d
                .Include(e => e.Employees)
                .Include(l => l.EventLocations)
                .Include(a => a.Advances)
                    .ThenInclude(s => s.Sections)
                        .ThenInclude(c => c.Categories)
                            .ThenInclude(o => o.Options)
        );

        // Repo<EventLocation>.Register(services, "EventLocations",
        //     d => d
        //         .Include(f => f.FormattedAddress)
        //         .Include(l => l.Lat)
        //         .Include(l => l.Lng));
        
        // Repo<Advance>.Register(services, "Advances",
        //     d => d
        //         .Include(s => s.Sections)
        //         .ThenInclude(c => c.Categories)
        //         .ThenInclude(o => o.Options));

        // Repo<AdvanceSectionJoin>.Register(services, "AdvanceSectionJoins");

        // Repo<Section>.Register(services, "Sections",
        //     d => d  
        //         .Include(c => c.Categories));

        // Repo<Category>.Register(services, "Categories",
        //     d => d
        //         .Include(o => o.Options));

        // Repo<Option>.Register(services, "Options");

    }
}