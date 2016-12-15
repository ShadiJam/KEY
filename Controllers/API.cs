using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


[Route("api/advent")]
public class AdventController : CRUDController<Advent> {
    public AdventController(IRepository<Advent> r) : base(r){}

    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(advent => 
            advent.eventName.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}

[Route("api/employee")]
public class EmployeeController : CRUDController<Employee> {
    public EmployeeController(IRepository<Employee> r) : base(r){}
    
    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(employee => 
            employee.fName.ToLower().IndexOf(term.ToLower()) != -1
            || employee.lName.ToLower().IndexOf(term.ToLower()) != -1
            || employee.department.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}

// [Route("api/advance")]
// public class AdvanceController : CRUDController<Advance> {
//     public AdvanceController(IRepository<Advance> r) : base(r){}
//     [HttpGet("search")]
//     public IActionResult Search([FromQuery]string term, int listId = -1){
//         return Ok(r.Read(dbset => dbset.Where(advance => 
//             advance.advanceName.ToLower().IndexOf(term.ToLower()) != -1
//         )));
//     }
// }

[Route("api/location")]
public class LocationController: Controller
{
    private GoogleLocationService gs;
    public LocationController(GoogleLocationService gs) : base() {
        this.gs = gs;
    }

    [HttpGet("{address}")]
    public async Task<IActionResult> Search(string address)
    {
        GoogleAPI.RootObject data = await gs.Get(address);
        return Ok(EventLocation.From(data));
    }
}