// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
// import { Datepicker } from 'react-bootstrap-date-picker'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Form, AdvancePage, NewAdvance, NewSection, NewCategory, NewOption } from './advance'
import { get, post, log, Error, Layout, reactapp } from './app'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Location, Geometry } from './components'
import { AdventPage, NewAdvent } from './event'
import { LoginForm, RegisterForm, Login } from './login'



export class NewEmployee extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e) {
        e.preventDefault()
        //forms by default will refresh the page
        post('api/employee',{
            fName: this.refs.FName.value, 
            lName: this.refs.LName.value, 
            department: this.refs.Department.value,
            phone: this.refs.Phone.value 
        }).then(x => {
            window.location.hash = `api/employee/${x.id}`
        }).catch(e => {
            this.setState({ errors: e })
        })
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(e => <li>{e}</li>)}
            </ul>
        }
        return <form className="new-employee-form" onSubmit={e => this.submit(e)}>
             {this.state.errors ? <p>There were errors with your new Employee submission</p> : null}
             {err}
                <div>
                    <div>
                        <input ref="FName" type="string" placeholder="First Name" required/>
                        <input ref="LName" type="string" placeholder="Last Name" required/>
                        <input ref="Department" type="string" placeholder="Department Name" required/>
                        <input ref="Phone" type="PhoneAttribute" placeholder="Phone including area code" required/>
                    </div>
                <div>
                    <a className="new-employee-button" onSubmit={e => this.submit(e)}>
                        <button type="submit">Add Employee</button>
                    </a>
                </div>
                </div>
                </form>
    }
}

export class EmployeeView extends Component {
    constructor(props){
        super(props)
        this.state = { 
            items: []
        }
    }
    componentDidMount(){
        get('/api/advent').then(advents => {
                advents = advents.reverse()
                this.setState({items: advents})
            }).catch(e => log(e))
    }
    render(){
        return <div className="grid grid-3-600">
            {this.state.items.map(Advent)}
            <div>
            <a href="#/compose">
                <button type="newAdvent">Create New Event</button>
            </a>
            </div>
        </div>
    }
}