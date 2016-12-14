// 'using' statements
import "babel-polyfill"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, NavItem, NavDropdown, MenuItem, DateTimePicker, DateTimeField } from 'react-bootstrap';
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Header, Employee, Advent, Advance, Section, Category, Option, EventLocation } from './components'
import { LoginForm, RegisterForm, Login, EmployeeView, EmployeeLoggedIn } from './login'
import { AdventForm, NewEvent, ParentComponent, EmployeeList, AdventPage } from './forms'

import Forms from './forms'
import * as Boot from 'react-bootstrap' // read up @ https://react-bootstrap.github.io/components.html
// import { Datepicker } from 'react-bootstrap-date-picker'
// console.log(Boot) // what hast thou provided?

// Utility methods
// --------------

export const get = (url) =>
    fetch(url, {
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'}
    })
    .then(r => {
        return r.json()
    })

export const post = (url, data) => 
    fetch(url, { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(r => r.json())

export const put = (url, data) => 
    fetch(url, { 
        method: 'PUT',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(r => r.json())

export const remove = (url, data) => 
    fetch(url, { 
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(r => r.json())  
// ----------------

export const log = (...a) => console.log(...a)

export const Error = () => <div>Page Not Found</div>

const Layout = ({children}) => 
        <div>
            <div>
                <Header />
            </div>
                {children}
        </div>

const reactApp = () =>
    render(

    <Layout>
        <Router history={hashHistory}>
            <Route path="/" component={Login}/>
            <Route path="/api/employee/:id" component={EmployeeView}/>
            <Route path="/api/employee" component={EmployeeList}/>
            <Route path="/build" component={AdventForm}/>
            <Route path="/build/:id" component={AdventForm}/>
            <Route path="/api/advent/:id" component={AdventPage}/>
            <Route path="*" component={Error}/>
        </Router>
    </Layout>,
    document.querySelector('.app'))

reactApp()



    //        <Route path="/api/advent/:id" component={EmployeeView}/>