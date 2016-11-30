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
    
    //create function that allows admin user to add employee
}
public class Advent : HasId {
    [Required]
    public int Id { get; set; }
    public string name { get; set; }
    public DateTime startDate { get; set; }
    public DateTime endDate { get; set; }
    public List<Advance> Advances { get; set; } = new List<Advance>();
    public List<RootObject> ROs { get; set; } = new List<RootObject>();
    public List<Employee> Employees { get; set; } = new List<Employee>();
  
    // create function that allows admin user to create new event
}

public class Advance : HasId {
    [Required]
    public int Id { get; set; }
    public string AdvanceName { get; set; }
    public bool Assigned { get; set; } = false;
    public Employee Employee { get; set; }
    public int EmployeeId { get; set; }
    public List<Section> Sections { get; set; }
    public DateTime dueDate { get; set; }
    public int AdventId { get; set; }
    public List<AdvanceSectionJoin> AdvanceSectionJoins { get; set; }

  
    // create function that allows admin user to create new advance
    // create function that allows admin user to issue new advance to employee (and therefore a specific department)
    // create function that allows admin user to approve/deny advance
    // create function that allows employee user to respond to an advance request
    // create function that allows admin user to create multiple versions of an advance and send certain versions to certain employees (departments)

}

public class Section : HasId { 
    [Required]
    public int Id { get; set; }
    public string SectionName { get; set; }
    public string SectionDescription { get; set; }
    public double Cost { get; set; }
    public List<RootObject> ROs { get; set; } = new List<RootObject>();
    public List<Category> Categories { get; set; }
    public List<AdvanceSectionJoin> AdvanceSectionJoins { get; set; }
    // create function that allows admin user to create section and include in a particular advance
}

public class AdvanceSectionJoin : HasId {
    [Required]
    public int Id { get; set; }
    public Advance Advance { get; set; }
    public int AdvanceId {get;set;}
    public Section Section { get; set; }
    public int SectionId {get;set;}
}

public class Category : HasId {
    [Required]
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public List<Option> Options { get; set; }
    public int SectionId { get; set; }
}
public class Option : HasId {
    [Required]
    public int Id { get; set; }
    public string OptionName { get; set; }
    public int CategoryId { get; set; }
    }
    //create function that allows admin user to set options in a category and assign it to a specific category
    // create function that allows employee user to choose from options and post that to advance


public class Location : HasId {
        [Required]
        public int Id { get; set; }
        public double lat { get; set; }
        public double lng { get; set; }
        }

    public class Geometry : HasId {
        [Required]
        public int Id { get; set; }
        public Location location { get; set; }
    }

    public class Result : HasId {
        [Required]
        public int Id { get; set; }
        public string formatted_address { get; set; }
        public Geometry geometry { get; set; }
    }

    public class RootObject : HasId {
        [Required]
        public int Id { get; set; }
        public List<Result> Results { get; set; }
        public int AdventId { get; set; }
        
    }

public partial class DB : IdentityDbContext<IdentityUser> {
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<Geometry> Geometries { get; set; }
    public DbSet<Result> Results { get; set; }
    public DbSet<RootObject> ROs { get; set; }
    public DbSet<Advent> Advents { get; set; }
    public DbSet<Advance> Advances { get; set; }
    public DbSet<AdvanceSectionJoin> AdvanceSectionJoins { get; set; }
    public DbSet<Section> Sections { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Option> Options { get; set; }
}

public partial class Handler {
    public void RegisterRepos(IServiceCollection services){
        Repo<Employee>.Register(services, "Employees");
        Repo<Result>.Register(services, "Results");
        Repo<Geometry>.Register(services, "Geometries");
        Repo<Location>.Register(services, "Locations");

        Repo<RootObject>.Register(services, "ROs",
            d => d
                .Include(r => r.Results)
                .ThenInclude(g => g.geometry)
                .ThenInclude(l => l.location)
            );
        
        Repo<Advent>.Register(services, "Advents");
        Repo<Advance>.Register(services, "Advances");
        Repo<Section>.Register(services, "Sections");
        Repo<AdvanceSectionJoin>.Register(services, "AdvanceSectionJoins");
        Repo<Category>.Register(services, "Categories");
        Repo<Option>.Register(services, "Options");
    }
}
