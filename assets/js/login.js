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
            window.location.hash = `api/employee/${x.id}`
        }).catch(e => window.location.hash = '#/')
        }
    render(){
        var err 
        return <form className="login-form" onSubmit={e => this.submit(e)}>
            {this.state.errors ? <p>There were errors with your Login:</p> : null}
            {err}

            <p>Please Log In</p>   
            <div>
                <input ref="email" type="email" placeholder="user@email.com" required/>
                <input ref="password" type="password" placeholder="Your Password" required/>
            </div>
            <div>
                <a className="login-button" href="#/">
                    <Button type="submit">Log In</Button>
                </a>
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
            window.location.hash = `api/employee/${x.id}`
        }).catch(e => window.location.hash = '#/')
        }
    render(){
        var err
        return <form onSubmit={e => this.submit(e)}>
            {this.state.errors ? <p>There were errors with your Registration:</p> : null}
            {err}

            <p>Or Register</p>   
            <div>
                <input ref="email" type="email" placeholder="user@email.com" required/>
                <input  ref="password" type="password" placeholder="Your Password" required/>
            </div>
            <div>
                <a className="register-button" href="#/newEmployee">
                    <Button type="submit">Register</Button>
                </a>
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
            err = <ul className="compose-errors">
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
                <Button type="newAdvent">Create New Event</Button>
            </a>
            </div>
        </div>
    }
}


//     render(){
//         {this.state.isLoggedIn ? ( <Route path="/Login"/> ) : ( <Route path="#/"/>)}


// export class EmployeeLoggedIn extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             IdentityUser: null
//         }
//     }
//     componentWillMount() {
//         post('api/account'+this.state.id).then(IdentityUser => {
//             this.setState({IdentityUser})
//         }).catch(e => window.location.hash = '#/')
//     }
//     render(){
//         if(!this.state.IdentityUser) return <Login />
//         return <EmployeeView />
//     }
// }



// could do...
        // auth.login().catch(e => window.location.hash = '#/login')