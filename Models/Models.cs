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
    public string FName { get; set;}
    public string LName { get; set; }
    public string FullName { get; set; } 
    public string Department { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; } //create actual email property here
    // public int AdventId { get; set; } ***ADDING THIS TO EMPLOYEE BREAKS IT
}

    
    //create function that allows admin user to add employee
    // write logic for downloading file here

public class Advent : HasId {
    [Required]
    public int Id { get; set; }
    public string EventName { get; set; }
    public DateTime startDate { get; set; }
    public DateTime endDate { get; set; }
    public List<Advance> Advances { get; set; } = new List<Advance>();
    public List<GoogleAPI.RootObject> ROs { get; set; } = new List<GoogleAPI.RootObject>();
    public List<Employee> Employees { get; set; }
  
    // write logic for downloading file here
}

public class Advance : HasId {
    [Required]
    public int Id { get; set; }
    public string AdvanceName { get; set; }
    // public bool isAssigned { get; set; } = false;
    // public bool isComplete { get; set; } = false;
    public DateTime dueDate { get; set; }
    public int EmployeeId { get; set; }
    public List<Section> Sections { get; set; } = new List<Section>();
    public List<AdvanceSectionJoin> AdvanceSectionJoins { get; set; } = new List<AdvanceSectionJoin>();

    // public int AdventId { get; set; } ****ADDING THIS MAKES IT BREAK
}
  
public class Section : HasId { 
    [Required]
    public int Id { get; set; }
    public string SectionName { get; set; }
    public string SectionDescription { get; set; }
    public int AdvanceId { get; set; }
    public List<Category> Categories { get; set; } = new List<Category>();
    public List<AdvanceSectionJoin> AdvanceSectionJoins { get; set; } = new List<AdvanceSectionJoin>();
}

public class Category : HasId {
    [Required]
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public List<Option> Options { get; set; } = new List<Option>();
    public int SectionId { get; set; }
    public List<AdvanceSectionJoin> AdvanceSectionJoins { get; set; }
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

public class Option : HasId {
    [Required]
    public int Id { get; set; }
    // public List<AdventLocation> Locations { get; set; }
    public string OptionName { get; set; }
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
    public DbSet<GoogleAPI.RootObject> ROs { get; set; }
    public DbSet<GoogleAPI.Location> Locations { get; set; }
    public DbSet<GoogleAPI.Geometry> Geometries { get; set; }
    public DbSet<GoogleAPI.Result> Results { get; set; }
    
    

}

public partial class Handler {
    public void RegisterRepos(IServiceCollection services){
        Repo<Employee>.Register(services, "Employees");
        Repo<Advent>.Register(services, "Advents",
            d => d
                .Include(e => e.Employees)
                .Include(l => l.ROs)
                .Include(a => a.Advances)
                .ThenInclude(s => s.Sections)
                .ThenInclude(c => c.Categories)
                .ThenInclude(o => o.Options)
        );
        Repo<Advance>.Register(services, "Advances",
            d => d
                .Include(s => s.Sections)
                .ThenInclude(c => c.Categories)
                .ThenInclude(o => o.Options));

        Repo<AdvanceSectionJoin>.Register(services, "AdvanceSectionJoins");

        Repo<Section>.Register(services, "Sections",
            d => d  
                .Include(c => c.Categories));

        Repo<Category>.Register(services, "Categories",
            d => d
                .Include(o => o.Options));

        Repo<Option>.Register(services, "Options");

        Repo<GoogleAPI.RootObject>.Register(services, "ROs",
            d => d
                .Include(r => r.Results));

        Repo<GoogleAPI.Result>.Register(services, "Results",
            d => d
                .Include(g => g.geometry));

        Repo<GoogleAPI.Geometry>.Register(services, "Geometries",
            d => d
                .Include(l => l.location));

        Repo<GoogleAPI.Location>.Register(services, "Locations",
            d => d
                .Include(l => l.lat)
                .Include(l => l.lng));
                    
        }
    }
      
   
        
        
        // 
            
       
           

       
        //     d => d
        //         .Include(s => s.Sections)
        //         .ThenInclude(c => c.Categories)
        //         .ThenInclude(o => o.Options));

        
                
       
        
        //     d => d 
        //         .Include(r => r.ROs));

       
  

