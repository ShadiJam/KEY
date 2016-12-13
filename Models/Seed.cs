using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

public static class Seed
{
    public static void Initialize(DB db, bool canCreate, bool mustMigrate)
    {
        if(canCreate) {
            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();
        }
        if(mustMigrate) db.Database.Migrate();
        
        // if(db.Cards.Any() || db.CardLists.Any()) return;
        // db.Table.Add(...) / SaveChanges()

        if(db.Advents.Any() || db.Advances.Any() || db.Employees.Any()) return;

        var e1 = new Advent { eventName = "TIY White Elephant", startDate = new DateTime(2016, 12, 12, 13, 45, 00), endDate = new DateTime(2016, 12, 14)};
        var e2 = new Advent { eventName = "TIY Presentation Day", startDate = new DateTime(2016, 12, 16, 13, 45, 00), endDate = new DateTime(2016, 12, 18)};
        db.Advents.Add(e1);
        db.Advents.Add(e2);
        db.SaveChanges();

        var a1 = new Advance { advanceName = "TIY Party Advance", isAssigned = false, isComplete = false, employeeId = 1, dueDate = new DateTime(2016, 12, 12)};
        var a2 = new Advance { advanceName = "TIY Presentation Day Advance", isAssigned = false, isComplete = false, employeeId = 2, dueDate = new DateTime(2016, 12, 15)};
        e2.Advances.Add(a2);
        e1.Advances.Add(a1);
        db.SaveChanges();

        var emp1 = new Employee { fName = "Shadi", lName = "Jam", department = "Administration", phone = "713-517-5522", email = "shadijam00@gmail.com"};
        var emp2 = new Employee { fName = "Khalid", lName = "Mohamed", department = "Production", phone = "713-777-7777", email = "madeup@email.com"};
        var emp3 = new Employee { fName = "Damien", lName = "Maya", department = "Transportation", phone = "713-111-1111", email = "damien@maya.com"};
        
        (new List<Employee> { emp1, emp2, emp3 }).Select(e => {
            return (new List<Advent> {e1, e2}).Select((Advent a) => {
                a.Employees.Add(e);
                return true;
            });
        });

        db.SaveChanges(); 
    }
}

//  db.Sections.Any() || db.Categories.Any() || db.Options.Any() || db.Locations.Any()) return; || 