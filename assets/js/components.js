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
                        <a className="key" href="/">KEY</a>
                            <ul id="secondary">
                                <li className="project"><a href="#/api/employee/:id">EVENTS</a></li>
                                <li className="project"><a href="">ADVANCES</a></li>
                                <li className="project"><a href="#/api/employee/">TEAMS</a></li>
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
        </ul>
    </div>

export const Advent = (advent) =>
    <div className="advent">
        <h5>{advent.eventName}</h5>
        <h6>{advent.startDate}</h6>
        <h6>{advent.endDate}</h6>
            <a href={`api/advent/${advent.id}`}>
                <Button bsSize="xsmall" className="newAdvent">Build Advance</Button>
            </a>
    </div>

export const Advance = (advance) =>
    <div className="advance">
        <a href={`#/status/${advance.id}`}>
            <h5>{advance.advanceName}</h5>
            <h6>{advance.isAssigned}</h6>
            <h6>{advance.dueDate}</h6>
            <h6>{this.state.advance.map(x => <li>{sectionName}{sectionDescription}</li>)}</h6>
        </a>
    </div>

export const Section = (section) =>
    <div className="section">
        <h1>{section.sectionName}</h1>
        <p>{section.sectionDescription}</p>
        <p>{section.categoryName}</p>
    </div>

export const Category = (category) =>
    <div className="category">
            <h1>{category.categoryName}</h1>
            <p>{category.optionName}</p>
    </div>

export const Option = (option) =>
    <div className="option">
        <FormGroup onChange={e => this.change(e, "categoryId")} ref="categoryId" controlId="formControlsSelect">
            <ControlLabel>Options</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
                <option value="select">Choose Option</option>
                {this.props.options.map(e => <option value={e.id}>{e.optionName}</option>)}
            </FormControl>
        </FormGroup>
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


       
    


    


    
          


    
          

    





       