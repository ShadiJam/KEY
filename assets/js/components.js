// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
// import { Datepicker } from 'react-bootstrap-date-picker'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Form, AdvancePage, NewAdvance, NewSection, NewCategory, NewOption } from './advance'
import { get, post, log, Error, Layout, reactapp } from './app'
import { NewEmployee, EmployeeView } from './employee'
import { LoginForm, RegisterForm, Login } from './login'
import { NewRootObject, LocationSearchResult } from './rootobject'

export const Nav = ({includeLogin}) => 
    <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
            {includeLogin ? <LoginForm /> : null}
        </div>
        </div>
    </nav>

export const Jumbotron = () => 
    <div className="jumbotron">
        <div className="container">
            <h1>Hello, world!</h1>
            <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
            <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
        </div>
    </div>

export const HomeContents = () =>
    <div className="container">
        <div className="row">
            <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </div>
            
            <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </div>

            <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </div>
        </div>

        <hr />

        <footer>
        <p>&copy; 2016 Company, Inc.</p>
        </footer>
    </div>



// export const Employee = (employee) =>
//     <div className="employee">
//         <h1>{employee.FName} {employee.LName}</h1>
//         <p>{employee.Department}</p>
//         <p>{employee.Phone}</p>
//         <p>{employee.Email}</p>
//     </div>

// export const Advent = (advent) =>
//     <div className="advent">
//         <a href={`#/status/${advent.id}`}>
//             <h1>{advent.name}</h1>
//             <p>{advent.startDate}</p>
//             <p>{advent.endDate}</p>
//             <RootObject />
//         </a>
//     </div>

// export const Advance = (advance) =>
//     <div className="advance">
//         <a href={`#/status/${advance.id}`}>
//             <h1>{advance.AdvanceName}</h1>
//             <p>{advance.Assigned}</p>
//             <p>{advance.dueDate}</p>
//             <p>{advance.Section}</p>
//         </a>
//     </div>

// export const Section = (section) =>
//     <div className="section">
//         <h1>{section.SectionName}</h1>
//         <p>{section.SectionDescription}</p>
//         <p>{section.RootObject}</p>
//         <p>{section.Cost}</p>
//         <p>{section.Category}</p>
//     </div>

// export const Category = (category) =>
//     <div className="category">
//             <h1>{category.CategoryName}</h1>
//             <p>{category.Options}</p>
//     </div>

// export const Option = (option) =>
//     <div className="option">
//         <h1>{option.OptionName}</h1>
//     </div>



// export const RootObject = (rootObject) =>
//         <div className="rootObject">
//             <p>{rootObject.Results}</p>
//         </div>

// export const Result = (results) =>
//         <div>
//             <p>{rootObject.Results.formatted_address}</p>
//             <p>{rootObject.Results.Geometry}</p>
//         </div>

// export const Location = (location) =>
//     <div>
//         <p>{rootObject.Results.geometry.location.lat}</p>
//         <p>{rootObject.Results.geometry.location.lng}</p>
//     </div>

// export const Geometry = (geometry) =>
    // <div>
    //     <p>{rootObject.Results.geometry.location}</p>
    // </div>


       
    


    


    
          


    
          

    




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
       