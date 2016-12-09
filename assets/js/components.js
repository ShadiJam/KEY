// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar } from 'react-bootstrap';
// import { Datepicker } from 'react-bootstrap-date-picker'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { get, post, log, Error, Layout, reactapp } from './app'
import { LoginForm, RegisterForm, Login, EmployeeView } from './login'
import Forms from './forms'

export const Header = () =>
    <div id="container" className="container">
        <header id="header">
            <nav id="=menu">
                <ul id="primary" className="row">
                    <li className="portfolio span2">
                        <a href="#portfolio">KEYS</a>
                            <ul id="secondary">
                                <li className="project"><a href="">EVENT</a></li>
                                <li className="project"><a href="">ADVANCE</a></li>
                                <li className="project"><a href="">TEAM</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
       
 





export const Employee = (employee) =>
    <div className="employee">
        <h1>{employee.FName} {employee.LName}</h1>
        <p>{employee.Department}</p>
        <p>{employee.Phone}</p>
        <p>{employee.Email}</p>
    </div>

export const Advent = (advent) =>
    <div className="advent">
        <a href={`api/advent/${advent.id}`}>
            <h1>{advent.name}</h1>
            <p>{advent.startDate}</p>
            <p>{advent.endDate}</p>
        </a>
    </div>

export const Advance = (advance) =>
    <div className="advance">
        <a href={`#/status/${advance.id}`}>
            <h1>{advance.AdvanceName}</h1>
            <p>{advance.Assigned}</p>
            <p>{advance.dueDate}</p>
            <p>{advance.Section}</p>
        </a>
    </div>

export const Section = (section) =>
    <div className="section">
        <h1>{section.SectionName}</h1>
        <p>{section.SectionDescription}</p>
        <p>{section.RootObject}</p>
        <p>{section.Cost}</p>
        <p>{section.Category}</p>
    </div>

export const Category = (category) =>
    <div className="category">
            <h1>{category.CategoryName}</h1>
            <p>{category.Options}</p>
    </div>

export const Option = (option) =>
    <div className="option">
        <h1>{option.OptionName}</h1>
    </div>



export const RootObject = (rootObject) =>
        <div className="rootObject">
            <p>{rootObject.Results}</p>
        </div>

export const Result = (results) =>
        <div>
            <p>{rootObject.Results.formatted_address}</p>
            <p>{rootObject.Results.Geometry}</p>
        </div>

export const Location = (location) =>
    <div>
        <p>{rootObject.Results.geometry.location.lat}</p>
        <p>{rootObject.Results.geometry.location.lng}</p>
    </div>

export const Geometry = (geometry) =>
    <div>
        <p>{rootObject.Results.geometry.location}</p>
    </div>


       
    


    


    
          


    
          

    




// var DatePicker = require("react-bootstrap-date-picker");
 
// var App = React.createClass({
//   getInitialState: function(){
//     var value = new Date().toISOString();
//     return {
//       value: value

// class Datepicker extends Component {
//     constructor(props){
//         super(props)
//         this.state = { 
//             value: new Date().toISOString() }
//     }
//     componenetDidMount(){
//         get('/api/advent'+this.state.id).then(x => {
//             this.setState({ item: x })
//         })
//     }
//   handleChange(value, formattedValue) {
//     this.setState({
//       value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
//       formattedValue: formattedValue // Formatted String, ex: "11/19/2016" 
//     });
//   }
//   componentDidUpdate(){
//     // Access ISO String and formatted values from the DOM. 
//     var hiddenInputElement = document.getElementById("example-datepicker");
//     console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z" 
//     console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016" 
//   }
//   render(){
//     return <FormGroup>
//       <ControlLabel>Label</ControlLabel>
//       <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />
//       <HelpBlock>Help</HelpBlock>
//     </FormGroup>;
//   }
// } 
       