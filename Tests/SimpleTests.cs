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

    // public void ListIsNotNull(){
    //     var result = new List<Object>();
    //     Assert.NotNull(employees);
    //     Assert.NotNull(advances);
    //     Assert.NotNull(sections);
    //     Assert.NotNull(categories);
    //     Assert.NotNull(options);
    // }



    [Fact]

    public void DueDateInRange(){
        Assert.InRange(
            new DateTime(2016, 1, 12), 
            new DateTime(2003, 1, 1),
            new DateTime(2006, 1, 12));
    }

    // [Fact]

    // public void PopReturnsPushedItem(){
    //     int actual = stack.Peek();
    //     Assert.Equal(pushedValue, actual);
    // }


    // public void manyPushInputs(){
    //     Input<object> obj;
    //     object firstPush = x;
    //     object secondPush = y;
    //     object thirdPush = z;
    //     object fourthPush = a;
    //     object fifthPush = b;
    //     object sixthPush = c;
    // }
    

    // public void inputArray(){
    //     object arr = new Input();
    //     arr.Push(firstPush);
    //     arr.Push(secondPush);
    //     arr.Push(thirdPush);
    //     arr.Push(fourthPush);
    //     arr.Push(fifthPush);
    //     arr.Push(sixthPush);
    // }

    // [Fact]
    // public void confirmArrayIndex(){
    //     int num = arr.Count;
    //     Assert.Equal(6, num);
    // }

    // [Fact]
    // public void returnsPushedObject(){
    //     object val = arr.Pop();
    //     Assert.Equal(pushedValue, val);
    // }


// public class StringArray{
//     [Fact]
//     public void popWillDeletePushString(){
//         string() opt = new string();
//         opt.Push("optionName");

//         string actual = opt.Pop();
//         Assert.Equal("optionName", actual);
//     }
// }

    // [Theory]
    // public void IsAssigned(){
    //     Advance a = new Advance();
    //     Advance b = new Advance();
    //     Assert.False(a.isComplete());
    //     Assert.False(b.isAssigned());
    // }
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
    