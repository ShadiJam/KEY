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
                        <a className="key" href="#/">KEY</a>
                            <ul id="secondary">
                                <li className="project"><a href="#/api/employee/:id">EVENTS</a></li>
                                <li className="project"><a href="#/api/employee/">TEAMS</a></li>
                                <li className="project"><a href="#/build">BUILD</a></li>
                                
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
       
export const Employee = (employee) =>
    <div className="employee">
        <ul className="employee-list">
        <li>{employee.fName}</li>
        <li>{employee.lName}</li>
        <li>{employee.department}</li>
        <li>{employee.phone}</li>
        <li>{employee.email}</li>
        <span></span>
        </ul>
    </div>

export const Advent = (advent) =>
    <div className="advent">
        <ul className="advent-list">
        <li>{advent.eventName}</li>
        <li>{advent.startDate}</li>
        <li>{advent.endDate}</li>
        </ul>
            <a href={`#/api/advent/${advent.id}`}>
                <button className="view-button">View</button>
            </a>
            <a href={`#/build/${advent.id}`}>
                <button className="build-button">Edit</button>
            </a>
            <span></span>
    </div>

export const Advance = (advance) =>
    <div className="advance">
            <li>{advance.advanceName}</li>
            <li>{advance.isAssigned}</li>
            <li>{advance.dueDate}</li>
    </div>

export const Section = (section) =>
    <div className="section">
        <li>{section.sectionName}</li>
        <li>{section.sectionDescription}</li>
    </div>

export const Category = (category) =>
    <div className="category">
            <li>{category.categoryName}</li>
    </div>

export const Option = (option) =>
    <div className="option">
        <li>{option.optionName}</li>
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


       
    


    


    
          


    
          

    





       