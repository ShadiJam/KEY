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
            advent.EventName.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}

[Route("api/employee")]
public class EmployeeController : CRUDController<Employee> {
    public EmployeeController(IRepository<Employee> r) : base(r){}
    
    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(employee => 
            employee.FName.ToLower().IndexOf(term.ToLower()) != -1
            || employee.LName.ToLower().IndexOf(term.ToLower()) != -1
            || employee.Department.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}

[Route("api/advance")]
public class AdvanceController : CRUDController<Advance> {
    public AdvanceController(IRepository<Advance> r) : base(r){}
    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(advance => 
            advance.AdvanceName.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}


[Route("api/section")]
public class SectionController : CRUDController<Section> {
    public SectionController(IRepository<Section> r) : base(r){}
    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(section => 
            section.SectionName.ToLower().IndexOf(term.ToLower()) != -1
            || section.SectionDescription.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}

[Route("api/category")]
public class CategoryController : CRUDController<Category> {
    public CategoryController(IRepository<Category> r) : base(r){}
    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(category => 
            category.CategoryName.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}

[Route("api/option")]
public class OptionController : CRUDController<Option> {
    public OptionController(IRepository<Option> r) : base(r){}
    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(option => 
            option.OptionName.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}


[Route("api/location")]

public class LocationController: CRUDController<GoogleAPI.RootObject> 
{
    private GoogleLocationService gs;
    public LocationController(IRepository<GoogleAPI.RootObject> r, GoogleLocationService gs) : base(r) {
        this.gs = gs;
        this.r = r;
    }

    [HttpGet("{address}")]
    public async Task<IActionResult> Search(string address)
    {
        address.Log();
        var data = await gs.Get(address);
        // var lat1 = data.results.ElementAt(0).geometry.location.lat;
        // var lng1 = data.results.ElementAt(0).geometry.location.lng;
        // var formatted_address = data.results.ElementAt(0).formatted_address;
       
        data.Log();
        return Ok(r.Create(data));
    }
}