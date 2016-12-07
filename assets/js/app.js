// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Location, Geometry } from './components'
import { LoginForm, RegisterForm, Login, EmployeeView } from './login'
import Forms from './forms'
import * as Boot from 'react-bootstrap' // read up @ https://react-bootstrap.github.io/components.html
// import { Datepicker } from 'react-bootstrap-date-picker'
// console.log(Boot) // what hast thou provided?

// Utility methods
// --------------

export const get = (url) =>
    fetch(url, {credentials: 'same-origin'})
    .then(r => {
        return r.json()
    })
    .catch(e => log(e))

export const post = (url, data) => 
    fetch(url, { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .catch(e => log(e))
    .then(r => r.json())
// ----------------

export const log = (...a) => console.log(...a)

export const Error = () => <div>Page Not Found</div>

const Layout = ({children}) => 
    <div>
        <div>
            <Nav />
            <Jumbotron />
        </div>
            {children}
    </div>







const reactApp = () =>
    render(

    <Layout>
        <Router history={hashHistory}>
            

            <Route path="/Login" component={Login}/>
            <Route path="/api/employee/:id" component={EmployeeView}/>
            <Route path="/compose" component={NewAdvent}/>
            <Route path="/location" component={NewRootObject}/>
            <Route path="/api/advent/:id" component={Forms}/>
            <Route path="*" component={Error}/>
        </Router>
    </Layout>,
    document.querySelector('.app'))

reactApp()

// <Route path="/newEmployee" component={NewEmployee}/>
// 
// 
// <Route path="/api/advent/:id" component={AdventPage}/>
            
// <Route path="/api/advance/:id" component={AdvancePage}/>