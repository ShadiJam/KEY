// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar } from 'react-bootstrap';
import { get, post, log, Error, Layout, reactapp } from './app'
import { LoginForm, RegisterForm, Login, EmployeeView } from './login'
import Forms from './forms'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'




export const Header = () =>
    <div id="container" className="container">
        <header id="header">
            <nav id="=menu">
                <ul id="primary" className="row">
                    <li className="portfolio span2">
                        <a className="key" href="#/">KEY</a>
                            <ul id="secondary">
                                <li className="project"><a href="#/api/employee/:id">EVENT</a></li>
                                <li className="project"><a href="#/build">BUILD</a></li>
                                <li className="project"><a href="">COLLECT</a></li>
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
        <li>{employee.position}</li>
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
            <span className="advent-view"></span>
            {(advance.sections || []).map(Section)}
    </div>

export const Section = (section) =>
    <div className="section">
        <h3>{section.sectionName}</h3>
        <li>{section.sectionDescription}</li>
        {(section.categories || []).map(Category)}
    </div>

export const Category = (category) =>
    <div className="category">
            <span className="advent-view"></span>
            <h4>{category.categoryName}</h4>
            {(category.options|| []).map(Option)}
    </div>

export const Option = (option) =>
    <div className="option">
        <li>{option.optionName}</li>
        <li><input onChange={e => this.change(e, "optionValue")} onBlur={update} ref="optionValue" placeholder="Enter Amount" required key={Math.random()} defaultValue={this.props.option.optionValue || 0}/></li>
    </div>

export const EventLocation = (eventLocation) =>
    <div className="event-location">
            <li>Address:    {eventLocation.formattedAddress}</li>
            <li>Latitude:   {eventLocation.lat}</li>
            <li>Longitude:   {eventLocation.lng}</li>
    </div>
    




          


    
          

    





       