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
import { NewEmployee, EmployeeView } from './employee'
import { AdventPage, NewAdvent } from './event'
import { LoginForm, RegisterForm, Login } from './login'


export class NewRootObject extends Component {
    constructor(props){
        super(props)
        this.state = { 
            rootObjects: {results: []}
        }
    }
    submit(e){
        e.preventDefault()
        get(`/api/rootobject/${this.refs.address.value}`
        ).then(resp => {
            this.setState({ rootObjects: resp })
        }).catch(e => log(e))
    }

    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(e => <li>{e}</li>)}
                </ul>
        }
        return <form className="new-RO-form" onSubmit={e => this.submit(e)}>
                 {this.state.errors ? <p>There were errors with your location search:</p> : null}
                 {err}
                <div>
                    <input ref="address" type="text" placeholder="Add a location - enter a zipcode, location name, or address" required/>
                        <button onSubmit={e => this.submit(e)} type="submit">Add Location</button>
                </div>

                <ul>
                    {this.state.rootObjects.results.map(x => <li>{x}</li>)}
                </ul>
        </form>

            
            

    }
}
