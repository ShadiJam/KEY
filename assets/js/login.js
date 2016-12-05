// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
// import { Datepicker } from 'react-bootstrap-date-picker'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { get, post, log, Error, Layout, reactapp } from './app'
import { Form, AdvancePage, NewAdvance, NewSection, NewCategory, NewOption } from './advance'
import { Nav, Jumbotron, HomeContents, Employee, Advent, Advance, Section, Category, Option, RootObject, Result, Location, Geometry } from './components'
import { NewEmployee, EmployeeView } from './employee'
import { CreateAdvent, AdventPage, NewAdvent } from './event'
import { NewRootObject } from './rootobject'



export class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {}
        }
    submit(e) {
        e.preventDefault()
            post('account/login', {
            email: this.refs.email.value,
            password: this.refs.password.value
        }).then(x => {
            window.location.hash = `#/status/${x.id}`
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
        return <form className="login-form" onSubmit={e => this.submit(e)}>
            {this.state.errors ? <p>There were errors with your Login:</p> : null}
            {err}

            <p>Please Log In</p>   
            <div key={login.id}>
                <input ref="email" type="email" placeholder="user@email.com" required/>
                <input ref="password" type="password" placeholder="Your Password" required/>
            </div>
            <div>
                <a className="login-button" href="#/">
                    <button type="submit">Log In</button>
                </a>
            </div>
        </form>
    }
}


export class RegisterForm extends Component {
    constructor(props){
        super(props)
         this.state = {}
        }
    submit(e) {
        e.preventDefault()
        post('account/register', {
            email: this.refs.email.value,
            password: this.refs.password.value
        }).then(x => {
            window.location.hash = `#/newEmployee`
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
        return <form onSubmit={e => this.submit(e)}>
            {this.state.errors ? <p>There were errors with your Registration:</p> : null}
            {err}

            <p>Or Register</p>   
            <div key={register.id}>
                <input ref="email" type="email" placeholder="user@email.com" required/>
                <input  ref="password" type="password" placeholder="Your Password" required/>
            </div>
            <div>
                <a className="register-button" href="#/newEmployee">
                    <button type="submit">Register</button>
                </a>
            </div>
        </form>
    }
}

// { CheckIsLoggedIn: false }

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

// ({
//     getInitialState() {
//         return {
//             isLoggedIn: auth.isLoggedIn()
//         }
//     },

//     updateAuth(isLoggedIn){
//         this.setState({
//             isLoggedIn 
//         })
//     },

//     componentWillMount() {
//         auth.onChange = this.updateAuth
//         auth.login()
//     },

//     render(){
//         {this.state.isLoggedIn ? ( <Route path="/Login"/> ) : ( <Route path="#/"/>)}




// function IsLoggedIn(props) {
//     if(user.id != null) {
//         return <EmployeeView />
//     }
//     return <Login />
// }

// how do i call the user id?
// where do I use this check once I've created it? in react app?