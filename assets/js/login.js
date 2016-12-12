// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Button, FormGroup, FormControl, ControlLabel, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
// import { Datepicker } from 'react-bootstrap-date-picker'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { get, post, log, Error, Layout, reactapp } from './app'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Location, Geometry } from './components'
import Forms from './forms'

import * as models from './models'



export class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            IdentityUser: null
        }
    }
     submit(e) {
        e.preventDefault()
        post('account/login', {
            email: this.refs.email.value,
            password: this.refs.password.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/api/employee/${x.$id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err 
        return <form className="login-form" onSubmit={e => this.submit(e)}>
            {this.state.errors ? <p>There were errors with your Login:</p> : null}
            {err}

            <h4>Login</h4>   
            <div className="input-fields">
                <input ref="email" type="email" placeholder="user@email.com" required/>
                <input ref="password" type="password" placeholder="Your Password" required/>
            </div>
            <div>
                <button className="login-button" type="submit">KEY</button>
            </div>
        </form>
    }
}



export class RegisterForm extends Component {
    constructor(props){
        super(props)
         this.state = {
             IdentityUser: null
            }
        }
    submit(e) {
        e.preventDefault()
        post('account/register', {
            email: this.refs.email.value,
            password: this.refs.password.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/api/employee/${x.$id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
        }
    render(){
        var err
        return <form className="register-form" onSubmit={e => this.submit(e)}>
            {this.state.errors ? <p>There were errors with your Registration:</p> : null}
            {err}

            <h4>Register</h4>   
            <div className="input-fields">
                <input ref="email" type="email" placeholder="user@email.com" required/>
                <input  ref="password" type="password" placeholder="Your Password" required/>
            </div>
            <div>
                <button className="register-button" type="submit">KEY</button>
            </div>
        </form>
    }
}


export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        var err 
        if(this.state.errors){
            err = <ul className="login-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        } 
        return (
            <div className="login-stuff">
                <LoginForm />
                <RegisterForm />
            </div>
        )
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
        let {id} = this.state
        if(id !== null){
        get('/api/advent').then(advents => {
                advents = advents.reverse()
                this.setState({items: advents})
            }).catch(e => log(e))
    } else {
        x => window.location.hash = '#/'
        }
    }
    render(){
        return <div className="employeeView">
            <div>
                <a href="#/build">
                    <Button bsSize="xsmall" className="newAdvent">Create New Event</Button>
                </a>
            </div>
            <div className="grid grid-3-600">
            {this.state.items.map(Advent)}
            </div>
            
        </div>
    }
}








