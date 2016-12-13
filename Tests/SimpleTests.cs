using Xunit;
using System;
using System.Collections.Generic;


public class SimpleTests {

    /* 
    Facts are used to test single inputs.
    Each function should contain just one assertion.
    */

    [Fact]
    public void TestingAdd() => 
        Assert.Equal(10, Add(5,5));

    [Fact]
    public void TestingAdd2() => 
        Assert.Equal(16, Add(5,11));

    static int Add(int a, int b) => a+b;

    // [Fact]
    // public void ReturnsEmptyView(){
    //     var controller = new HomeController();
    //     var result = controller.Root() as View;
    //     Assert.True(result.View == "Empty");
        
    // }
//Issue with testing of respository and APIs - told to only test models
    // [Fact]
    // public void Controllers_Inherit(){
    //     Assert.True(new AdvanceController(IRepository<Advance>) is CRUDController<Advance>);
    //     Assert.True(new AdventController(IRepository<Advent>) is CRUDController<Advent>);
    //     Assert.True(new RootObjectController(IRepository<RootObject>) is CRUDController<RootObject>);
    //     Assert.True(new EmployeeController(IRepository<Employee>) is CRUDController<Employee>);
    //     Assert.True(new SectionController(IRepository<Section>) is CRUDController<Section>);
    //     Assert.True(new CategoryController(IRepository<Category>) is CRUDController<Category>);
    //     Assert.True(new OptionController(IRepository<Option>) is CRUDController<Option>);

    // } 

    // [Fact]
    // public void ControllerCanSearch(string term){
    //     var controller = new AdventController();
    //     var result = controller.Search(term);
    //     Assert.NotNull(result); // or should it be Assert.True()?
    // }

    // [Theory]
    // public void IsAssigned(){
    //     Advance a = new Advance();
    //     Advance b = new Advance();
    //     Assert.False(a.isComplete());
    //     Assert.False(b.isAssigned());
    // }

    // [Theory]

    // public void ListIsNotNull(){
    //     // var result = new List<Object>();
    //     Assert.NotNull(Employees);
    //     Assert.NotNull(Advances);
    //     Assert.NotNull(ROs);
    //     Assert.NotNull(Sections);
    //     Assert.NotNull(AdvanceSectionJoins);
    //     Assert.NotNull(Categories);
    //     Assert.NotNull(Options);
    // }

    [Fact]

    public void DueDateInRange(){
        Assert.InRange(
            new DateTime(2016, 1, 12), 
            new DateTime(2003, 1, 1),
            new DateTime(2006, 1, 12));
    }
}

  
    
    


    /*
    other Assert methods:
    Equal(a,b)
    True(a)
    False(a)
    */

    /*
    Use theories to test multiple inputs to a function
    */

//     [Theory]
//     [InlineData( 1,1,2 )]
//     [InlineData( 4,6,10 )]
//     [InlineData( 7,7,14 )]
//     public void TestingAdd3(int a, int b, int c) =>
//         Assert.Equal(Add(a,b), c);

  
   
//  }
    