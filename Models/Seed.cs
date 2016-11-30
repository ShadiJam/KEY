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

        if(db.Advents.Any() || db.Advances.Any() || db.Employees.Any() || db.Sections.Any() || db.Categories.Any() || db.Options.Any() || db.ROs.Any()) return;
        var e1 = new Advent { name = "ShadiTestEvent1", startDate = new DateTime(2016, 12, 12, 13, 45, 00), endDate = new DateTime(2016, 12, 14, 13, 45, 00)};
        var e2 = new Advent { name = "ShadiTestEvent2", startDate = new DateTime(2016, 12, 16, 13, 45, 00), endDate = new DateTime(2016, 12, 18, 13, 45, 00)};
        var a1 = new Advance { AdvanceName = "ShadiTest1-Advance"};
        var a2 = new Advance { AdvanceName = "ShadiTest2-Advance"};
        var emp1 = new Employee { FName = "Shadi", LName = "Jam", Department = "Administration", Phone = "713-517-5522", Email = "shadijam00@gmail.com"};
        var emp2 = new Employee { FName = "Joshua", LName = "Long", Department = "Production", Phone = "713-777-7777", Email = "madeupemail@madeupemail.com"};
        var emp3 = new Employee { FName = "Brian", LName = "Sorry", Department = "Transportation", Phone = "713-111-1111", Email = "briansorry@briansorry.com"};
        
        db.Advents.Add(e1);
        db.Advents.Add(e2);
        db.Advances.Add(a1);
        db.Advances.Add(a2);
        db.Employees.Add(emp1);
        db.Employees.Add(emp2);
        db.Employees.Add(emp3);
      
        db.SaveChanges(); 
    }
}