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

[Route("api/advance")]
public class AdvanceController : CRUDController<Advance> {
    public AdvanceController(IRepository<Advance> r) : base(r){}
    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(advance => 
            advance.advanceName.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}


[Route("api/section")]
public class SectionController : CRUDController<Section> {
    public SectionController(IRepository<Section> r) : base(r){}
    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(section => 
            section.sectionName.ToLower().IndexOf(term.ToLower()) != -1
            || section.sectionDescription.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}

[Route("api/category")]
public class CategoryController : CRUDController<Category> {
    public CategoryController(IRepository<Category> r) : base(r){}
    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(category => 
            category.categoryName.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}

[Route("api/option")]
public class OptionController : CRUDController<Option> {
    public OptionController(IRepository<Option> r) : base(r){}
    [HttpGet("search")]
    public IActionResult Search([FromQuery]string term, int listId = -1){
        return Ok(r.Read(dbset => dbset.Where(option => 
            option.optionName.ToLower().IndexOf(term.ToLower()) != -1
        )));
    }
}


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