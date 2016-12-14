import React, {Component} from 'react'
import * as models from './models'
import {get, post, put, log } from './app'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, NavDropdown, MenuItem , DateTimeField, DateTimePicker } from 'react-bootstrap';
import * as components from './components'
import { Employee, Advance, Advent, Section, Category, Option, RootObject, Result, EventLocation } from './components'
import { AdventForm, NewEvent, ParentComponent, EmployeeList, AdventPage } from './forms'


//eventually I will merge the content of this component with AdventPage and that will be the link users/staff access to complete the form. 
export class AdventPage extends Component {
    constructor(props){
        super(props)
        let {routeParams: {id}} = this.props
        this.state = { id: props.params.id }
    }

    componentDidMount(e){
        console.log(this.state)
        let {id} = this.state
        if(id !== undefined)
        get(`/api/advance/${id}`)
            .then(data => this.setState(Object.assign({}, this.state, data)))

    }
    render(){
        <h1>Welcome to {this.state.eventName}</h1>
        <h3>{this.state.startDate}</h3>
        <h3>{this.state.endDate}</h3>
        <h2>{this.state.eventLocation}</h2>
        <span></span>


        <p> Thank you for being part of {this.state.eventName}. In order to ensure your needs are met during the event, please take a moment to fill out the {this.state.advanceName} form below by {this.state.dueDate}. Note that if you need to make any edits after your initial submission, simply follow the link back to this page, fill out the form again, and resubmit. Your information will be updated automatically. Note that all requests are subject to approval and must be submitted by {this.state.dueDate} to be considered. 
        
        Any questions can be directed to:
        <p>{employee.fName.id}{employee.lName.id}</p>
        <p>{employee.phone.id}</p>
        <p>{employee.email.id}</p>

        <h5>DueDate: {this.state.dueDate}</h5>
        </p>
        <span></span>

        //all advance components will be nested here
        
        <h5>{this.state.sectionName[0]}</h5> //"Departmental Contact Information"
        <p> {this.state.sectionDescription[0]}Please confirm your information and provide us with the contact information for any additional key team members. To add multiple entries, just click the "Add Employee" button.</p>
        <p>{this.employee}</p>
        <p>{employeeform}</p>
        <span></span>

        <h5>{this.state.sectionName[1]}</h5> //"Credentials"
        <p> {this.state.sectionDescription[1]} Please provide us with the number of credentials your team will need for each day of the event. Credential pick up will be: between {time} and {time} at {this.event.location}  on {dateTime}</p>

        <h6>{this.state.categoryName}</h6> //"December 29, 2016" 
        <p>{this.state.optionName}</p> //input field

        <h6>{this.state.categoryName}</h6> //"December 30, 2016" 
        <p>{this.state.optionName}</p> //input field

        <h6>{this.state.categoryName}</h6> //"December 31, 2016" 
        <p>{this.state.optionName}</p> //input field

        <h6>{this.state.categoryName}</h6> //"January 1, 2016" 
        <p>{this.state.optionName}</p> //input field

        <h6>{this.state.categoryName}</h6> //"January 2, 2016" 
        <p>{this.state.optionName}</p> //input field

        <span></span>

        <h5>{this.section.sectionName}</h5> //"Radios"
        <p> {this.section.sectionDescription} Please provide us with the number of radios your team will need. </p>

        <h6>{this.category.categoryName}</h6> //"Radios"
        <p>{this.option.optionName}</p> //input field

        <h6>{this.category.categoryName}</h6> //"Hand mics"
        <p>{this.option.optionName}</p> //input field

        <span></span>

        <h5>{this.section.sectionName}</h5> //"Golf Carts"
        <p>{this.section.sectionDescription} Please provide us with the number of golf carts your team will need. </p>

        <h6>{this.category.categoryName}</h6> //"Four Seater Cart"
        <p>{this.option.optionName}</p> //input field

        <h6>{this.category.categoryName}</h6> //"Utility Cart"
        <p>{this.option.optionName}</p> //input field

        <span></span>

        <h5>{this.section.sectionName}</h5> //"Catering"
        <p>{this.section.sectionDescription} Please provide us with the number of meals we will need to provide each day. Meals will be provided at {this.advent.eventLocation} at the following times:
        
        Breakfast: {time}
        Lunch: {time}
        Dinner: {time}
        </p>

        <h6>{this.category.categoryName}</h6> //"December 31 Breakfast"
        <p>{this.option.optionName}</p> //input field

        <h6>{this.category.categoryName}</h6> //"December 31 Lunch"
        <p>{this.option.optionName}</p> //input field

        <h6>{this.category.categoryName}</h6> //"December 31 Dinner"
        <p>{this.option.optionName}</p> //input field

        <h6>{this.category.categoryName}</h6> //"January 1 Breakfast"
        <p>{this.option.optionName}</p> //input field

        <h6>{this.category.categoryName}</h6> //"January 1 Lunch"
        <p>{this.option.optionName}</p> //input field

        <h6>{this.category.categoryName}</h6> //"January 2 Dinner"
        <p>{this.option.optionName}</p> //input field

        <span></span>

        <h6>{this.section.sectionName}</h6> //"Parking"
        <p>{this.section.sectionDescription} Please provide use with the number of parking passes you will need for each location. </p>

        <h6>{this.category.location}</h6> // December 31, Location 1
        <p>{this.option.optionName}</p> //input field

        <h6>{this.category.location}</h6> // December 31, Location 2
        <p>{this.option.optionName}</p> //input field

        <h6>{this.category.location}</h6> // January 1, Location 1
        <p>{this.option.optionName}</p> //input field

        <h6>{this.category.location}</h6> // January 1, Location 2
        <p>{this.option.optionName}</p> //input field

        <span></span>

        <h6>{this.section.sectionName}</h6> //"Important event information"
        <p>{this.section.sectionDescription} The links below will lead you to further information about {this.advent.eventName}. </p>

        <a href="">{this.option.optionName}</a> //Link to Employee List
        <a href="">{this.option.optionName}</a> //Link to Event Schedule
        <a href="">{this.option.optionName}</a> //Link to Site Map

        <span></span>

        <h6>{this.section.sectionName}</h6> //"Questions/Comments"
        <p>{this.section.sectionDescription} Any additional information can be submitted below. </p>

        <p>{this.category.categoryName}</p> //input field.


        <button>Submit</button> 
    }
}

// create Homepage
// 